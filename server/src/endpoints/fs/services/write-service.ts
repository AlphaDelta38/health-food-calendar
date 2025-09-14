import fs from 'fs';
import path from 'path';
import { AppConfig } from '@/index.js';

async function writeDataToFile(name: string, json: string): Promise<string | null> {
  const filePath = path.join(AppConfig.userDataPath, name) + '.json';
  let fileContent = "{}";

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }else{
    fileContent = fs.readFileSync(filePath, "utf-8");
  }

  const inputJson = JSON.parse(json);
  const parsedContent = JSON.parse(fileContent) ?? {};

  for (const [key, value] of Object.entries(inputJson)) {
    parsedContent[key] = value;
  }

  const newJsonString = JSON.stringify(parsedContent, null, 2);

  fs.writeFileSync(filePath, newJsonString, "utf-8");

  return newJsonString;
}

export {
    writeDataToFile,
}