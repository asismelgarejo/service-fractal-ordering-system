import ProductController from "./Product.controller";
import ProductService from "./Product.service";
import { Router } from "express";
import MOCK_PRODUCTS from "../../mocks/MOCK_PRODUCTS";
import { BootstrapSchema, ProductSchema } from "./schema";
import { Sequelize } from "sequelize";
import { CustomModel } from "constants/interfaces";
import { ProductDTO } from "./interfaces";

export default class ProductModule {
  constructor() {}

  static async Seeder(model: typeof CustomModel<ProductDTO>) {
    console.log("Seeder");
    if ((await model.count()) >= 1) return;
    try {
      const result = await model.bulkCreate(MOCK_PRODUCTS as any);
      console.log(`${result.length} documents inserted successfully`);
    } catch (error) {
      console.error("error when seeding product", error);
    }
  }

  // static async Init(dbClient: typeof mongoose, router: Router) {
  static async Init(
    dbClient: Sequelize,
    router: Router
  ): Promise<typeof ProductSchema> {
    BootstrapSchema(dbClient, ProductSchema);
    const orderService = new ProductService(ProductSchema);
    const orderController = new ProductController(orderService);
    const subRoutes = orderController.Init();
    router.use("/products", subRoutes);
    return ProductSchema;
  }
}
