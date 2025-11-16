import { Dish, DishesStructure } from "./entities/dishes";
import { Day, DishesDaysStructure } from "./entities/dishesDays";
import { Ingredient, IngredientStructure } from "./entities/ingridients";

enum UserDataKeys {
  DISHES_DAYS = 'dishesDays',
  DISHES = 'dishes',
  INGRIDIENTS = 'ingredients',
}

type UserDataMap = {
  [UserDataKeys.DISHES_DAYS]: DishesDaysStructure;
  [UserDataKeys.DISHES]: DishesStructure;
  [UserDataKeys.INGRIDIENTS]: IngredientStructure;
};

type UserDataItemsMap = {
  [UserDataKeys.DISHES]: DishesStructure[UserDataKeys.DISHES];
  [UserDataKeys.DISHES_DAYS]: DishesDaysStructure[UserDataKeys.DISHES_DAYS];
  [UserDataKeys.INGRIDIENTS]: IngredientStructure[UserDataKeys.INGRIDIENTS];
};

type SetUserDataProps<K extends UserDataKeys> = {
  key: K;
  data: UserDataMap[K];
};

type UserData = {
  [K in UserDataKeys]: {
    cursor: string;
    sizes: number[];
    data: UserDataMap[K];
  };
};

type ReturnItemsMap = {
  [UserDataKeys.DISHES]: Dish[];
  [UserDataKeys.INGRIDIENTS]: Ingredient[];
  [UserDataKeys.DISHES_DAYS]: Day[];
}

type SearchCacheType = {
  [UserDataKeys.INGRIDIENTS]: {
    search: string;
    items: Ingredient[];
  }
}

type GetEntityPageReturn<K extends UserDataKeys> = {
  items: ReturnItemsMap[K];
  pagesCount: number;
}

interface UserDataRepository {
  getUserData: <K extends UserDataKeys>(key: K, cursor: string) => Promise<UserDataMap[K]>;
  setUserData: <K extends UserDataKeys>(data: SetUserDataProps<K>, isNew?: boolean) => void;
  initUserData: () => Promise<void>;
  syncUserData: (key: UserDataKeys) => Promise<void>;
  searchEntity: <K extends keyof SearchCacheType>(key: K, search: string) => Promise<ReturnItemsMap[K]>;
  getEntityPage: <K extends UserDataKeys>(key: K, page: number, pageSize: number) => Promise<GetEntityPageReturn<K>>;
}

enum RepositoriesKey {
  LOCAL = 'local',
  GOOGLE_DISK = 'googleDisk',
}
 
export {
  SetUserDataProps,
  UserDataRepository,
  RepositoriesKey,
  UserDataMap,
  UserDataKeys,
  ReturnItemsMap,
  SearchCacheType,
  UserDataItemsMap,
  UserData,
  GetEntityPageReturn,
}
