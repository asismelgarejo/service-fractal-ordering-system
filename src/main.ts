import express, { Express } from "express";
import cors from "cors";
import pkg from "body-parser";
import * as path from "path";
const { urlencoded } = pkg;
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${ENV}`) });

import { InitMongooseDB, InitSequelizeDB } from "./database";

import OrderModule from "./modules/Order";
import OrderProductModule from "./modules/Order_Product";
import ProductModule from "modules/Product";
import { ENV } from "constants/app";
import { OrderSchema } from "modules/Order/schema";
import { ProductSchema } from "modules/Product/schema";
import { OrderProductSchema } from "modules/Order_Product/schema/sequelize/schema";

export default class Application {
  app: Express;
  constructor() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    this.app = app;
  }

  async Init() {
    const dbSequelizeClient = await InitSequelizeDB();
    
    //#region module initialization
    OrderModule.Init(dbSequelizeClient, this.app);
    const ProductModel = await ProductModule.Init(dbSequelizeClient, this.app);
    OrderProductModule.Init(dbSequelizeClient, this.app);
    //#endregion module initialization
    
    //#region before synchronization
    const models = {
      Order: OrderSchema,
      Product: ProductSchema,
      OrderProduct: OrderProductSchema,
    };
    OrderSchema.associate(models);
    ProductSchema.associate(models);
    OrderProductSchema.associate(models);
    //#endregion before synchronization
    
    try {
      await dbSequelizeClient.sync({ force: true });
      console.log("> database has been synced");
    } catch (error) {
      console.log(" > there was an issue synchronizing the database", error);
      process.exit(1);
    }

    //#region after synchronization
    await ProductModule.Seeder(ProductModel);
    //#endregion after synchronization

    this.app.use("/hello", (_, res, _2) => {
      res.status(200).json({ message: "Project Created by Asis Melgarejo" });
    });

    this.app.use((_, res, _2) => {
      res.status(404).json({ error: "NOT FOUND" });
    });
  }
}
