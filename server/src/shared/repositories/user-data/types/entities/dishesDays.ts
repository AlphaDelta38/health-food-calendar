import { UserDataKeys } from "..";

interface DishStructure {
  id: string;
  time: string;
}

interface DayStructure {
  date: string;
  count: number;
  dishes: DishStructure[];
}

interface DishesDaysStructure {
  count: number;
  [UserDataKeys.DISHES_DAYS]: DayStructure[];
}


export {
  DishesDaysStructure,
  DayStructure,
  DishStructure,
}