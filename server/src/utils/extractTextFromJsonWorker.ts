import { parentPort, workerData } from 'worker_threads';
import { extractedTextFromJson } from './extractedTextFromJson';

export interface IExtractWorkerData {
  data: {
    path: string;
    type: string;
    outputName?: string;
  };
}

const typedWorkerData = workerData as IExtractWorkerData;

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
