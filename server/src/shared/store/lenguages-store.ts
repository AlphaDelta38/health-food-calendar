import { cacheLenguages } from "@/endpoints/open-food-facts/types/entities.js";

class LenguagesStore {
  private cacheLenguages: cacheLenguages = {};

	async setLenguages(lenguages: cacheLenguages): Promise<void> {
		this.cacheLenguages = lenguages;
	}

	async readLenguages(): Promise<cacheLenguages> {
		return this.cacheLenguages;
	}

	storeExists(): boolean {
		return Object.keys(this.cacheLenguages).length > 0;
	}

}


export default new LenguagesStore();