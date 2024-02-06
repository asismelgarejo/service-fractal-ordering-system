import { CustomModel, DictionaryModels } from "@constants/interfaces";
import { OrderProductDTO } from "./interfaces";

export default class OrderProductService {
  constructor(private model: typeof CustomModel<OrderProductDTO>) {}

  async deleteOrder(OrderCode: string, ProductID: number): Promise<void> {
    try {
      const record = await this.model.findOne({
        where: { OrderCode, ProductID },
      });
      if (record) {
        await record?.destroy();
      } else {
        throw new Error("the order does not exist. No document was deleted");
      }
    } catch (error) {
      console.log("OrderProductService: findOrder", error);
      throw error;
    }
  }
}
