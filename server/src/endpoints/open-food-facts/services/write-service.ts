import { CATEGORIES_URL } from "@/shared/constants/api-url.js";
import { CategoriesResponse } from "@food/types/entities.js";
import CategoriesStore from '@/shared/store/categories-store.js';
import axios from "axios";

async function writeCategoriesService(lenguages: string[]): Promise<void> {
	for (let index = 0; index < lenguages.length; index++) {
		const lenguage = lenguages[index];
		
		let nextPageSize = true;
		let page = 1;

		if (CategoriesStore.storeExists(lenguage)) {
			console.log(`${lenguage} categories already exists`);
			continue;
		}

		while (nextPageSize) {
			console.log(`${lenguage} categories not exists`);
			const { data } = await axios.get<CategoriesResponse>(CATEGORIES_URL, {
				params: {
					page,
					page_size: 1000,
					lc: lenguage,
				}
			});
			
			if (data.tags.length > 0) {
				await CategoriesStore.appendCategories(data.tags, lenguage);
			}

			if (data.tags.length < 1000) {
				nextPageSize = false;
			}else {
				page++;
			}

		}
	}
}

export {
  writeCategoriesService
}
