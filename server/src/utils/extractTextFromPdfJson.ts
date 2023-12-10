import path from 'path';
import fs from 'fs';
import unzipper from 'unzipper';

async function extractFromZip(filePath: string) {
  const outputFileName = path.basename(filePath, '.zip');
  const stream = fs.createReadStream(filePath);
  await new Promise((resolve, reject) => {
    stream
      .pipe(unzipper.Extract({ path: `output-${outputFileName}/` }))
      .on('close', resolve)
      .on('error', reject);
  });

  stream.destroy();
}

function jsonToText(jsonObject: any) {
  let extractedText = '';
  jsonObject.elements.forEach((element: any, index: number) => {
    if (element.Text) {
      if (
        element.Path.includes('H1') ||
        element.Path.includes('H2') ||
        element.Path.includes('H3') ||
        element.Path.includes('Summary') ||
        element.Path.includes('Skills') ||
        element.Path.includes('Technical Experience') ||
        element.Path.includes('Education')
      ) {
        extractedText += '\n\n';
      }
      if (element.Text.includes('•')) {
        extractedText += `\n${element.Text} `;
      }
      // if (index > 0 && jsonObject.elements[index - 1].Text.includes('•')) {
      //   extractedText += `${element.Text} `;
      // }
      if (
        element.Path.includes('LI') &&
        (!jsonObject.elements[index - 1] ||
          (jsonObject.elements[index - 1] &&
            jsonObject.elements[index - 1].Text.includes('•')))
      ) {
        extractedText += '\n';
      } else {
        extractedText += ' ';
      }
      extractedText += element.Text;
    }
  });
  return extractedText.trim();
}

async function extractTextFromPdfJson(outputName: string) {
  const zipPath = path.join(`output-${outputName}/${outputName}.zip`);
  if (fs.existsSync(zipPath)) {
    await extractFromZip(zipPath);

    const jsonFIle = fs.readFileSync(
      `output-${outputName}/structuredData.json`,
      'utf-8'
    );
    const jsonObject = await JSON.parse(jsonFIle);
    const cvText = jsonToText(jsonObject);
    return cvText;
  }
  throw new Error('File does not exist');
}

export { extractTextFromPdfJson };
