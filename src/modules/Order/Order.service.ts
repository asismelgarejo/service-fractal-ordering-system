import { CustomModel, DictionaryModels } from "constants/interfaces";
import { OrderDTO } from "./interfaces";

export default class OrderService {
  constructor(
    private model: typeof CustomModel<OrderDTO>,
    private models: DictionaryModels
  ) {}

  async getOrders(): Promise<OrderDTO[]> {
    try {
      return (await this.model.findAll({ include: this.models.Product })).map(
        (order) => order.toJSON()
      );
    } catch (error) {
      console.log("OrderService: ", error);
      throw error;
    }
  }

  async createOrder(payload: OrderDTO): Promise<void> {
    try {
      await this.model.create(payload);
    } catch (error) {
      console.log("OrderService: createOrder", error);
      throw error;
    }
  }
  async updateOrder(ID: number, payload: OrderDTO): Promise<void> {
    try {
      const orderDoc = await this.findOrder(ID);
      if (orderDoc.Status === "Completed") {
        throw new Error("you can't modify a completed order");
      }

      const response = await this.model.update(payload, { where: { ID } });
      if (response[0] === 0) {
        throw new Error("the order does not exist. No document was updated");
      }
    } catch (error) {
      console.log("OrderService: updateOrder", error);
      throw error;
    }
  }
  async findOrder(ID: number): Promise<OrderDTO> {
    try {
      const response = await this.model.findByPk(ID);
      if (!response) {
        throw new Error("the order does not exist");
      }
      return response?.toJSON();
    } catch (error) {
      console.log("OrderService: findOrder", error);
      throw error;
    }
  }
  async deleteOrder(ID: string): Promise<void> {
    try {
      const record = await this.model.findOne({ where: { ID } });
      if (record) {
        await record?.destroy();
      } else {
        throw new Error("the order does not exist. No document was deleted");
      }
    } catch (error) {
      console.log("OrderService: findOrder", error);
      throw error;
    }
  }
}
