import path from 'path';
import fs from 'fs';
import { parentPort, workerData } from 'worker_threads';
import { extractFromZip } from './extractFromZip';
import { jsonToText } from './textHandlers';

console.log('workerDataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:', workerData);
interface Message {
  path: string;
  type: string;
  outputName?: string;
}
async function extractedTextFromJson(outputName: string) {
  const zipPath = path.join(`output-${outputName}/${outputName}.zip`);
  console.log('zipPathhhhhhhhhhhhhhh:', zipPath);
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

(async () => {
  try {
    if (workerData.type === 'extract_text') {
      console.log('outputName:', workerData.outputName);
      const result = await extractedTextFromJson(workerData.outputName);
      console.log('result:', result);
      parentPort?.postMessage({ type: 'extract_text', result });
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

export {};
