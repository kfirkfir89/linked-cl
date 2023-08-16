import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';
import { NextFunction, Request, Response } from 'express';
import pdf from 'pdf-parse';
import { getJobInformation } from '../../utils/getJobDescription';
import { JobInformation, UserUploadData } from './cover-letter.model';
import { extractTextFromPdf } from '../../services/adobe-api';

async function fsExists(filePath: string): Promise<boolean> {
  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function jsonToText(outputFileName: string) {
  const filePath = path.join(
    __dirname,
    `../../../output/${outputFileName}.zip`
  );

  if (await fsExists(filePath)) {
    const stream = fs.createReadStream(filePath);
    await new Promise((resolve, reject) => {
      stream
        .pipe(unzipper.Extract({ path: 'output/' }))
        .on('close', resolve)
        .on('error', reject);
    });
    await fsp.rename(
      'output/structuredData.json',
      `output/${outputFileName}.json`
    );
    const jsonData = await fsp.readFile(
      `output/${outputFileName}.json`,
      'utf-8'
    );
    const jsonObject = JSON.parse(jsonData);

    let extractedText = '';
    jsonObject.elements.forEach((element: any, index: number) => {
      if (element.Text) {
        console.log('Current:', element.Text);
        if (index > 0) {
          console.log('Previous:', jsonObject.elements[index - 1].Text);
        }
        if (
          element.Path.includes('H1') ||
          element.Path.includes('H2') ||
          element.Path.includes('H3') ||
          element.Path.includes('Summary') ||
          element.Path.includes('Skills') ||
          element.Path.includes('Technical Experience') ||
          element.Path.includes('Education')
        ) {
          extractedText += '\n\n';
        }
        if (element.Text.includes('•')) {
          extractedText += `\n${element.Text} `;
        }
        // if (index > 0 && jsonObject.elements[index - 1].Text.includes('•')) {
        //   extractedText += `${element.Text} `;
        // }
        if (
          element.Path.includes('LI') &&
          (!jsonObject.elements[index - 1] ||
            (jsonObject.elements[index - 1] &&
              jsonObject.elements[index - 1].Text.includes('•')))
        ) {
          extractedText += '\n';
        } else {
          extractedText += ' ';
        }
        extractedText += element.Text;
      }
    });
    return extractedText.trim();
  }
  throw new Error('File does not exist');
}

async function deleteFiles(files: string[]) {
  for (let i = 0; i < files.length; i + 1) {
    const outputFilePath = path.join(
      __dirname,
      `../../../output/${files[i].trim()}`
    );
    // eslint-disable-next-line no-await-in-loop
    await fsp.unlink(outputFilePath);
  }
}
export async function testPdf(
  req: Request,
  res: Response<{ data: string }>,
  next: NextFunction
) {
  try {
    // const filePath = 'https://mozilla.github.io/pdf.js/build/pdf.js';
    const filePath = path.join(
      __dirname,
      '../../assets/kfir_avraham _fullstack_CV.pdf'
    );
    const outputFileName = path.basename(filePath, '.pdf');
    const outputDir = path.join(__dirname, '../../../output');

    // const dataBuffer = fs.readFileSync(filePath);
    // const data = await pdf(dataBuffer).then(function (pdfResult) {
    //   return pdfResult.text;
    // });
    await extractTextFromPdf(filePath, outputFileName);
    const data = await jsonToText(outputFileName);
    await fsp.rmdir(outputDir, { recursive: true });

    // const files = await fsp.readdir(outputDir);
    res.status(200);
    res.json({ data });
    // next(await deleteFiles(files));
  } catch (error) {
    console.log('Error processing the PDF:', error);
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
