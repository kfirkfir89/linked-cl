import express from 'express';
import multer from 'multer';
import { generateCoverLetter } from './cover-letter.handlers';
import { validateRequest } from '../../middlewares';
import { UserUploadData } from './cover-letter.model';

const coverLetterRouter = express.Router();

const uploadPdfFile = multer();

coverLetterRouter.post(
  '/',
  uploadPdfFile.single('file'),
  validateRequest({
    body: UserUploadData,
  }),
  generateCoverLetter
);

export { coverLetterRouter };
