import { AppConfigStructure } from "@/shared/types/global.js";
import { DishesStructure } from "../types/entities/dishes.js";
import { IngredientStructure } from "../types/entities/ingridients.js";
import type { setUserDataProps, UserDataKeys, UserDataRepository } from "../types/index.js"


class LocalUserDataRepository implements UserDataRepository {

  getUserData(key: UserDataKeys): DishesDaysStructure | DishesStructure | IngredientStructure | AppConfigStructure {
    throw new Error("Method not implemented.");
  }

  setUserData(data: setUserDataProps): void {
    throw new Error("Method not implemented.");
  }

  initUserData(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  syncUserData(): Promise<void> {
    throw new Error("Method not implemented.");
  }

}


export {
  LocalUserDataRepository
}
