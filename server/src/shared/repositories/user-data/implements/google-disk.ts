import { AppConfigStructure } from "@/shared/types/global.js";
import { DishesStructure } from "../types/entities/dishes.js";
import { IngredientStructure } from "../types/entities/ingridients.js";
import { DishesDaysStructure } from "../types/entities/dishesDays.js";
import type { SetUserDataProps, UserDataKeys, UserDataRepository } from "../types/index.js"


class GoogleDiskUserDataRepository implements UserDataRepository {
  getUserData(key: UserDataKeys, cursor: string): Promise<DishesDaysStructure | DishesStructure | IngredientStructure> {
    throw new Error("Method not implemented.");
  }

  setUserData(data: SetUserDataProps<any>): void {
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
  GoogleDiskUserDataRepository
}
