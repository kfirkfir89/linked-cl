import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { Worker, parentPort, workerData } from 'worker_threads';
import { NextFunction, Request, Response } from 'express';
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
import { IExtractWorkerData } from '../../utils/extractTextFromJsonWorker';

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
interface Message {
  type: string;
  result?: string;
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

    worker.on('message', (message: Message) => {
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
  linkedInUrl: string
): Promise<CoverLetter> {
  const outputName = v4();
  const tick = performance.now();
  const [_, jobObj] = await Promise.all([
    extractJsonFromPdf(cvFilePath, outputName),
    getJobInformation(linkedInUrl),
  ]);
  const tock = performance.now();
  console.log(`TIMEEEEEEEEEEEEEEEEEEEEEEEEE: ${(tock - tick) / 1000} sec`);

  const cvText = await extractedTextFromJsonWorker('extract_text', outputName);
  // const cvText = await extractedTextFromJson(outputName);

  const coverLetter = await createCoverLetter(
    cvText,
    JSON.stringify(jobObj)
  ).then((cvJson: string) => {
    const structured = cvJson
      .replace(/\n/g, '')
      .replace(/\t/g, '')
      .replace(/\r/g, '');
    const cl: CoverLetter = JSON.parse(`${structured}`);
    console.log('cl:', cl);
    return cl;
  });

  const outputJsonPath = path.join(__dirname, `../../../output-${outputName}`);

  await deleteFiles(outputJsonPath);
  await deleteFiles(cvFilePath);
  return coverLetter;
}

async function saveCVFile(
  file: Express.Multer.File,
  uploadsDir: string
): Promise<string> {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const fileName = file.originalname.endsWith('.pdf')
    ? file.originalname
    : `${file.originalname}.pdf`;
  const filePath = path.join(uploadsDir, fileName);
  fs.writeFileSync(filePath, file.buffer);
  return filePath;
}

export async function generateCoverLetter(
  req: Request,
  res: Response<{ data: string }>,
  next: NextFunction
) {
  if (req.file && req.file.mimetype === 'application/pdf') {
    const jobUrl: string = req.body.url;
    try {
      const uploadsDir = path.join(__dirname, '../../../uploads');
      const savedCVFilePath = await saveCVFile(req.file, uploadsDir);
      const coverLetter = await processPDFAndCreateCoverLetter(
        savedCVFilePath,
        jobUrl
      );
      res.status(200);
      res.json({ data: structureText(coverLetter.content) });
    } catch (error) {
      console.log('error:', error);
      next(error);
    }
  } else {
    throw new Error('No file, or pdf not exsist');
  }
}
