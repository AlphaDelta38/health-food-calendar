import { DishesStructure } from "../types/entities/dishes.js";
import { Ingredient, IngredientStructure } from "../types/entities/ingridients.js";
import { DishesDaysStructure } from "../types/entities/dishesDays.js";
import { readFile, writeFile, listFiles, FileExtension} from "@/shared/utils/file.js";
import { AppConfig } from "@/index.js";
import path from "path";

import { 
  GetEntityPageReturn,
  ReturnItemsMap,
  SearchCacheType, 
  SetUserDataProps, 
  UserData, 
  UserDataKeys, 
  UserDataMap, 
  UserDataRepository 
} from "../types/index.js"
import { CustomError } from "@/shared/utils/error-handler.js";


class LocalUserDataRepository implements UserDataRepository {

  private searchCache: SearchCacheType = {
    [UserDataKeys.INGRIDIENTS]: {
      search: "",
      items: [],
    }
  }

  private data: UserData = {
    [UserDataKeys.DISHES]: {
      cursor: "0-100",
      sizes: [],
      data: {
        count: 0,
        [UserDataKeys.DISHES]: [],
      },
    },
    [UserDataKeys.INGRIDIENTS]: {
      cursor: "0-100",
      sizes: [],
      data: {
        count: 0,
        [UserDataKeys.INGRIDIENTS]: [],
      },
    },
    [UserDataKeys.DISHES_DAYS]: {
      cursor: "0-100",
      sizes: [],
      data: {
        count: 0,
        [UserDataKeys.DISHES_DAYS]: [],
      },
    },
  }

