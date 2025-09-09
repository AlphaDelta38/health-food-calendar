import express from 'express';
import openFoodFactsRouter from './routes/open-food-facts/index.js';
import cors from 'cors';
import fsRouter from './routes/fs/index.js';
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

function startServer(rootPath: string) {
  const app = express();
  const PORT = 5000;
  
  initUserDataPath(rootPath);

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
