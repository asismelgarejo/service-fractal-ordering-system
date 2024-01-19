import GetSchema from "./schema"
import OrderController from "./Order.controller";
import OrderService from "./Order.service";
import { Router } from "express";
import { Sequelize } from "sequelize";

export default class OrderModule {
  constructor() {}

  static Init(dbClient: Sequelize, router: Router) {
    const OrderModel = GetSchema(dbClient);
    const orderService = new OrderService(OrderModel);
    const orderController = new OrderController(orderService);
    const subRoutes = orderController.Init();
    router.use("/orders", subRoutes);
  }
}
