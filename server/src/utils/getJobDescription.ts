import puppeteer, { Page } from 'puppeteer';
import { JobInformation } from '../api/cover-letter/cover-letter.model';
import { createPuppeteerUrl } from './createPuppeteerUrl';

async function scripteJobInformation(page: Page) {
  return page.evaluate(() => {
    const title = Array.from(document.querySelectorAll('h1'));
    const company = Array.from(
      document.querySelectorAll('.topcard__org-name-link')
    );
    const description = Array.from(
      document.querySelectorAll('.show-more-less-html__markup')
    );

    const descriptionData: string[] = [];
    description.forEach((d) => {
      const textContent = d.textContent ? d.textContent.trim() : '';
      descriptionData.push(textContent);
    });
    const cleanDescription = descriptionData.join(' ');

    const job: JobInformation = {
      title: title[0].textContent || '',
      company: company[0].textContent?.trim() || '',
      description: cleanDescription,
    };

    return job;
  });
}

const getJobInformation = async (jobUrl: string) => {
  const url = createPuppeteerUrl(jobUrl);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const jobInformation: JobInformation = await scripteJobInformation(page);
  if (!jobInformation) {
    throw new Error('Something went wrong try again.');
  }

  browser.close();
  return jobInformation;
};

export { getJobInformation };
