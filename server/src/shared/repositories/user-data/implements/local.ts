import { DishesStructure } from "../types/entities/dishes.js";
import { IngredientStructure } from "../types/entities/ingridients.js";
import { DishesDaysStructure } from "../types/entities/dishesDays.js";
import { readFile, writeFile, getFilePath, listFiles} from "@/shared/utils/file.js";
import { AppConfig } from "@/index.js";
import path from "path";

import { SetUserDataProps, UserDataKeys, UserDataMap, UserDataRepository } from "../types/index.js"


type UserDataEntity = DishesStructure | IngredientStructure | DishesDaysStructure;

type UserData = {
  [K in UserDataKeys]: {
    cursor: string;
    sizes: number[];
    endCursor: string;
    data: UserDataMap[K];
  };
};

class LocalUserDataRepository implements UserDataRepository {
  private data: UserData = {
    [UserDataKeys.DISHES]: {
      cursor: "0-100",
      endCursor: "0-100",
      sizes: [],
      data: {
        count: 0,
        [UserDataKeys.DISHES]: [],
      },
    },
    [UserDataKeys.INGRIDIENTS]: {
      cursor: "0-100",
      endCursor: "0-100",
      sizes: [],
      data: {
        count: 0,
        [UserDataKeys.INGRIDIENTS]: [],
      },
    },
    [UserDataKeys.DISHES_DAYS]: {
      cursor: "0-100",
      endCursor: "0-100",
      sizes: [],
      data: {
        count: 0,
        [UserDataKeys.DISHES_DAYS]: [],
      },
    },
  }

  constructor() {
    this.initUserData();
  }

  async getUserData<K extends UserDataKeys>(key: K, cursor: string): Promise<UserDataMap[K]> {

    if (this.data[key].cursor === cursor) {
      return this.data[key].data;
    } else {
      await this.syncUserData(key);

      const entityData = await this.getEntityData(key, cursor) as UserDataMap[K];
      
      this.data[key].data = entityData;
      this.data[key].cursor = cursor;

      return entityData;
    }

  }

  async setUserData<K extends UserDataKeys>(props: SetUserDataProps<K>, isNew: boolean = false): Promise<void> {
    if (isNew) {
      await this.syncUserData(props.key);
    
      let items = Object.values(props.data)[1];

      while (items.length > 0) {
        const index = this.data[props.key].sizes.findIndex((size)=> size < 100);
        const numberCursor = (index + 1) * 100;
        const cursor = `${ numberCursor - 100 }-${ numberCursor }`;
        const entityData = await this.getEntityData(props.key, cursor);

        const entityItems = Object.values(entityData)[1];

        if (numberCursor === 0 || items.length === 100) {
          const newItem = {
            count: items.length,
            [props.key]: items.map((item: any) => {
              return item.id = `${Date.now()}-${cursor}`;
            }),
          } as UserDataMap[K];

          const newNumberCursor = Number(this.data[props.key].endCursor.match(/\d+-\d+/)?.[1] ?? 0);
          const newCursor = `${ newNumberCursor }-${ newNumberCursor + 100}`;

          this.data[props.key].cursor = newCursor;
          this.data[props.key].data = newItem;

          await this.syncUserData(props.key);

          break;
        } else {
          const chunk = items.slice(0, 100 - entityData.count);
          items = items.slice(100 - entityData.count);

          this.data[props.key].cursor = cursor;
          this.data[props.key].sizes[index] = entityData.count + chunk.length;
          this.data[props.key].data = {count: entityData.count + chunk.length, [props.key]: [...entityItems, ...chunk]} as UserDataMap[K];

          await this.syncUserData(props.key);
        }
      }
    } else {
      this.data[props.key].data = props.data;
    }
  }

  async initUserData(): Promise<void> {
    try {
      for (const key in this.data) {
        const keyName = key as keyof typeof AppConfig.entitiesFoldersPaths;
        
        const files = await listFiles(AppConfig.entitiesFoldersPaths[keyName]);
        const entityData = await this.getEntityData(keyName, this.data[keyName].cursor);

        if (files && files.length > 0) {
          let maxCursor = 0;
          const sizes: number[] = [];

          for (const fileName of files) {
            const cursor = fileName.match(/\d+-\d+/)?.[0] ?? "0-100";
            const numberCursor = Number(fileName.match(/\d+-\d+/)?.[0]?.split('-')[1]) ?? 0;
            

            if (numberCursor > maxCursor) {
              maxCursor = numberCursor;
            }

            const fileEntityData = await this.getEntityData(keyName, cursor)
            sizes.push(fileEntityData.count);

            this.data[keyName].endCursor = `${maxCursor - 100}-${maxCursor}`;
          }

        }

        this.data[keyName].data = entityData;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async syncUserData(key: UserDataKeys): Promise<void> {
    try {
      await this.setEntityData(key, this.data[key].cursor);
    } catch {
      console.error("Error sync user data");
    }
  }

  private async getEntityData(key: UserDataKeys, cursor: string): Promise<DishesStructure | IngredientStructure | DishesDaysStructure> {
    const filePath = getFilePath(
      path.join(AppConfig.entitiesFoldersPaths[key], cursor)
    );

    return await readFile(filePath);
  }

  private async setEntityData(key: UserDataKeys, cursor: string, ) {
    const filePath = getFilePath(
      path.join(AppConfig.entitiesFoldersPaths[key], cursor)
    );

    const data = this.data[key].data;
  
    return await writeFile(filePath, data);
  }

}


export {
  LocalUserDataRepository
}
