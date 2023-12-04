import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { getLinkedInJobData } from '../../services/puppeteer/getJobDescription';
import { CoverLetter } from './cover-letter.model';
import { createCoverLetter } from '../../services/chatgpt/createCoverLetter';
import { extractPdfContentToJson } from '../../services/adobe-api/extract-json-from-pdf';
import {
  PuppeteerLink,
  createPuppeteerUrl,
} from '../../services/puppeteer/createPuppeteerUrl';
import {
  deleteOutputFiles,
  deleteFile,
  saveUploadedCVFile,
  structureText,
} from '../../utils/fsHandlers';
import { extractTextFromPdfJsonWorker } from '../../utils/extractTextFromPdfJsonWorker';

async function createCoverLetterGPT(
  cvText: string,
  jobObj: PuppeteerLink
): Promise<CoverLetter> {
  const coverLetterJson = await createCoverLetter(
    cvText,
    JSON.stringify(jobObj)
  );
  const structured = coverLetterJson
    .replace(/\n/g, '')
    .replace(/\t/g, '')
    .replace(/\r/g, '');

  const cl: CoverLetter = JSON.parse(`${structured}`);
  return cl;
}

async function extractTextFromUploadedPdf(
  savedCVFilePath: string,
  savedCVFileName: string
): Promise<string> {
  await extractPdfContentToJson(savedCVFilePath, savedCVFileName);

  const cvText = await extractTextFromPdfJsonWorker(
    'extract_text',
    savedCVFileName
  );

  return cvText;
}

export async function generateCoverLetter(
  req: Request,
  res: Response<{ data: string }>,
  next: NextFunction
) {
  if (!req.file || req.file.mimetype !== 'application/pdf')
    throw new Error('No file, or pdf not exsist');

  try {
    const puppeteerUrl = createPuppeteerUrl(req.body.url as string);
    const savedCVFilePath = await saveUploadedCVFile(req.file);
    const savedCVFileName = path.basename(savedCVFilePath);

    const [cvText, jobObj] = await Promise.all([
      extractTextFromUploadedPdf(savedCVFilePath, savedCVFileName),
      getLinkedInJobData(puppeteerUrl),
    ]);
    const coverLetter = await createCoverLetterGPT(cvText, jobObj);

    await deleteOutputFiles(savedCVFileName);
    await deleteFile(savedCVFilePath);

    res.status(200);
    res.json({ data: structureText(coverLetter.content) });
  } catch (error) {
    next(error);
  }
}
