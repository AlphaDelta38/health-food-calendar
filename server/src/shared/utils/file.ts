import fs from 'fs';
import path from 'path';
import { AppConfig } from '@/index.js';

const getFilePath = (name: string) => path.join(AppConfig.userDataPath, name) + '.json';

async function writeFile(name: string, data: any, async: boolean = false): Promise<void> {
  const filePath = path.join(AppConfig.userDataPath, name) + '.json';

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

	const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

	if (async) {
    await fs.promises.writeFile(filePath, content, 'utf-8');
  } else {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
}

async function readFile(name: string, async: boolean = false): Promise<any> {
  const filePath = path.join(AppConfig.userDataPath, name) + '.json';

  if (!fs.existsSync(filePath)) {
    return {};
  }

	if (async) {
		return JSON.parse(await fs.promises.readFile(filePath, 'utf-8'));
	}

	return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export {
	readFile,
  writeFile,
	getFilePath,
};
