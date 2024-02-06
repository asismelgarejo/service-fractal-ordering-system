import express, { Express } from "express";
import cors from "cors";
import pkg from "body-parser";
import * as path from "path";
const { urlencoded } = pkg;
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${ENV}`) });

import { InitSequelizeDB } from "./database";

import OrderModule from "./modules/Order";
import OrderProductModule from "./modules/OrderProduct";
import ProductModule from "./modules/Product";
import { ENV } from "./constants/app";
import { DictionaryModels } from "./constants/interfaces";

export default class Application {
  app: Express;
  constructor() {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
    app.use(urlencoded({ extended: false }));
    this.app = app;
  }

  async Init() {
    const dbSequelizeClient = await InitSequelizeDB();

    const models: DictionaryModels = {};

    //#region module initialization
    models.Product = await ProductModule.Init(dbSequelizeClient, this.app);
    models.OrderProduct = OrderProductModule.Init(dbSequelizeClient, this.app);
    models.Order = OrderModule.Init(dbSequelizeClient, this.app, models);
    //#endregion module initialization

    //#region before synchronization

    models.Order.associate(models);
    models.Product.associate(models);
    models.OrderProduct.associate(models);
    //#endregion before synchronization

    try {
      await dbSequelizeClient.sync({ force: false });
      console.log("> database has been synced");
    } catch (error) {
      console.log(" > there was an issue synchronizing the database", error);
      process.exit(1);
    }

    //#region after synchronization
    await ProductModule.Seeder(models.Product);
    //#endregion after synchronization

    this.app.use("/hello", (_, res, _2) => {
      res.status(200).json({ message: "Project Created by Asis Melgarejo" });
    });

    this.app.use((_, res, _2) => {
      res.status(404).json({ error: "NOT FOUND" });
    });
  }
}
