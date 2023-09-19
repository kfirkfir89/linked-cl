import path from 'path';
import fs from 'fs';
import { parentPort, workerData } from 'worker_threads';
import { extractFromZip } from './extractFromZip';
import { jsonToText } from './textHandlers';

export interface IExtractWorkerData {
  data: {
    path: string;
    type: string;
    outputName?: string;
  };
}

const typedWorkerData = workerData as IExtractWorkerData;

async function extractedTextFromJson(outputName: string) {
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

(async () => {
  try {
    if (
      typedWorkerData.data.type === 'extract_text' &&
      typedWorkerData.data.outputName
    ) {
      const result = await extractedTextFromJson(
        typedWorkerData.data.outputName
      );
      parentPort?.postMessage({ type: 'extract_text', result });
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

export {};
