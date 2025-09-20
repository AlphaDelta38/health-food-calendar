import * as services from "@/endpoints/open-food-facts/services/read-service.js";
import { getCategoriesController } from "@/endpoints/open-food-facts/controllers/read-controller.js";
import { GetCategoriesServiceProps } from "@/endpoints/open-food-facts/types/service.js";
import { CategoriesResponse } from "@/endpoints/open-food-facts/types/entities.js";

jest.mock("@/endpoints/open-food-facts/services/read-service");

describe("getCategoriesController", () => {
	const mockReq = { query: { page: "1", pageSize: "10", search: "", lenguages: ["en"] } };
	const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

	const mockCategoriesResponse: CategoriesResponse = {
		count: 1,
		tags: [{id: "1", url: "https://example.com", name: "Apple", known: 100, products: 1}],
	};

	const checkCallParams: GetCategoriesServiceProps = {
		page: 1,
		pageSize: 10,
		search: "",
		lenguages: ["en"],
	}

	const mockedGetCategoriesService = services.getCategoriesService as jest.MockedFunction<typeof services.getCategoriesService>;

	it("returns categories", async () => {
		mockedGetCategoriesService.mockResolvedValue(mockCategoriesResponse);

		await getCategoriesController(mockReq as any, mockRes as any);

		expect(mockedGetCategoriesService).toHaveBeenCalledWith(checkCallParams);
		expect(mockRes.status).toHaveBeenCalledWith(200);
		expect(mockRes.json).toHaveBeenCalledWith(mockCategoriesResponse);
	})
	
})