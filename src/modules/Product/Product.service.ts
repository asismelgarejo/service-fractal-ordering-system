import { ProductDTO, ProductModelType } from "./interfaces";

export default class ProductService {
  constructor(private model: ProductModelType) {}

  async getProducts(): Promise<ProductDTO[]> {
    try {
      return this.model.find();
    } catch (error) {
      console.log("ProductService: ", error);
      throw error;
    }
  }

  async createProduct(payload: Omit<ProductDTO, "ID">): Promise<void> {
    try {
      await this.model.create(payload);
    } catch (error) {
      console.log("ProductService: createProduct", error);
      throw error;
    }
  }

  async updateProduct(ID: string, payload: ProductDTO): Promise<void> {
    try {
      const response = await this.model.updateOne({ _id: ID }, payload);
      if (response.modifiedCount === 0) {
        throw new Error("the product does not exist. No document was updated");
      }
    } catch (error) {
      console.log("ProductService: updateProduct", error);
      throw error;
    }
  }
  async findProduct(ID: string): Promise<ProductDTO> {
    try {
      const response = await this.model.findOne({ _id: ID });
      if (!response) {
        throw new Error("the product does not exist");
      }
      return response?.toJSON();
    } catch (error) {
      console.log("ProductService: findProduct", error);
      throw error;
    }
  }
  async deleteProduct(ID: string): Promise<void> {
    try {
      const response = await this.model.deleteOne({ _id: ID });
      if (response.deletedCount === 0) {
        throw new Error("the product does not exist. No document was deleted");
      }
    } catch (error) {
      console.log("ProductService: findProduct", error);
      throw error;
    }
  }
}
