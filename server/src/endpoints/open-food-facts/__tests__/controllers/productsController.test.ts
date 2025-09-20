import { getProductsController } from "@/endpoints/open-food-facts/controllers/read-controller.js"
import * as services from "@/endpoints/open-food-facts/services/read-service.js"
import { GetProductsServiceProps } from "@/endpoints/open-food-facts/types/service";
import { ValidationType } from "@/shared/types/global";

jest.mock("@/endpoints/open-food-facts/services/read-service.js");

describe("getProductsController", () => {
    const mockReq = { query: { page: "1", pageSize: "10", categories_tags_en: "", search_terms: "", validationType: ValidationType.PICK} };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
    const mockProductsResponse = {
      count: 1,
      page: 1,
      page_count: 1,
      page_size: 10,
      products: [{_id: "1", _keywords: ["apple"], product_name: "Apple", }],
    };

    const checkCallParams: GetProductsServiceProps = {
      page: 1,
      pageSize: 10,
      categories_tags_en: "",
      search_terms: "",
      validationType: ValidationType.PICK,
    };
    const mockedGetProductsService = services.getProductsService as jest.MockedFunction<typeof services.getProductsService>;

    it("returns products", async () => {
      mockedGetProductsService.mockResolvedValue(mockProductsResponse);

      await getProductsController(mockReq as any, mockRes as any);

      expect(mockedGetProductsService).toHaveBeenCalledWith(checkCallParams);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockProductsResponse);
    });
});
