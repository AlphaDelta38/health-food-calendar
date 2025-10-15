import { AppConfigStructure } from "@/shared/types/global";
import { DishesStructure } from "./entities/dishes";
import { IngredientStructure } from "./entities/ingridients";

export enum UserDataKeys {
  DISHES_DAYS = 'dishesDays',
  DISHES = 'dishes',
  INGRIDIENTS = 'myIngredients',
  APP_CONFIG = 'appConfig',
}

export type setUserDataProps = 
{key: UserDataKeys.DISHES_DAYS,data: DishesDaysStructure} | 
{key: UserDataKeys.DISHES, data: DishesStructure} |
{key: UserDataKeys.INGRIDIENTS, data: IngredientStructure} |
{key: UserDataKeys.APP_CONFIG, data: AppConfigStructure}

interface UserDataRepository {
  getUserData: (key: UserDataKeys, cursor: string) => Promise<DishesDaysStructure | DishesStructure | IngredientStructure | AppConfigStructure>;
  setUserData: (data: setUserDataProps) => void;
  initUserData: () => Promise<void>;
  syncUserData: () => Promise<void>;
}

enum RepositoriesKey {
  LOCAL = 'local',
  GOOGLE_DISK = 'googleDisk',
}
 
export {
  UserDataRepository,
  RepositoriesKey,
}
