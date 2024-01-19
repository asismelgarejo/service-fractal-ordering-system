import { GetSchema, OrderSchema } from "./schema";
import OrderController from "./Order.controller";
import OrderService from "./Order.service";
import { Router } from "express";
import { Sequelize } from "sequelize";
import { DBSequelize } from "constants/interfaces";
import { OrderDTO } from "./interfaces";

export default class OrderModule {
  constructor() {}

  static Init(dbClient: Sequelize, router: Router): DBSequelize<OrderDTO> {
    const OrderModel = GetSchema(dbClient, OrderSchema);
    const orderService = new OrderService(OrderModel);
    const orderController = new OrderController(orderService);
    const subRoutes = orderController.Init();
    router.use("/orders", subRoutes);
    return OrderModel;
  }
}
