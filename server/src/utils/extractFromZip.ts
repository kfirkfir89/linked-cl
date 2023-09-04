import fs from 'fs';
import path from 'path';
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

export { extractFromZip };
