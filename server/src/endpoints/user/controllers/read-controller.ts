import { getDataFile } from "@/endpoints/fs/services/read-service";
import { AppFilePaths } from "@/shared/types/global";
import { handleError } from "@/shared/utils/error-handler";
import { FileExtension, readFile } from "@/shared/utils/file"

import { Request, Response } from "express";

async function getUserDataService(): Promise<typeof getDataFile> {
  const data = await readFile(AppFilePaths.googleAuthToken, FileExtension.TXT);

  if (!data) {
    return getDataFile;
  }

  return getDataFile;
}

async function getUserDataController(req: Request, res: Response): Promise<void> {
  try {
    const service = await getUserDataService();

    const data = await service(AppFilePaths.appConfig);

    

  } catch (e) {
    const result = handleError(e);
    res.status(result.status).json(result);
  }
}


async function writeUserDataController(req: Request, res: Response): Promise<void> {
  try {

  } catch (e) {
    const result = handleError(e);
    res.status(result.status).json(result);
  }
}

export {
  getUserDataController,
  writeUserDataController,
}
