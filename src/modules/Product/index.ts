import mongoose from "mongoose";
import ProductSchema from "./Product.schema";

import ProductController from "./Product.controller";
import ProductService from "./Product.service";
import { ProductDocument, ProductModelType } from "./interfaces";
import { Router } from "express";
import MOCK_PRODUCTS from "../../mocks/MOCK_PRODUCTS";

export default class ProductModule {
  constructor() {}

  static async Seeder(model: ProductModelType) {
    console.log("Seeder");
    
    if ((await model.countDocuments()) >= 1) return;
    try {
      const result = await model.insertMany(MOCK_PRODUCTS);
      console.log(`${result.length} documents inserted successfully`);
    } catch (error) {
      console.error("error when seeding product", error);
    }
  }

  static async Init(dbClient: typeof mongoose, router: Router) {
    const ProductModel = dbClient.model<ProductDocument, ProductModelType>(
      "Product",
      ProductSchema
    );
    
    await ProductModule.Seeder(ProductModel);

    const orderService = new ProductService(ProductModel);
    const orderController = new ProductController(orderService);
    const subRoutes = orderController.Init();
    router.use("/products", subRoutes);
  }
}
