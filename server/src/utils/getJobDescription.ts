import puppeteer from 'puppeteer';

const getJobDescription = async (url: string) => {
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

    const data = {
      title: title[0].textContent || '',
      description: cleanDescription,
    };

    return data;
  });

  browser.close();
  return jobDescription;
};

export { getJobDescription };
