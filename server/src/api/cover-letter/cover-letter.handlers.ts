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

async function deleteFiles(outputName: string) {
  const outputDir = path.join(__dirname, `../../../output-${outputName}`);
  await fsp.rm(outputDir, { recursive: true });
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

export async function generateCoverLetter(
  req: Request,
  res: Response<{ data: string }>,
  next: NextFunction
) {
  console.log('HEREEEEEEEEEEEEEEE');
  if (req.file) {
    try {
      const uploadsDir = path.join(__dirname, '../../../uploads'); // Ensure this path is correct
      const fileBuffer = req.file.buffer;

      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('Created uploads directory');
      }

      // Write the buffer to a file
      const fileName = req.file.originalname.endsWith('.pdf')
        ? req.file.originalname
        : `${req.file.originalname}.pdf`;
      const filePath = path.join(uploadsDir, fileName);
      console.log('File path:', filePath);
      // Write the buffer to a file
      fs.writeFileSync(filePath, req.file.buffer);
      // Respond with the path or some other success message
      res.status(200).json({ data: filePath });
    } catch (error) {
      console.error('Error saving file:', error);
      res.status(500).json({ data: (error as Error).message });
    }
  }
  return { data: 'no file' };
}

// try {
//   // PDF CHECKER GOES HERE <<<<<<-------------------------
//   // const filePath = 'https://mozilla.github.io/pdf.js/build/pdf.js';
//   const testFile = path.join(
//     __dirname,
//     '../../assets/kfir_avraham _fullstack_CV.pdf'
//   );
//   const url =
//     'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3691757943';

//   const outputName = v4();
//   const tick = performance.now();
//   const [_, jobObj] = await Promise.all([
//     extractJsonFromPdf(testFile, outputName),
//     getJobInformation(url),
//   ]);
//   const tock = performance.now();
//   console.log(`TIMEEEEEEEEEEEEEEEEEEEEEEEEE: ${(tock - tick) / 1000} sec`);

//   const cvText = await extractedTextFromJsonWorker(
//     'extract_text',
//     outputName
//   );
//   // const cvText = await extractedTextFromJson(outputName);

//   const coverLetter = await createCoverLetter(
//     cvText,
//     JSON.stringify(jobObj)
//   ).then((cvJson: string) => {
//     const structured = cvJson
//       .replace(/\n/g, '')
//       .replace(/\t/g, '')
//       .replace(/\r/g, '');
//     const cl: CoverLetter = JSON.parse(`${structured}`);
//     console.log('cl:', cl);
//     return cl;
//   });

//   await deleteFiles(outputName);
//   res.status(200);
//   res.json({ data: structureText(coverLetter.content) });
// } catch (error) {
//   console.log('error:', error);
//   next(error);
// }
// }
