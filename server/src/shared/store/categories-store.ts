import { Category } from "@/endpoints/open-food-facts/types/entities";
import { getFilePath } from "@/shared/utils/file";
import { parser } from "stream-json";
import { pick } from "stream-json/filters/Pick";
import { streamArray } from "stream-json/streamers/StreamArray";
import fs from "fs";


class CategoriesStore {
	private cacheCategories: Category[] = [];
	private cacheSearch: string = "";

	private isWriting: boolean = false;

  public setCategories(categories: Category[]): void {
		this.writeByStream(categories);
		this.isWriting = true;
  }

	private async writeByStream(categories: Category[]) {
		const filePath = getFilePath("categories");
		const stream = fs.createWriteStream(filePath, { encoding: "utf-8" });
	
		stream.write(`{"count": ${categories.length}, "tags": [`);
	
		for (let i = 0; i < categories.length; i++) {
			const ok = stream.write(JSON.stringify(categories[i]) + (i < categories.length - 1 ? "," : ""));
			if (!ok) {
				await new Promise<void>((resolve) => stream.once("drain", resolve));
			}
		}
	
		stream.write("]}");
		stream.end();

		this.isWriting = false;
	}

	public async readCategories(search: string) {
		if (this.isWriting) {
			return null;
		}

		if(this.cacheSearch === search) {
			return this.cacheCategories;
		}

		const result: Category[] = [];
		const filePath = getFilePath("categories");

		return new Promise<Category[]>((resolve, reject) => {
			const pipeline = fs.createReadStream(filePath)
				.pipe(parser())
				.pipe(pick({ filter: "tags" }))
				.pipe(streamArray());
	
			pipeline.on("data", ({ key, value }) => {
				if (value.name.toLowerCase().includes(search.toLowerCase())) {
					result.push(value);
				}
			});
	
			pipeline.on("end", () => {
				this.cacheCategories = result;
				this.cacheSearch = search;
				resolve(result);
			});
	
			pipeline.on("error", (err) => reject(err));
		});
	}

}

export default new CategoriesStore();