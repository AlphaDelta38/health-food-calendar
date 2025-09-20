import { getProductsController } from "@/endpoints/open-food-facts/controllers/read-controller.js"
import * as services from "@/endpoints/open-food-facts/services/read-service.js"

jest.mock("@/endpoints/open-food-facts/services/read-service.js");

describe("getProductsController", () => {
    const mockReq = { query: { page: "1", pageSize: "10" } };
    const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
    it("returns products", async () => {
      (services.getProductsService as jest.Mock).mockResolvedValue({
        items: [{ id: 1, name: "Apple" }],
        total: 1,
      });
  
      await getProductsController(mockReq as any, mockRes as any);
  
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        items: [{ id: 1, name: "Apple" }],
        total: 1,
      });
    });
});
