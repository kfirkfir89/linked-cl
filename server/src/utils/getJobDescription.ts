import puppeteer, { Page } from 'puppeteer';
import { z } from 'zod';
import { createPuppeteerUrl } from './createPuppeteerUrl';

export const JobInformation = z.object({
  linkedInJobId: z.string().min(6),
  url: z.string().min(10),
  title: z.string().min(1),
  company: z.string().min(1),
  recruiter: z.string().min(1),
  description: z.string().min(10),
});
export type JobInformation = z.infer<typeof JobInformation>;

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

    const job: Omit<JobInformation, 'url' | 'linkedInJobId'> = {
      title: jobRole[0].textContent?.trim() || '',
      company: company[0].textContent?.trim() || '',
      recruiter: recruiter[0].textContent?.trim() || '',
      description: cleanDescription,
    };
    return job;
  });
}

async function getJobInformation(jobUrl: string) {
  const { linkedInJobId, url } = createPuppeteerUrl(jobUrl);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/jobs/view/3691757943/');

  const scriptedInfo: Omit<JobInformation, 'url' | 'linkedInJobId'> =
    await scripteJobInformation(page);
  if (!scriptedInfo) {
    throw new Error('Something went wrong try again.');
  }

  const jobInformation: JobInformation = {
    linkedInJobId,
    url,
    ...scriptedInfo,
  };

  await browser.close();
  return jobInformation;
}

export { getJobInformation };
