import { parentPort, workerData } from 'worker_threads';
import { extractTextFromPdfJson } from './extractTextFromPdfJson';

export interface IExtractTextWorkerData {
  data: {
    path: string;
    type: string;
    outputName?: string;
  };
}

const typedWorkerData = workerData as IExtractTextWorkerData;

(async () => {
  try {
    if (
      typedWorkerData.data.type === 'extract_text' &&
      typedWorkerData.data.outputName
    ) {
      const result = await extractTextFromPdfJson(
        typedWorkerData.data.outputName
      );
      parentPort?.postMessage({ type: 'extract_text', result });
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

export {};
