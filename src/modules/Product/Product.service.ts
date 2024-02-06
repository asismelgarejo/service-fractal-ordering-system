import { CustomModel } from "src/constants/interfaces";
import { ProductDTO } from "./interfaces";

export default class ProductService {
  constructor(private model: typeof CustomModel<ProductDTO>) {}

  async getProducts(): Promise<ProductDTO[]> {
    try {
      return (await this.model.findAll()).map((product) => product.toJSON());
    } catch (error) {
      console.log("ProductService: ", error);
      throw error;
    }
  }

  async createProduct(payload: ProductDTO): Promise<void> {
    try {
      await this.model.create(payload);
    } catch (error) {
      console.log("ProductService: createProduct", error);
      throw error;
    }
  }

  async updateProduct(ID: number, payload: ProductDTO): Promise<void> {
    try {
      const response = await this.model.update(payload, { where: { ID } });
      if (response[0] === 0) {
        throw new Error("the product does not exist. No document was updated");
      }
    } catch (error) {
      console.log("ProductService: updateProduct", error);
      throw error;
    }
  }
  async findProduct(ID: number): Promise<ProductDTO> {
    try {
      const response = await this.model.findByPk(ID);
      if (!response) {
        throw new Error("the product does not exist");
      }
      return response?.toJSON();
    } catch (error) {
      console.log("ProductService: findProduct", error);
      throw error;
    }
  }
  async deleteProduct(ID: number): Promise<void> {
    try {
      const record = await this.model.findOne({ where: { ID } });
      if (record) {
        await record?.destroy();
      } else {
        throw new Error("the product does not exist. No document was deleted");
      }
    } catch (error) {
      console.log("ProductService: findProduct", error);
      throw error;
    }
  }
}
