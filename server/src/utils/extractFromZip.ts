import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';

async function fsExists(filePath: string): Promise<boolean> {
  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function getJsonObject(outputFileName: string) {
  const file = fs.readFileSync(
    `output-${outputFileName}/structuredData.json`,
    'utf-8'
  );
  const jsonObject = JSON.parse(file);
  return jsonObject;
}

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

export { extractFromZip, fsExists, getJsonObject };
