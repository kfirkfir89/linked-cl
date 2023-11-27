import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { Worker } from 'worker_threads';
import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import { getJobInformation } from '../../services/puppeteer/getJobDescription';
import { CoverLetter } from './cover-letter.model';
import { createCoverLetter } from '../../services/chatgpt/createCoverLetter';
import { extractJsonFromPdf } from '../../services/adobe-api/extract-json-from-pdf';
import { IExtractWorkerData } from '../../utils/extractTextFromJsonWorker';
import {
  PuppeteerLink,
  createPuppeteerUrl,
} from '../../services/puppeteer/createPuppeteerUrl';
import { structureText } from '../../utils/extractedTextFromJson';
import WorkerMessage from '../../interfaces/WorkerMessage';

async function fsExists(filePath: string): Promise<boolean> {
  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function deleteFiles(filePath: string) {
  await fsp.rm(filePath, { recursive: true });
}

async function saveCVFile(file: Express.Multer.File): Promise<string> {
  const uploadsDir = path.join(__dirname, '../../../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  if (file.originalname.endsWith('.pdf')) {
    const fileName = `${file.originalname + v4()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    return filePath;
  }
  throw new Error('File is not pdf');
}

// eslint-disable-next-line @typescript-eslint/no-shadow
function createWorker<T>(script: string, workerData: T) {
  return new Worker(script, { workerData });
}
function extractedTextFromJsonWorker(
  type: string,
  outputName: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const p = path.resolve(
      __dirname,
      '../../utils/extractTextFromJsonWorker.ts'
    );
    const pj = path.resolve(__dirname, './worker.import.js');

    const worker = createWorker<IExtractWorkerData>(pj, {
      data: {
        path: p,
        type,
        outputName,
      },
    });

    worker.on('message', (message: WorkerMessage) => {
      if (message.result) {
        resolve(message.result);
      }
      resolve('no result ');
    });

    worker.on('error', (error: Error) => {
      console.log('Worker error:', error);
      reject(error);
    });
  });
}

async function processPDFAndCreateCoverLetter(
  cvFilePath: string,
  linkedInUrlDataObj: PuppeteerLink
): Promise<CoverLetter> {
  const outputName = v4();
  const tick = performance.now();
  const [_, jobObj] = await Promise.all([
    extractJsonFromPdf(cvFilePath, outputName),
    getJobInformation(linkedInUrlDataObj),
  ]);
  const tock = performance.now();
  console.log(`TIMEEEEEEEEEEEEEEEEEEEEEEEEE: ${(tock - tick) / 1000} sec`);

  const cvText = await extractedTextFromJsonWorker('extract_text', outputName);

  const coverLetter = await createCoverLetter(
    cvText,
    JSON.stringify(jobObj)
  ).then((cvJson: string) => {
    const structured = cvJson
      .replace(/\n/g, '')
      .replace(/\t/g, '')
      .replace(/\r/g, '');
    const cl: CoverLetter = JSON.parse(`${cvJson}`);
    console.log('cl:', cl);
    return cl;
  });

  const outputJsonPath = path.join(__dirname, `../../../output-${outputName}`);

  await deleteFiles(outputJsonPath);
  await deleteFiles(cvFilePath);
  return coverLetter;
}

export async function generateCoverLetter(
  req: Request,
  res: Response<{ data: string }>,
  next: NextFunction
) {
  if (req.file && req.file.mimetype === 'application/pdf') {
    const jobUrl: string = req.body.url;
    try {
      const linkedInUrlDataObj = createPuppeteerUrl(jobUrl);
      const savedCVFilePath = await saveCVFile(req.file);
      const coverLetter = await processPDFAndCreateCoverLetter(
        savedCVFilePath,
        linkedInUrlDataObj
      );
      res.status(200);
      res.json({ data: structureText(coverLetter.content) });
    } catch (error) {
      next(error);
    }
  } else {
    throw new Error('No file, or pdf not exsist');
  }
}
