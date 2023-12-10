import { Readable } from 'stream';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function generateCoverLetterPDF(
  letterContent: string,
  outputFileName: string
): Promise<NodeJS.ReadableStream> {
  try {
    const formattedContent = letterContent
      .replace(/\n/g, '<br />')
      .replace(/\. /g, '.<br />');

    // Launch a new browser instance
    const browser = await puppeteer.launch({ headless: 'new' });

    // Open a new page
    const page = await browser.newPage();

    // Read HTML template
    const templatePath = path.join(__dirname, 'coverLetterTemplate.html');
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholder with actual letter content
    const htmlContent = templateContent.replace('', formattedContent);
    // Set HTML content
    await page.setContent(htmlContent);

    // Generate PDF
    const pdfPath = path.join(
      `output-${outputFileName}/${outputFileName}-cl.pdf`
    );
    const pdfBuffer = await page.pdf({ path: pdfPath, format: 'A4' });
    const pdfStream = Readable.from(pdfBuffer);
    // Close the browser
    await browser.close();

    return pdfStream;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export { generateCoverLetterPDF };
