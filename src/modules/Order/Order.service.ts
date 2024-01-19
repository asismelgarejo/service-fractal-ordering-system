import { DBClient } from "constants/interfaces";
import { OrderDTO, OrderModelType } from "./interfaces";

export default class OrderService {
  constructor(private model: DBClient<OrderDTO>) {}

  async getOrders(): Promise<OrderDTO[]> {
    try {
      return (await this.model.findAll()).map((order) => order.toJSON());
    } catch (error) {
      console.log("OrderService: ", error);
      throw error;
    }
  }

  async createOrder(payload: OrderDTO): Promise<void> {
    try {
      await this.model.insertOne(payload);
    } catch (error) {
      console.log("OrderService: createOrder", error);
      throw error;
    }
  }
  // async updateOrder(ID: string, payload: OrderDTO): Promise<void> {
  //   try {
  //     const orderDoc = await this.findOrder(ID);
  //     if (orderDoc.Status === "Completed")
  //       throw new Error("you can't modify a completed order");

  //     const response = await this.model.updateOne({ _id: ID }, payload);
  //     if (response.modifiedCount === 0) {
  //       throw new Error("the order does not exist. No document was updated");
  //     }
  //   } catch (error) {
  //     console.log("OrderService: updateOrder", error);
  //     throw error;
  //   }
  // }
  // async findOrder(ID: string): Promise<OrderDTO> {
  //   try {
  //     const response = await this.model
  //       .findOne({ _id: ID })
  //       .populate({
  //         path: "Products.Product",
  //         model: "Product",
  //       })
  //       .exec();
  //     if (!response) {
  //       throw new Error("the order does not exist");
  //     }

  //     return response?.toJSON();
  //   } catch (error) {
  //     console.log("OrderService: findOrder", error);
  //     throw error;
  //   }
  // }
  async deleteOrder(ID: string): Promise<void> {
    try {
      const response = await this.model.deleteOne({ ID });
      if (response === 0) {
        throw new Error("the order does not exist. No document was deleted");
      }
    } catch (error) {
      console.log("OrderService: findOrder", error);
      throw error;
    }
  }
}
