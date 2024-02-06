import { BootstrapSchema, OrderSchema } from "./schema";
import OrderController from "./Order.controller";
import OrderService from "./Order.service";
import { Router } from "express";
import { Sequelize } from "sequelize";
import { DictionaryModels } from "src/constants/interfaces";

export default class OrderModule {
  constructor() {}

  static Init(
    dbClient: Sequelize,
    router: Router,
    models: DictionaryModels
  ): typeof OrderSchema {
    BootstrapSchema(dbClient, OrderSchema);
    const orderService = new OrderService(OrderSchema, models);
    const orderController = new OrderController(orderService);
    const subRoutes = orderController.Init();
    router.use("/orders", subRoutes);
    return OrderSchema;
  }
}
