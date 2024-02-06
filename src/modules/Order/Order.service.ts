import { CustomModel, DictionaryModels } from "@constants/interfaces";
import { OrderDTO } from "./interfaces";

export default class OrderService {
  constructor(
    private model: typeof CustomModel<OrderDTO>,
    private models: DictionaryModels
  ) {}

  async getOrders(): Promise<OrderDTO[]> {
    try {
      return (await this.model.findAll({ include: this.models.Product })).map(
        (order) => {
          const orderData = order.toJSON() as any;
          return {
            ID: orderData.ID,
            Order: orderData.Order,
            Date: orderData.Date,
            FinalPrice: +orderData.FinalPrice,
            Products: orderData.Products.map((product: any) => ({
              Product: {
                ID: product.ID,
                Name: product.Name,
                UnitPrice: +product.UnitPrice,
              },
              Qty: product.OrderProduct.Qty,
              TotalPrice: +product.OrderProduct.TotalPrice,
            })),
            Status: orderData.Status,
          } as OrderDTO;
        }
      );
    } catch (error) {
      console.log("OrderService: ", error);
      throw error;
    }
  }

  async createOrder(payload: OrderDTO): Promise<void> {
    try {
      console.log(">payload", payload);
      await this.models.Order.create({
        Order: payload.Order,
        Date: payload.Date,
        FinalPrice: payload.FinalPrice,
        Status: payload.Status,
      });
      await Promise.all(
        payload.Products.map((data) => {
          return this.models.OrderProduct.create({
            OrderCode: payload.Order,
            ProductID: data.Product.ID,
            Qty: data.Qty,
            TotalPrice: data.TotalPrice,
          });
        })
      );
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

      await Promise.all(
        payload.Products.map((data) => {
          return this.models.OrderProduct.upsert<any>(
            {
              OrderCode: payload.Order,
              ProductID: data.Product.ID,
              Qty: data.Qty,
              TotalPrice: data.TotalPrice,
            },
            { fields: ["OrderCode", "ProductID"] }
          );
        })
      );
    } catch (error) {
      console.log("OrderService: updateOrder", error);
      throw error;
    }
  }
  async findOrder(ID: number): Promise<OrderDTO> {
    try {
      const orderData = (
        await this.model.findByPk(ID, {
          include: this.models.Product,
        })
      )?.toJSON();
      if (!orderData) {
        throw new Error("the order does not exist");
      }
      return {
        ID: orderData.ID,
        Order: orderData.Order,
        Date: orderData.Date,
        FinalPrice: +orderData.FinalPrice,
        Products: orderData.Products.map((product: any) => ({
          Product: {
            ID: product.ID,
            Name: product.Name,
            UnitPrice: +product.UnitPrice,
          },
          Qty: product.OrderProduct.Qty,
          TotalPrice: +product.OrderProduct.TotalPrice,
        })),
        Status: orderData.Status,
      } as OrderDTO;
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
