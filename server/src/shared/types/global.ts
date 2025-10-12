import { CategoryAllowFields, ProductAllowFields } from "@/endpoints/open-food-facts/types/allowFields.js";

export type AllAllowFields = CategoryAllowFields | ProductAllowFields;

export enum ValidationType {
  PICK = 'pick',
  EXCLUDE = 'exclude',
}

export interface Filters {
	page: number;
	pageSize: number;
}

export interface Validation {
  allowFields?: AllAllowFields;
  validationType: ValidationType;
}

export interface AppConfigStructure {
  userDataPath: string,
  path: string,
  chosenLenguages: string[];
  entitiesPaths: {
    dishes: string;
    myIngredients: string;
    diseshDays: string;
  }
}

export enum AppFilePaths {
  googleAuthToken = "google-auth-token",
  appConfig = "AppConfig",
}