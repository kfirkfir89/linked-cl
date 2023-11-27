import express from 'express';
import { coverLetterRouter } from './cover-letter/cover-letter.routes';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});
router.use('/cover-letter', coverLetterRouter);

export default router;
