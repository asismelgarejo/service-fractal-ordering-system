import { Router } from "express";
import { Sequelize } from "sequelize";
import BootstrapSchema, { OrderProductSchema } from "./schema/sequelize/schema";
import OrderProductService from "./OrderProduct.service";
import OrderProductController from "./OrderProduct.controller";

export default class OrderProductModule {
  constructor() {}

  static Init(dbClient: Sequelize, router: Router): typeof OrderProductSchema {
    BootstrapSchema(dbClient, OrderProductSchema);

    const orderService = new OrderProductService(OrderProductSchema);
    const orderController = new OrderProductController(orderService);
    const subRoutes = orderController.Init();
    router.use("/order-product", subRoutes);

    return OrderProductSchema;
  }
}
