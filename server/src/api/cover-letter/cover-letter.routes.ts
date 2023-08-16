import express from 'express';

import { z } from 'zod';
import {
  generateCoverLetter,
  generateCoverLetterGET,
  testPdf,
} from './cover-letter.handlers';
import { validateRequest } from '../../middlewares';
import { UserUploadData } from './cover-letter.model';

const coverLetterRouter = express.Router();

coverLetterRouter.post(
  '/',
  validateRequest({ body: UserUploadData }),
  generateCoverLetter
);
coverLetterRouter.get('/test', testPdf);
coverLetterRouter.get(
  '/',
  validateRequest({ query: UserUploadData }),
  generateCoverLetterGET
);

export { coverLetterRouter };
