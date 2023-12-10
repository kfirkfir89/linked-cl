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
  structureJson,
} from '../../utils/fsHandlers';
import { extractTextFromPdfJsonWorker } from '../../utils/extractTextFromPdfJsonWorker';
import { generateCoverLetterPDF } from '../../services/puppeteer/createPdfFile';

async function createCoverLetterGPT(
  cvText: string,
  jobObj: PuppeteerLink
): Promise<CoverLetter> {
  const coverLetterJson = await createCoverLetter(
    cvText,
    JSON.stringify(jobObj)
  );

  const structured = structureJson(coverLetterJson);

  const cl: CoverLetter = JSON.parse(`${structured}`);
  return cl;
}

async function extractTextFromUploadedPdf(
  savedCVFilePath: string,
  outputFileName: string
): Promise<string> {
  await extractPdfContentToJson(savedCVFilePath, outputFileName);

  const cvText = await extractTextFromPdfJsonWorker(
    'extract_text',
    outputFileName
  );

  return cvText;
}

export async function generateCoverLetter(
  req: Request,
  res: Response<{ data: string }>,
  next: NextFunction
) {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }
    const puppeteerUrl = createPuppeteerUrl(req.body.url as string);
    const savedUploadedCVFilePath = await saveUploadedCVFile(req.file);
    const outputFileName = path.basename(savedUploadedCVFilePath);
    const [cvText, jobObj] = await Promise.all([
      extractTextFromUploadedPdf(savedUploadedCVFilePath, outputFileName),
      getLinkedInJobData(puppeteerUrl),
    ]);

    const coverLetter = await createCoverLetterGPT(cvText, jobObj);

    const pdfStream = await generateCoverLetterPDF(
      coverLetter.content,
      outputFileName
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=CL-${req.file.originalname}`
    );
    res.setHeader('Cover-Letter-Data', structureJson(coverLetter.content));

    pdfStream.pipe(res);

    res.status(200);
    await deleteOutputFiles(outputFileName);
    await deleteFile(savedUploadedCVFilePath);
  } catch (error) {
    next(error);
  }
}
