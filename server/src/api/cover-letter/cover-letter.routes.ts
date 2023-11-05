import express from 'express';
import { z } from 'zod';
import multer from 'multer';
import { generateCoverLetter } from './cover-letter.handlers';
import { validateRequest } from '../../middlewares';
import { UserUploadData } from './cover-letter.model';

const coverLetterRouter = express.Router();

const upload = multer();

// coverLetterRouter.post(
//   '/',
//   validateRequest({ body: UserUploadData }),
//   generateCoverLetter
// );
coverLetterRouter.get('/test', generateCoverLetter);
coverLetterRouter.post('/test', upload.single('file'), generateCoverLetter);

export { coverLetterRouter };
