import mongoose from "mongoose";
import { dbStrConnection, mysqlDBStrConnection } from "../constants/app";
import { Sequelize } from "sequelize";

export async function InitMongooseDB(): Promise<typeof mongoose> {
  const dbClient = await mongoose.connect(dbStrConnection, {});
  console.log("Connected to Mongo");
  return dbClient;
}

export async function InitSequelizeDB(): Promise<Sequelize> {
  console.log(">mysqlDBStrConnection", mysqlDBStrConnection);

  return new Sequelize(mysqlDBStrConnection);
}
