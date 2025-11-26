import { UserDataKeys } from "../index.js";

interface DishStructure {
  id: string;
  time: string;
}

interface Day {
  date: string;
  count: number;
  dishes: DishStructure[];
}

interface DishesDaysStructure {
  count: number;
  [UserDataKeys.DISHES_DAYS]: Day[];
}


export {
  DishesDaysStructure,
  Day,
  DishStructure,
}