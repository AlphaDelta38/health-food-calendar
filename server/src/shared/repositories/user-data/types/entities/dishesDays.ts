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
  days: DayStructure[];
}
