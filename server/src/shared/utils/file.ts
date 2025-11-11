import fs from 'fs';
import path from 'path';
import { AppConfig } from '@/index.js';
import { readdir } from 'fs/promises';

export enum FileExtension {
  JSON = 'json',
  TXT = 'txt',
}

const getFilePath = (
  name: string, 
  extension: FileExtension = FileExtension.JSON
) => path.join(AppConfig.userDataPath, name) + '.' + extension;
    
async function writeFile(name: string, data: any, extension: FileExtension = FileExtension.JSON): Promise<void> {
  const filePath = path.join(AppConfig.userDataPath, name) + '.' + extension;

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

	const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);


  await fs.promises.writeFile(filePath, content, 'utf-8');
}

async function readFile(name: string, extension: FileExtension = FileExtension.JSON, createIfNotExists: boolean = false): Promise<any> {
  const filePath = path.join(AppConfig.userDataPath, name) + '.' + extension;

  if (!fs.existsSync(filePath) && !createIfNotExists) {
    return {};
  }

  if (!fs.existsSync(filePath) && createIfNotExists) {
    await fs.promises.writeFile(filePath, '{}', 'utf-8');
  }


	return JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
}

async function listFiles(dirPath: string) {
  try {
    const filePath = path.join(AppConfig.userDataPath, dirPath);

    const files = await readdir(filePath);

    return files;
  } catch (err) {
    console.error("Ошибка чтения папки:", err);
  }
}


export {
	readFile,
  writeFile,
	getFilePath,
  listFiles,
};
