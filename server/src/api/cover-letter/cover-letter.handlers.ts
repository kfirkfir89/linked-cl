import path from 'path';
import fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { getJobInformation } from '../../utils/getJobDescription';
import { JobInformation, UserUploadData } from './cover-letter.model';
import {
  extractTextFromPdf,
  createPdfFromJson,
} from '../../services/adobe-api';
import {
  extractFromZip,
  fsExists,
  getJsonObject,
} from '../../utils/extractFromZip';
import { createCoverLetterJson } from '../../services/chatgpt';
import { jsonToText, structureText } from '../../utils/textHandlers';

type CoverLetter = {
  personalDetails: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  introduction: {
    hiringManager: string;
    companyName: string;
    positionInterestedIn: string;
  };
  body: {
    content: string;
  };
  conclusion: {
    thankYouNote: string;
  };
};
async function getJsonAndText(outputFileName: string) {
  const filePath = path.join(
    __dirname,
    `../../../output-${outputFileName}/${outputFileName}.zip`
  );

  if (fs.existsSync(filePath)) {
    await extractFromZip(filePath);
    const jsonObject = await getJsonObject(outputFileName);
    const textData = jsonToText(jsonObject);
    return { textData, jsonObject };
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
    const filePath = path.join(
      __dirname,
      '../../assets/kfir_avraham _fullstack_CV.pdf'
    );
    const outputFileName = path.basename(filePath, '.pdf');
    const jsonPath = path.join(
      __dirname,
      `../../../output/${outputFileName}.json`
    );
    const url =
      'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3665395871';

    const [_, jobObj] = await Promise.all([
      extractTextFromPdf(filePath, outputFileName),
      getJobInformation(url),
    ]);
    const job = `${jobObj.company} + ${jobObj.title} + ${jobObj.description}`;

    const { textData } = await getJsonAndText(outputFileName);

    const coverLetterJson = await createCoverLetterJson(job, textData);
    const coverLetter: CoverLetter = JSON.parse(coverLetterJson);
    console.log('coverLetter:', coverLetter);
    coverLetter.body.content = structureText(coverLetter.body.content);
    coverLetter.conclusion.thankYouNote = structureText(
      coverLetter.conclusion.thankYouNote
    );
    const data = coverLetter.body.content;
    console.log('data:', data.length);

    // await stringToPdf(coverLetter.object, `output/${outputFileName}.pdf`);
    // await createPdfFromJson(textData);

    // const outputDir = path.join(__dirname, '../../../output');
    // await fsp.rmdir(outputDir, { recursive: true });
    // const files = await fsp.readdir(outputDir);
    res.status(200);
    res.json({ data });
    // next(await deleteFiles(files));
  } catch (error) {
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
