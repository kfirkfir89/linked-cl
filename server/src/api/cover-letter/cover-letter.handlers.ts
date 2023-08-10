import { NextFunction, Request, Response } from 'express';
import { createPuppeteerUrl } from '../../utils/createPuppeteerUrl';
import { getJobDescription } from '../../utils/getJobDescription';
import { JobDescription, UrlInput } from './cover-letter.model';

export async function generateCoverLetter(
  req: Request<{}, JobDescription, UrlInput>,
  res: Response<JobDescription>,
  next: NextFunction
) {
  try {
    const { url } = req.body;
    const jobUrl = createPuppeteerUrl(url);
    if (!jobUrl) {
      res.status(404);
      throw new Error('Job ID not found in the provided URL.');
    }
    const jobDescription = await getJobDescription(jobUrl);

    res.status(201);
    res.json(jobDescription);
  } catch (error) {
    next(error);
  }
}
// testing function
export async function generateCoverLetterGET(
  req: Request<{}, JobDescription, UrlInput, UrlInput>,
  res: Response<JobDescription>,
  next: NextFunction
) {
  try {
    const { url } = req.query;
    const jobUrl = createPuppeteerUrl(url);
    if (!jobUrl) {
      res.status(404);
      throw new Error('Job ID not found in the provided URL.');
    }
    const jobDescription = await getJobDescription(jobUrl);

    res.status(201);
    res.json(jobDescription);
  } catch (error) {
    next(error);
  }
}
