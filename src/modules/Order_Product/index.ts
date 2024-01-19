import { Router } from "express";
import { Sequelize } from "sequelize";
import { DBSequelize } from "constants/interfaces";
import { OrderDTO, OrderProductDTO } from "./interfaces";
import GetSchema, { OrderProductSchema } from "./schema/sequelize/schema";

export default class OrderModule {
  constructor() {}

  static Init(dbClient: Sequelize, router: Router): DBSequelize<OrderProductDTO> {
    const OrderModel = GetSchema(dbClient, OrderProductSchema);
    return OrderModel;
  }
}
