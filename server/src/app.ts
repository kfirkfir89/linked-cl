import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import puppeteer from 'puppeteer';

// require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'yeayea' }));

function extractJobId(url: string): string | null {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);
  return params.get('currentJobId');
}

const inputUrl =
  'https://www.linkedin.com/jobs/search/?alertAction=viewjobs&currentJobId=3687698460&savedSearchId=1735769914';
const jobId = extractJobId(inputUrl)?.toString();

const url = `https://www.linkedin.com/jobs/view/${jobId}/`;
const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const jobDescription = await page.evaluate(() => {
    const title = Array.from(document.querySelectorAll('h1'));
    const description = Array.from(
      document.querySelectorAll('.show-more-less-html__markup')
    );

    const descriptionData: string[] = [];
    description.forEach((d) => {
      const textContent = d.textContent ? d.textContent.trim() : '';
      descriptionData.push(textContent);
    });
    const cleanDescription = descriptionData.join(' ');

    const data: any = {
      title: title[0].textContent,
      description: cleanDescription,
    };

    return data;
  });

  console.log('jobDescription:', jobDescription);
  // browser.close();
};
main();

export default app;
