import { AllAllowFields, ValidationType } from "../types/global.js";

function validateFields<T extends object, K extends keyof T>(fields: T, fieldToPick: K[], validationType: ValidationType): Pick<T, K> {
  if (!fieldToPick) return fields as Pick<T, K>;

  for (const [key] of Object.entries(fields)) {
    if (!fieldToPick.includes(key as K)) {
      delete fields[key as keyof T];
    }
  }
  
  return fields as Pick<T, K>
}

function validateFieldsArray<T extends object, K extends keyof T>(fields: T[], fieldToPick: K[], validationType: ValidationType): Pick<T, K>[] {
  if (!fieldToPick) return fields as Pick<T, K>[];

  return fields.map(field => validateFields(field, fieldToPick, validationType)) as Pick<T, K>[]
}

function prepareAllowFields<T extends Array<string>>(allowFields: AllAllowFields, basicAllowFields: T, validationType: ValidationType): T {
  if(allowFields.length === 0) return basicAllowFields;

  const allowFieldsArray = Object.values(basicAllowFields);

  if (validationType === ValidationType.PICK) {
    return allowFieldsArray.filter(field => allowFields.includes(field)) as T;
  }else if(validationType === ValidationType.EXCLUDE) {
    return allowFieldsArray.filter(field => !allowFields.includes(field)) as T;
  }

  return basicAllowFields;
}

export {
  validateFields,
  validateFieldsArray,
  prepareAllowFields,
};
