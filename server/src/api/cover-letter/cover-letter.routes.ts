import express from 'express';

import { z } from 'zod';
import {
  generateCoverLetter,
  generateCoverLetterGET,
} from './cover-letter.handlers';
import { validateRequest } from '../../middlewares';
import { UrlInput } from './cover-letter.model';

const coverLetterRouter = express.Router();

coverLetterRouter.post(
  '/',
  validateRequest({ body: UrlInput }),
  generateCoverLetter
);
coverLetterRouter.get(
  '/',
  validateRequest({ query: UrlInput }),
  generateCoverLetterGET
);

export { coverLetterRouter };
