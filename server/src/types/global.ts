import { AllowFields } from "../service/open-food-facts/types/service.js";

type AllAllowFields = AllowFields;

export enum ValidationType {
  PICK = 'pick',
  EXCLUDE = 'exclude'
}

export interface Filters {
	page: number;
	pageSize: number;
}

export interface Validation {
  allowFields?: AllAllowFields;
  validationType: ValidationType;
}
