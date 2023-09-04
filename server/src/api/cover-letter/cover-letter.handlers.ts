import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { NextFunction, Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { v4 } from 'uuid';
import {
  JobInformation,
  getJobInformation,
} from '../../utils/getJobDescription';
import { CoverLetter, UserUploadData } from './cover-letter.model';
import { extractFromZip } from '../../utils/extractFromZip';
import { jsonToText, structureText } from '../../utils/textHandlers';
import { createCoverLetter } from '../../services/chatgpt/createCoverLetter';
import { extractJsonFromPdf } from '../../services/adobe-api/extract-json-from-pdf';

async function fsExists(filePath: string): Promise<boolean> {
  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function deleteFiles(outputName: string) {
  const outputDir = path.join(__dirname, `../../../output-${outputName}`);
  await fsp.rmdir(outputDir, { recursive: true });
}

async function extractedTextFromJson(outputName: string) {
  const zipPath = path.join(
    __dirname,
    `../../../output-${outputName}/${outputName}.zip`
  );

  if (fs.existsSync(zipPath)) {
    await extractFromZip(zipPath);

    const jsonFIle = fs.readFileSync(
      `output-${outputName}/structuredData.json`,
      'utf-8'
    );
    const jsonObject = await JSON.parse(jsonFIle);
    const cvText = jsonToText(jsonObject);
    return cvText;
  }
  throw new Error('File does not exist');
}

export async function testPdf(
  req: Request,
  res: Response<{ data: string }>,
  next: NextFunction
) {
  try {
    // const filePath = 'https://mozilla.github.io/pdf.js/build/pdf.js';
    const testFile = path.join(
      __dirname,
      '../../assets/kfir_avraham _fullstack_CV.pdf'
    );
    const outputName = v4();

    const url =
      'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3691757943';

    const [_, jobObj] = await Promise.all([
      extractJsonFromPdf(testFile, outputName),
      getJobInformation(url),
    ]);
    const cvText = await extractedTextFromJson(outputName);

    const coverLetter: CoverLetter = JSON.parse(
      await createCoverLetter(cvText, JSON.stringify(jobObj))
    );

    // await stringToPdf(coverLetter.object, `output/${outputName}.pdf`);
    // await createPdfFromJson(textData);

    await deleteFiles(outputName);
    res.status(200);
    res.json({ data: structureText(coverLetter.data.content) });
    // next(await deleteFiles(files));
  } catch (error) {
    console.log('error:', error);
    next(error);
  }
}
export async function generateCoverLetter(
  req: Request<{}, JobInformation, UserUploadData, UserUploadData>,
  res: Response<JobInformation>,
  next: NextFunction
) {
  try {
    const { url } = req.body;
    const job = await getJobInformation(url);
    res.status(201);
    res.json(job);
  } catch (error) {
    next(error);
  }
}

// testing function
export async function generateCoverLetterGET(
  req: Request<{}, JobInformation, UserUploadData, UserUploadData>,
  res: Response<JobInformation>,
  next: NextFunction
) {
  try {
    const { url } = req.query;
    const job = await getJobInformation(url);
    res.status(201);
    res.json(job);
  } catch (error) {
    next(error);
  }
}
