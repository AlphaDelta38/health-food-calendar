import { AppConfigStructure } from "@/shared/types/global.js";
import { DishesStructure } from "../types/entities/dishes.js";
import { IngredientStructure } from "../types/entities/ingridients.js";
import { readFile, writeFile, getFilePath} from "@/shared/utils/file.js";
import { AppConfig } from "@/index.js";
import path from "path";

import { setUserDataProps, UserDataKeys, UserDataRepository } from "../types/index.js"

type UserData = Record<UserDataKeys, {
  cursor: string;
  data: DishesStructure | IngredientStructure | DishesDaysStructure | {};
}>;

class LocalUserDataRepository implements UserDataRepository {
  private data: UserData = {
    [UserDataKeys.DISHES]: {
      cursor: "0-100",
      data: {},
    },
    [UserDataKeys.INGRIDIENTS]: {
      cursor: "0-100",
      data: {},
    },
    [UserDataKeys.DISHES_DAYS]: {
      cursor: "0-100",
      data: {},
    },
    [UserDataKeys.APP_CONFIG]: {
      cursor: "0",
      data: {},
    },
  }

  constructor() {
    this.initUserData();
  }

  async getUserData(key: UserDataKeys, cursor: string): Promise<DishesDaysStructure | DishesStructure | IngredientStructure | AppConfigStructure> {
    const entityData = await this.getEntityData(key, cursor);
    
    this.data[key].data = entityData;

    return entityData;
  }

  setUserData(data: setUserDataProps): void {
    throw new Error("Method not implemented.");
  }

  async initUserData(): Promise<void> {
    try {
      for (const key in this.data) {
        const keyName = key as keyof typeof AppConfig.entitiesFoldersPaths;

        const entityData = await this.getEntityData(keyName, this.data[keyName].cursor);

        this.data[keyName].data = entityData;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async syncUserData(): Promise<void> {
    try {
      for(const key in this.data) {
        const keyName = key as keyof typeof AppConfig.entitiesFoldersPaths;
        
        await this.setEntityData(keyName, this.data[keyName].cursor);
      }
    } catch {
      console.error("Error sync user data");
    }
  }

  private async getEntityData(key: UserDataKeys, cursor: string): Promise<DishesStructure | IngredientStructure | DishesDaysStructure> {
    const filePath = getFilePath(
      path.join(AppConfig.entitiesFoldersPaths[key], cursor === "0" ? "" : cursor)
    );

    return await readFile(filePath);
  }

  private async setEntityData(key: UserDataKeys, cursor: string) {
    const filePath = getFilePath(
      path.join(AppConfig.entitiesFoldersPaths[key], cursor === "0" ? "" : cursor)
    );

    const data = this.data[key].data;
  
    return await writeFile(filePath, data);
  }


}


export {
  LocalUserDataRepository
}
