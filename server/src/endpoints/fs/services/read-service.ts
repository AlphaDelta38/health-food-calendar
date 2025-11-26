import fs from 'fs';
import path from 'path';
import { AppConfig } from '@/index.js';


async function getDataFile(name: string): Promise<object | null> {
  const filePath = path.join(AppConfig.userDataPath, name) + '.json';

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  
  return data;
}

export {
  getDataFile,
}