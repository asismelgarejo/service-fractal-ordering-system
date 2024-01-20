import { Router } from "express";
import { Sequelize } from "sequelize";
import BootstrapSchema, { OrderProductSchema } from "./schema/sequelize/schema";

export default class OrderModule {
  constructor() {}

  static Init(dbClient: Sequelize, router: Router): typeof OrderProductSchema{
    BootstrapSchema(dbClient, OrderProductSchema);
    return OrderProductSchema;
  }
}
