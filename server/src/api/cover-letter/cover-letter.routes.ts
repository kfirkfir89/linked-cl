import express from 'express';
import multer from 'multer';
import { generateCoverLetter } from './cover-letter.handlers';
import { validateRequest } from '../../middlewares';
import { UserUploadData } from './cover-letter.model';

const coverLetterRouter = express.Router();

const uploadPdfFile = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      const error = new Error('Only PDF files are allowed!');
      cb(error as any, false);
    }
  },
});

coverLetterRouter.post(
  '/',
  uploadPdfFile.single('file'),
  validateRequest({
    body: UserUploadData,
  }),
  generateCoverLetter
);

export { coverLetterRouter };
