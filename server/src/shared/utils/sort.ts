import { SortType } from "../types/sort.js";

export interface SortRule {
  valuePath: string;
  direction: SortType;
}

const getValue = (object: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc?.[part], object);
}

function transformToSortRules(obj: any, initPath = ""): SortRule[] {
  const rules: SortRule[] = [];

  for (const key in obj) {
    const value = obj[key];
    const path = initPath ? `${initPath}.${key}` : key;

    if (value && typeof value === "object") {
      rules.push(...transformToSortRules(value, path));
    } else if (value === SortType.ASC || value === SortType.DESC) {
      rules.push({ valuePath: path, direction: value });
    }
  }

  return rules;
}


function sortBy<T>(array: T[], rules: SortRule[]): T[] {
  if (rules.length === 0) return array;

  return array.sort((a, b) => {
    for (const rule of rules) {
      const { valuePath, direction = "asc" } = rule;

      const valA = getValue(a, valuePath);
      const valB = getValue(b, valuePath);

      let result = 0;
      
      if (typeof valA === "number" && typeof valB === "number") {
        result = valA - valB;
      } else if (typeof valA === "string" && typeof valB === "string") {
        result = valA.localeCompare(valB);
      } else {
        continue;
      }

      if (direction === "desc") result *= -1;

      if (result !== 0) return result;

    }
    return 0;
  });
}


export {
  transformToSortRules,
  sortBy,
}