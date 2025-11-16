import { Ingredient } from "@/shared/repositories/user-data/types/entities/ingridients.js";
import { IngredientGetAllServiceProps } from "../types/services.js";
import userDataProvider from "@/shared/repositories/user-data/index.js";
import { UserDataKeys } from "@/shared/repositories/user-data/types/index.js";
import { sortBy, transformToSortRules } from "@/shared/utils/sort.js";

const getIngredientsService = async (props: IngredientGetAllServiceProps) => {
  const { page, pageSize, search, sortRules } = props;

  let ingredients: Ingredient[] = [];
  let pagesCount: number = 1;

  if (search !== `\"\"` && search !== undefined && search && search !== "") {
    ingredients = await userDataProvider.searchEntity<UserDataKeys.INGRIDIENTS>(
      UserDataKeys.INGRIDIENTS,
      search
    );
    console.log(ingredients, "ingredients");
    const maxPages = Math.ceil(ingredients.length / pageSize);
    const sizedPage = Math.max(Math.min(page, maxPages), 1);
    const startIndex = (sizedPage - 1) * pageSize;

    pagesCount = maxPages;
    ingredients = ingredients.slice(startIndex, startIndex + pageSize);
  } else {
    const { items, pagesCount: pagesCountResponse } =
      await userDataProvider.getEntityPage<UserDataKeys.INGRIDIENTS>(
        UserDataKeys.INGRIDIENTS,
        Number(page),
        Number(pageSize)
      );

    ingredients = items;
    pagesCount = pagesCountResponse;
  }

  const sortedIngredients = sortBy(ingredients, transformToSortRules(sortRules));

  return {
    pages: Number(pagesCount),
    ingredients: sortedIngredients,
  };
};

export {
  getIngredientsService,
};