import { Request, Response } from "express";
import { writeCategoriesControllerProps } from "@/endpoints/open-food-facts/types/controllers.js";
import { writeCategoriesService } from "../services/write-service.js";
import CategoriesStore from '@/shared/store/categories-store.js';

type reqBody = Request<{}, {}, writeCategoriesControllerProps>;

async function writeCategoriesController (req: reqBody, res: Response) {
	try {
		const { lenguages, reset } = req.body;
		const allFileExist = lenguages.every((lenguage) => CategoriesStore.storeExists(lenguage));

		if (!allFileExist || reset) {
			await writeCategoriesService(lenguages);
		}
	
		res.status(200).json({ message: "Store is ready" });
	} catch (error) {
		res.status(500).json({ message: "Internal server error", error: error });
	}
}

export {
  writeCategoriesController
}
