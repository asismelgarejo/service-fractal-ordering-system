import ProductController from "./Product.controller";
import ProductService from "./Product.service";
import { Router } from "express";
import MOCK_PRODUCTS from "../../mocks/MOCK_PRODUCTS";
import { GetSchema, ProductSchema } from "./schema";
import { Sequelize } from "sequelize";
import { DBSequelize, DictionaryModels } from "constants/interfaces";
import { ProductDTO } from "./interfaces";

export default class ProductModule {
  constructor() {}

  static async Seeder(model: DBSequelize<ProductDTO>) {
    console.log("Seeder");
    if ((await model.count()) >= 1) return;
    try {
      const result = await model.insertMany<Omit<ProductDTO, "ID">>(
        MOCK_PRODUCTS
      );
      console.log(`${result.length} documents inserted successfully`);
    } catch (error) {
      console.error("error when seeding product", error);
    }
  }

  // static async Init(dbClient: typeof mongoose, router: Router) {
  static async Init(
    dbClient: Sequelize,
    router: Router,
  ): Promise<DBSequelize<ProductDTO>> {
    const ProductModel = GetSchema(dbClient, ProductSchema);

    const orderService = new ProductService(ProductModel);
    const orderController = new ProductController(orderService);
    const subRoutes = orderController.Init();
    router.use("/products", subRoutes);
    return ProductModel;
  }
}
