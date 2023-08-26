import fs from 'fs';
import PDFDocument from 'pdfkit';

function stringToPdf(inputString: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const stream = doc.pipe(fs.createWriteStream(outputPath));

    doc.text(inputString);
    // // Header
    // doc
    //   .fontSize(20)
    //   .text(data.yourName, { align: 'left' })
    //   .fontSize(12)
    //   .text(data.yourAddress)
    //   .text(`Email: ${data.yourEmail}`)
    //   .text(`Phone: ${data.yourPhone}`)
    //   .moveDown();

    // // Date and Hiring Manager's Details
    // doc
    //   .text(data.date)
    //   .moveDown()
    //   .text(data.hiringManager)
    //   .text(data.companyName)
    //   .text(data.companyAddress)
    //   .moveDown();

    // // Salutation
    // doc.text(`Dear ${data.hiringManager},`).moveDown();

    // // Closing
    // doc
    //   .text(
    //     `Thank you for considering my application. I am looking forward to the possibility of contributing to ${data.companyName} and am available at your earliest convenience for an interview.`
    //   )
    //   .moveDown()
    //   .text('Sincerely,')
    //   .moveDown(1.5)
    //   .text(data.yourName);

    stream.on('finish', () => {
      resolve();
    });

    // Handle error
    stream.on('error', (err) => {
      reject(err);
    });

    // Finalize the PDF
    doc.end();
  });
}

export { stringToPdf };