  public async getUserData<K extends UserDataKeys>(key: K, cursor: string ): Promise<UserDataMap[K]> {

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

  public async setUserData<K extends UserDataKeys>(props: SetUserDataProps<K>, isNew: boolean = false): Promise<ReturnItemsMap[K]> {
    if (isNew) {

      let items = Object.values(props.data)[1];
      let returnItems: ReturnItemsMap[K] = [];

      while (items.length > 0) {
        const index = this.data[props.key].sizes.findIndex((size)=> size < 100);
        const numberCursor = (index + 1) * 100;
        const cursor = `${ numberCursor - 100 }-${ numberCursor }`;
        const entityData = await this.getEntityData(props.key, cursor);

        const entityItems = Object.values(entityData)[1];

        if (numberCursor === 0 || items.length === 100) {
          const endCursor = await this.getEndCursor(props.key);
          const newNumberCursor = Number(endCursor.split('-')[1]) ?? 0;
          const newCursor = `${ newNumberCursor }-${ newNumberCursor + 100}`;

          const newItems = items.map((item: any) => ({...item, id: `${Date.now()}_${newCursor}`}));

          const newData = {
            count: items.length,
            [props.key]: newItems,
          } as UserDataMap[K];

          this.data[props.key].cursor = newCursor;
          this.data[props.key].data = newData;
          this.data[props.key].sizes.push(items.length);

          await this.syncUserData(props.key);
          returnItems = [...returnItems, ...newItems];

          break;
        } else {
          const chunk = items.slice(0, 100 - entityItems.length).map((item: any) => ({...item, id: `${Date.now()}_${cursor}`}));
          items = items.slice(100 - entityItems.length);

          this.data[props.key].cursor = cursor;
          this.data[props.key].sizes[index] = entityItems.length + chunk.length;
          this.data[props.key].data = {count: entityItems.length + chunk.length, [props.key]: [...entityItems, ...chunk]} as UserDataMap[K];
          
          await this.syncUserData(props.key);
          returnItems = [...returnItems, ...chunk];
        }
      }

      return returnItems;
    } else {
      this.data[props.key].data = props.data;

      await this.syncUserData(props.key);

      return [];
    }
  }

  public async initUserData(): Promise<void> {
    try {
      for (const key in this.data) {
        const keyName = key as keyof typeof AppConfig.entitiesFoldersPaths;
        
        const files = await listFiles(AppConfig.entitiesFoldersPaths[keyName]);

        if (files && files.length > 0) {
          
          const sizes: number[] = [];

          for (const fileName of files) {
            const cursor = fileName.match(/\d+-\d+/)?.[0] ?? "0-100";

            const fileEntityData = await this.getEntityData(keyName, cursor)

            if (cursor === this.data[keyName].cursor && fileEntityData?.count > 0) {
              this.data[keyName].data = fileEntityData;
            }

            sizes.push(fileEntityData?.count);
          }

          this.data[keyName].sizes = sizes;
        }


      }
    } catch (error) {
      console.error(error);
    }
  }

  public async syncUserData(key: UserDataKeys): Promise<void> {
    try {
      await this.setEntityData(key, this.data[key].cursor);
    } catch(e) {
      console.error(e);
      throw new CustomError("Error sync user data", { status: 500 });
    }
  }

  public async searchEntity<K extends keyof SearchCacheType>(key: K, search: string): Promise<ReturnItemsMap[K]> {

    if (this.searchCache[key].search === search) {
      return this.searchCache[key].items as ReturnItemsMap[K];
    } 

    switch (key) {
      case UserDataKeys.INGRIDIENTS:
        return await this.searchIngredient(search) as ReturnItemsMap[K];
      default:
        return [];
    }

  }

  public async getEntityPage<K extends UserDataKeys>(
    key: K,
    page: number,
    pageSize: number
  ): Promise<GetEntityPageReturn<K>> {
    let items: ReturnItemsMap[K] = [];
    const pagesCount = Math.ceil(this.data[key].sizes.reduce((acc, size) => acc + size, 0) / pageSize);
    const limitedPage = Math.max(Math.min(page, pagesCount), 1);

    let startSizeIndex = 0;
    let offset = (limitedPage - 1) * pageSize;

    if (offset > 0) {
      for (let i = 0; i < this.data[key].sizes.length; i++) {
        const size = this.data[key].sizes[i];
        offset -= size;
  
        if (offset < 0) {
          startSizeIndex = i;
          break;
        }
      }
    }

    let itemsLeft = pageSize;
    for (let i = startSizeIndex; i < this.data[key].sizes.length; i++) {

      if (itemsLeft <= 0) {
        break;
      }
      
      const size = this.data[key].sizes[i];
      let startIndex = 0;
      
      if (size - offset > 0) {
        startIndex = offset * -1;
      } else {
        offset += size;
        continue;
      }

      const itemsData = await this.getEntityData(key, `${i * 100}-${(i + 1) * 100}`);
      const entityItems = Object.values(itemsData)[1];

      const chunk = entityItems.slice(startIndex, startIndex + itemsLeft);

      itemsLeft -= chunk.length;
      items.push(...chunk);
    }
    
    return {
      items,
      pagesCount:pagesCount,
    };
  }
  
  private async getEntityData(key: UserDataKeys, cursor: string): Promise<DishesStructure | IngredientStructure | DishesDaysStructure> {
    const filePath = path.join(AppConfig.entitiesFoldersPaths[key], cursor);

    return await readFile(filePath, FileExtension.JSON);
  }

  private async setEntityData(key: UserDataKeys, cursor: string, ) {
    const filePath = path.join(AppConfig.entitiesFoldersPaths[key], cursor)
  
    const data = this.data[key].data;

    return await writeFile(filePath, data);
  }

  private async getEndCursor(key: UserDataKeys): Promise<string> {
    const keyName = key as keyof typeof AppConfig.entitiesFoldersPaths;
    const files = await listFiles(AppConfig.entitiesFoldersPaths[keyName]);

    let endCursor = "0-0";

    if (files && files.length > 0) {
    
      let maxCursor = 0;

      for (const fileName of files) {
        const numberCursor = Number(fileName.match(/\d+-\d+/)?.[0]?.split('-')[1]) ?? 100;
        
        if (numberCursor > maxCursor) {
          maxCursor = numberCursor;
        }

      }

      endCursor = `${ maxCursor - 100 }-${ maxCursor }`;
    }

    return endCursor;
  }

  private async searchIngredient(search: string): Promise<Ingredient[]> {
    const key = UserDataKeys.INGRIDIENTS;

    const files = await listFiles(AppConfig.entitiesFoldersPaths[key]);
    const allCursors = files?.map((file) => file.match(/\d+-\d+/)?.[0]).filter((cursor): cursor is string => !!cursor) ?? [];

    const allItems = []

    for (const cursor of allCursors) {
      const items: IngredientStructure = await this.getEntityData(key, cursor) as IngredientStructure;
      const filteredItems = items.ingredients.filter((ingredient) => ingredient.name.toLowerCase().includes(search.toLowerCase())); 
      allItems.push(...filteredItems);
    }

    return allItems;
  }

}


export {
  LocalUserDataRepository
}
