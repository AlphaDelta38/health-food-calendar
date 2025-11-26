import { CategoryAllowFields, ProductAllowFields } from "@/endpoints/open-food-facts/types/allowFields.js";
import { UserDataKeys } from "../repositories/user-data/types/index.js";

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
  chosenLenguages: string[];
  entitiesFoldersPaths: Record<UserDataKeys, string>;
}

export enum AppFilePaths {
  googleAuthToken = "google-auth-token",
  appConfig = "AppConfig",
}