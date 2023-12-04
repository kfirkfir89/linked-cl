import path from 'path';
import { Worker } from 'worker_threads';
import { IExtractTextWorkerData } from './extractTextFromPdfJsonWorkerTask';
import WorkerMessage from '../interfaces/WorkerMessage';

function createWorker<T>(script: string, workerData: T) {
  return new Worker(script, { workerData });
}
function extractTextFromPdfJsonWorker(
  type: string,
  outputName: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const workerFunction = path.resolve(
      __dirname,
      './extractTextFromPdfJsonWorkerTask.ts'
    );
    const pj = path.resolve(__dirname, './worker.import.js');

    const worker = createWorker<IExtractTextWorkerData>(pj, {
      data: {
        path: workerFunction,
        type,
        outputName,
      },
    });

    worker.on('message', (message: WorkerMessage) => {
      if (message.result) {
        resolve(message.result);
      }
      resolve('no result ');
    });

    worker.on('error', (error: Error) => {
      reject(error);
    });
  });
}

export { extractTextFromPdfJsonWorker };
