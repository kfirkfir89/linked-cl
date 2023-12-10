import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

async function fsExists(filePath: string): Promise<boolean> {
  try {
    await fsp.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function deleteFile(filePath: string) {
  await fsp.rm(filePath, { recursive: true });
}
async function deleteOutputFiles(fileName: string) {
  const outputPdfJsonPath = path.join(
    __dirname,
    `../../../server/output-${fileName}`
  );
  await deleteFile(outputPdfJsonPath);
}

async function saveUploadedCVFile(file: Express.Multer.File): Promise<string> {
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  if (file.originalname.endsWith('.pdf')) {
    const fileName = `${v4() + file.originalname}`;
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    return filePath;
  }
  throw new Error('File is not pdf');
}

function structureText(input: string): string {
  const lines = input.replace(/\./g, '.\n').split('\n');

  const structuredText = lines.join('\n');

  return structuredText.trim();
}

export function structureJson(input: string): string {
  const structured = input.replace(/[\n\r\t]/g, ' ');
  return structured;
}

export {
  deleteFile,
  structureText,
  deleteOutputFiles,
  fsExists,
  saveUploadedCVFile,
};
