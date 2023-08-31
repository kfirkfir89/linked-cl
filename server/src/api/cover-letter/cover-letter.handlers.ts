import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { NextFunction, Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import {
  JobInformation,
  getJobInformation,
} from '../../utils/getJobDescription';
import { UserUploadData } from './cover-letter.model';
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
import { summrizeUserCv } from '../../services/chatgpt/summrizeUserCv';
import { createCoverLetterTemplate } from '../../services/chatgpt/createCoverLetterTemplate';
import { createCoverLetter } from '../../services/chatgpt/createCoverLetter';

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
    const cvJson = await getJsonObject(outputFileName);
    const cvText = jsonToText(cvJson);
    return { cvJson, cvText };
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
      'https://www.linkedin.com/jobs/collections/recommended/?currentJobId=3691757943';

    const [_, cvTemplate] = await Promise.all([
      extractTextFromPdf(filePath, outputFileName),
      getJobInformation(url).then((jobInformation) =>
        createCoverLetterTemplate(jobInformation)
      ),
    ]);
    console.log('cvTemplate:', cvTemplate);
    const { cvJson, cvText } = await getJsonAndText(outputFileName);

    // const [summrizeCv, cvTemplate] = await Promise.all([
    //   summrizeUserCv(cvText),
    //   createCoverLetterTemplate(jobInformation),
    // ]);

    const cv = await createCoverLetter(cvText, cvTemplate);

    // await stringToPdf(coverLetter.object, `output/${outputFileName}.pdf`);
    // await createPdfFromJson(textData);

    const outputDir = path.join(__dirname, `../../../output-${outputFileName}`);
    await fsp.rmdir(outputDir, { recursive: true });
    res.status(200);
    res.json({ data: cv });
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
