import { ValidationType } from "../types/global.js";

function validateFieldsPick<T extends object, K extends keyof T>(fields: T, fieldToPick: K[]): Pick<T, K> {
  if (!fieldToPick) return fields as Pick<T, K>;

  for (const [key] of Object.entries(fields)) {
    if (!fieldToPick.includes(key as K)) {
      delete fields[key as keyof T];
    }
  }

  return fields as Pick<T, K>
}

function validateFieldsArrayPick<T extends object, K extends keyof T>(fields: T[], fieldToPick: K[]): Pick<T, K>[] {
  if (!fieldToPick) return fields as Pick<T, K>[];

  return fields.map(field => validateFieldsPick(field, fieldToPick)) as Pick<T, K>[]
}


function validateFieldsExclude<T extends object, K extends keyof T>(fields: T, fieldToExclude: K[]): Exclude<T, K> {
  if (!fieldToExclude) return fields as Exclude<T, K>;

  for (const [key] of Object.entries(fields)) {
    if (fieldToExclude.includes(key as K)) {
      delete fields[key as keyof T];
    }
  }

  return fields as Exclude<T, K>
}

function validateFieldsArrayExclude<T extends object, K extends keyof T>(fields: T[], fieldToExclude: K[]): Exclude<T, K>[] {
  if (!fieldToExclude) return fields as Exclude<T, K>[];

  return fields.map(field => validateFieldsExclude(field, fieldToExclude)) as Exclude<T, K>[]
}


function validateController(validationObj: any, fields: any, validationType: ValidationType, isArray: boolean) {
  switch (validationType) {
    case 'pick':
      const validationFuncPick = isArray ? validateFieldsArrayPick : validateFieldsPick;

      return validationFuncPick(fields, validationObj); 
    case 'exclude':
      const validationFuncExclude = isArray ? validateFieldsArrayExclude : validateFieldsExclude;

      return validationFuncExclude(fields, validationObj);
  }
}

export default validateController;
