import { Category } from "@/endpoints/open-food-facts/types/entities.js";
import { getFilePath } from "@/shared/utils/file.js";
import readline from "readline";
import fs from "fs";


class CategoriesStore {
	private cacheCategories: Category[] = [];
	private cacheSearch: string = "";

	private isWriting: boolean = false;

	public async appendCategories(categories: Category[], lenguages: string): Promise<void> {
		this.isWriting = true;

		const filePath = getFilePath(`${lenguages}-categories`);

		if (!fs.existsSync(filePath)) {
			await fs.promises.writeFile(filePath, "", "utf-8");
		}

		const lines = categories.filter((c) => !c.name.includes(":"))
		.map((c) => JSON.stringify(c)).join("\n") + "\n";

		await fs.promises.appendFile(filePath, lines, "utf-8");

		this.isWriting = false;
	}
	
	public async readCategories(search: string, lenguages: string[]): Promise<Category[] | null> {
		if (this.isWriting) return null;

		if (this.cacheSearch === search && search !== "") {
			return this.cacheCategories;
		}

		const result: Category[] = [];

		try {
			for (let index = 0; index < lenguages.length; index++) {
				const filePath = getFilePath(`${lenguages[index]}-categories`);

				if (!fs.existsSync(filePath)) {
					continue;
				}

				const rl = readline.createInterface({
					input: fs.createReadStream(filePath, { encoding: "utf-8" }),
					crlfDelay: Infinity,
				});
	
				for await (const line of rl) {
					if (line === "") continue;

					const category: Category = JSON.parse(line);
					
					if (category.name.toLowerCase().includes(search.toLowerCase()) || search === "") {
						result.push(category);
					}
				}
			}
		} catch (e) {
			console.error(e);
			return [];
		}

		this.cacheCategories = result;
		this.cacheSearch = search;

		return result;
	}

	public storeExists(lenguage: string): boolean {
		const filePath = getFilePath(`${lenguage}-categories`);
		return fs.existsSync(filePath);
	}

}

export default new CategoriesStore();