import { Ingredient } from "@/shared/repositories/user-data/types/entities/ingridients.js";
import { IngredientServiceProps } from "../types/services.js";
import userDataProvider from "@/shared/repositories/user-data/index.js";
import { UserDataKeys } from "@/shared/repositories/user-data/types/index.js";
import { getCursorFormId } from "@/shared/repositories/user-data/utils/cursor.js";
import separateNewDataEntity from "@/shared/repositories/user-data/utils/separate-data-entity.js";
import { CustomError } from "@/shared/utils/error-handler.js";


const createIngredientService = async (props: IngredientServiceProps) => {
  const separatedData = separateNewDataEntity.separate<UserDataKeys.INGRIDIENTS>({
    entity: UserDataKeys.INGRIDIENTS,
    data: { ...props, id: `` },
  });

  const returnItems = await userDataProvider.setUserData<UserDataKeys.INGRIDIENTS>({
    key: UserDataKeys.INGRIDIENTS,
    data: {
      count: 1,
      [UserDataKeys.INGRIDIENTS]: [
        separatedData,
      ],
    },
  }, true);

  return returnItems;
}

const deleteIngredientService = async (id: string) => {
	const cursor = getCursorFormId(id);

	const { ingredients } = await userDataProvider.getUserData<UserDataKeys.INGRIDIENTS>(UserDataKeys.INGRIDIENTS, cursor);

	if (ingredients.find((ingredient: Ingredient) => ingredient.id === id)) {
		throw new CustomError('Ingredient with this id not found', { status: 404 });
	}

	const newIngredients = ingredients.filter((ingredient: Ingredient) => ingredient.id !== id);

	await userDataProvider.setUserData<UserDataKeys.INGRIDIENTS>({
		key: UserDataKeys.INGRIDIENTS,
		data: {
			count: newIngredients.length,
			[UserDataKeys.INGRIDIENTS]: newIngredients,
		},
	});

	return newIngredients;
}

const changeIngredientService = async (props: IngredientServiceProps & { id: string }) => {
	const { id, ...data } = props;
	const cursor = getCursorFormId(id);

	const { ingredients } = await userDataProvider.getUserData<UserDataKeys.INGRIDIENTS>(UserDataKeys.INGRIDIENTS, cursor);

	let returnNewIngredients: Ingredient | null = null;

	const newIngredients = ingredients.map((ingredient: Ingredient) => {
		if (ingredient.id === id) {
			returnNewIngredients = { ...ingredient, ...data, nutriments: { ...ingredient.nutriments, ...data.nutriments } };
			return returnNewIngredients;
		}
		return ingredient;
	});

	if (!returnNewIngredients) {
		throw new CustomError('Ingredient with this id not found', { status: 404 });
	}

	await userDataProvider.setUserData<UserDataKeys.INGRIDIENTS>({
		key: UserDataKeys.INGRIDIENTS,
		data: {
			count: ingredients.length,
			[UserDataKeys.INGRIDIENTS]: newIngredients,
		}
	})

	return returnNewIngredients;
}



export {
  createIngredientService,
  deleteIngredientService,
  changeIngredientService,
}
