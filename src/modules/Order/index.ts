import mongoose from "mongoose";
import OrderSchema from "./Order.schema";

import OrderController from "./Order.controller";
import OrderService from "./Order.service";
import { OrderDocument, OrderModelType } from "./interfaces/Order.interfaces";
import { Router } from "express";

export default class OrderModule {
  constructor() {}

  static Init(dbClient: typeof mongoose, router: Router) {
    const OrderModel = dbClient.model<OrderDocument, OrderModelType>(
      "Order",
      OrderSchema
    );
    const orderService = new OrderService(OrderModel);
    const orderController = new OrderController(orderService);
    const subRoutes = orderController.Init();
    router.use("/orders", subRoutes);
  }
}
