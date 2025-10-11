import fs from 'fs';
import path from 'path';
import { AppConfig } from '@/index.js';

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

async function readFile(name: string, extension: FileExtension = FileExtension.JSON): Promise<any> {
  const filePath = path.join(AppConfig.userDataPath, name) + '.' + extension;

  if (!fs.existsSync(filePath)) {
    return {};
  }


	return JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
}

export {
	readFile,
  writeFile,
	getFilePath,
};
