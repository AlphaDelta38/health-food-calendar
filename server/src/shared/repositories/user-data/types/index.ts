import { DishesStructure } from "./entities/dishes";
import { DishesDaysStructure } from "./entities/dishesDays";
import { IngredientStructure } from "./entities/ingridients";

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

type SetUserDataProps<K extends UserDataKeys> = {
  key: K;
  data: UserDataMap[K];
};

interface UserDataRepository {
  getUserData: (key: UserDataKeys, cursor: string) => Promise<DishesDaysStructure | DishesStructure | IngredientStructure>;
  setUserData: <K extends UserDataKeys>(data: SetUserDataProps<K>) => void;
  initUserData: () => Promise<void>;
  syncUserData: (key: UserDataKeys) => Promise<void>;
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
}
