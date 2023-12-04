import puppeteer, { Page } from 'puppeteer';
import { z } from 'zod';
import { PuppeteerLink } from './createPuppeteerUrl';

export const JobData = z.object({
  linkedInJobId: z.string().min(6),
  url: z.string().min(10),
  title: z.string().min(1),
  company: z.string().min(1),
  recruiter: z.string().min(1),
  description: z.string().min(10),
});
export type JobData = z.infer<typeof JobData>;

async function scripteJobInformation(page: Page) {
  return page.evaluate(() => {
    const jobRole = Array.from(
      document.querySelectorAll('.top-card-layout__title')
    );
    const company = Array.from(
      document.querySelectorAll('.topcard__org-name-link')
    );
    const recruiter = Array.from(
      document.querySelectorAll('.base-main-card__title')
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

    const job: Omit<JobData, 'url' | 'linkedInJobId'> = {
      title: jobRole[0].textContent?.trim() || '',
      company: company[0].textContent?.trim() || '',
      recruiter: recruiter[0].textContent?.trim() || '',
      description: cleanDescription,
    };
    return job;
  });
}

async function getLinkedInJobData(linkedInUrlDataObj: PuppeteerLink) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(linkedInUrlDataObj.url);

  const scriptedJobInformation: Omit<JobData, 'url' | 'linkedInJobId'> =
    await scripteJobInformation(page);

  if (!scriptedJobInformation) {
    throw new Error('Something went wrong try again.');
  }

  const JobDataObj: JobData = {
    ...linkedInUrlDataObj,
    ...scriptedJobInformation,
  };

  await browser.close();
  return JobDataObj;
}

export { getLinkedInJobData };
