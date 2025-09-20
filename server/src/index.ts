import express from 'express';
import openFoodFactsRouter from '@/endpoints/open-food-facts/route/index.js';
import cors from 'cors';
import fsRouter from '@/endpoints/fs/route/index.js';
import fs from 'fs/promises';

const mock = "C:\\Users\\kiril\\AppData\\Roaming\\electron-ts-app";

export const AppConfig = {
  userDataPath: "" as string,
};

async function initUserDataPath(path: string) {
  const folderPath = path + '\\data';

  await fs.mkdir(folderPath, { recursive: true });

  AppConfig.userDataPath = folderPath;
}

async function startServer(rootPath: string) {
  const app = express();
  const PORT = 5000;
  
  await initUserDataPath(rootPath);
  
  app.use(cors());
  app.use(express.json());

  app.use('/open-food-facts', openFoodFactsRouter);
  app.use('/fs', fsRouter);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  return app;
}

startServer(mock);
