import express from 'express';
import openFoodFactsRouter from '@/endpoints/open-food-facts/route/index.js';
import googleDiskRouter from '@/endpoints/google-disk/route/index.js';
import userRouter from '@/endpoints/user/route/index.js';
import cors from 'cors';
import fsRouter from '@/endpoints/fs/route/index.js';
import fs from 'fs/promises';
import { PORT } from '@/shared/constants/index.js';
import { AppConfigStructure } from './shared/types/global';
import { getFilePath } from './shared/utils/file.js';
import { UserDataKeys } from '@/shared/repositories/user-data/types/index.js';

const mock = "C:\\Users\\kiril\\AppData\\Roaming\\electron-ts-app";

export const AppConfig: AppConfigStructure = {
  userDataPath: "" as string,
  chosenLenguages: ["en"],
  entitiesFoldersPaths: {
    [UserDataKeys.DISHES]: "dishes",
    [UserDataKeys.INGRIDIENTS]: "myIngredients",
    [UserDataKeys.DISHES_DAYS]: "dishesDays",
  }
};

async function initUserDataPath(path: string) {
  const folderPath = path + '\\data';

  await fs.mkdir(folderPath, { recursive: true });

  AppConfig.userDataPath = folderPath;
}

async function startServer(rootPath: string) {
  const app = express();
  
  await initUserDataPath(rootPath);
  
  app.use(cors());
  app.use(express.json());

  app.use('/open-food-facts', openFoodFactsRouter);
  app.use('/google-disk', googleDiskRouter);
  app.use('/user', userRouter);
  app.use('/fs', fsRouter);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  return app;
}

startServer(mock);
