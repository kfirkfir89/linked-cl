import path from 'path';
import fs from 'fs';
import { jsonToText } from './textHandlers';
import { extractFromZip } from './extractFromZip';

export async function extractedTextFromJson(outputName: string) {
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
