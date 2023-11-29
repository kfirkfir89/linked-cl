import path from 'path';
import { Worker } from 'worker_threads';
import { NextFunction, Request, Response } from 'express';
import { getLinkedInJobInformation } from '../../services/puppeteer/getJobDescription';
import { CoverLetter } from './cover-letter.model';
import { createCoverLetter } from '../../services/chatgpt/createCoverLetter';
import { extractPdfContentToJson } from '../../services/adobe-api/extract-json-from-pdf';
import {
  PuppeteerLink,
  createPuppeteerUrl,
} from '../../services/puppeteer/createPuppeteerUrl';
import { structureText } from '../../utils/extractTextFromPdfJson';
import WorkerMessage from '../../interfaces/WorkerMessage';
import { IExtractTextWorkerData } from '../../utils/extractTextFromPdfJsonWorker';
import {
  deleteOutputFiles,
  deleteFile,
  saveUploadedCVFile,
} from '../../utils/fsHandlers';

function createWorker<T>(script: string, workerData: T) {
  return new Worker(script, { workerData });
}
function extractTextFromPdfJsonWorker(
  type: string,
  outputName: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const workerFunction = path.resolve(
      __dirname,
      '../../utils/extractTextFromPdfJsonWorker.ts'
    );
    const pj = path.resolve(__dirname, './worker.import.js');

    const worker = createWorker<IExtractTextWorkerData>(pj, {
      data: {
        path: workerFunction,
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
      reject(error);
    });
  });
}

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

  const cl: CoverLetter = JSON.parse(`${coverLetterJson}`);

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
    const linkedInUrlDataObj = createPuppeteerUrl(req.body.url as string);
    const savedCVFilePath = await saveUploadedCVFile(req.file);
    const savedCVFileName = path.basename(savedCVFilePath);

    const [cvText, jobObj] = await Promise.all([
      extractTextFromUploadedPdf(savedCVFilePath, savedCVFileName),
      getLinkedInJobInformation(linkedInUrlDataObj),
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

// async function processPDFAndCreateCoverLetter(
//   cvFilePath: string,
//   linkedInUrlDataObj: PuppeteerLink
// ): Promise<CoverLetter> {
//   const outputName = v4();
//   const tick = performance.now();
//   const [_, jobObj] = await Promise.all([
//     extractJsonFromPdf(cvFilePath, outputName),
//     getJobInformation(linkedInUrlDataObj),
//   ]);
//   const tock = performance.now();
//   console.log(`TIMEEEEEEEEEEEEEEEEEEEEEEEEE: ${(tock - tick) / 1000} sec`);

//   const cvText = await extractedTextFromJsonWorker('extract_text', outputName);

//   const coverLetter = await createCoverLetter(
//     cvText,
//     JSON.stringify(jobObj)
//   ).then((cvJson: string) => {
//     const structured = cvJson
//       .replace(/\n/g, '')
//       .replace(/\t/g, '')
//       .replace(/\r/g, '');
//     const cl: CoverLetter = JSON.parse(`${cvJson}`);
//     console.log('cl:', cl);
//     return cl;
//   });

//   const outputJsonPath = path.join(__dirname, `../../../output-${outputName}`);

//   await deleteFiles(outputJsonPath);
//   await deleteFiles(cvFilePath);
//   return coverLetter;
// }
// export async function generateCoverLetter(
//   req: Request,
//   res: Response<{ data: string }>,
//   next: NextFunction
// ) {
//   if (req.file && req.file.mimetype === 'application/pdf') {
//     const jobUrl: string = req.body.url;
//     try {
//       const linkedInUrlDataObj = createPuppeteerUrl(jobUrl);
//       const savedCVFilePath = await saveCVFile(req.file);
//       const coverLetter = await processPDFAndCreateCoverLetter(
//         savedCVFilePath,
//         linkedInUrlDataObj
//       );
//       res.status(200);
//       res.json({ data: structureText(coverLetter.content) });
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     throw new Error('No file, or pdf not exsist');
//   }
// }
