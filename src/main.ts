import express, { Express } from "express";
import cors from "cors";
import pkg from "body-parser";
import * as path from "path";
const { urlencoded } = pkg;
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), `.env.${ENV}`) });

import { InitMongooseDB, InitSequelizeDB } from "./database";

import OrderModule from "./modules/Order";
import ProductModule from "modules/Product";
import { ENV } from "constants/app";

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
    OrderModule.Init(dbSequelizeClient, this.app);
    const ProductModel = await ProductModule.Init(dbSequelizeClient, this.app);

    try {
      await dbSequelizeClient.sync({ force: false });
      console.log("> database has been synced");
    } catch (error) {
      console.log(" > there was an issue synchronizing the database", error);
      process.exit(1);
    }
    await ProductModule.Seeder(ProductModel);

    this.app.use("/hello", (_, res, _2) => {
      res.status(200).json({ message: "Project Created by Asis Melgarejo" });
    });

    this.app.use((_, res, _2) => {
      res.status(404).json({ error: "NOT FOUND" });
    });
  }
}
