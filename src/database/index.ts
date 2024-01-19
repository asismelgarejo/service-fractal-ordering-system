import mongoose from "mongoose";
import { dbStrConnection } from "../constants/app";
import { DBConfigEnvs, DBOptions, Environments } from "constants/interfaces";
import { Sequelize } from "sequelize";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV || "development";

export async function InitMongooseDB(): Promise<typeof mongoose> {
  const dbClient = await mongoose.connect(dbStrConnection, {});
  console.log("Connected to Mongo");
  return dbClient;
}

export async function GetDBConfig(): Promise<DBOptions> {
  const filePath = path.join(__dirname, `../config/config.json`);
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dbConfig: DBConfigEnvs = JSON.parse(rawData);
  return dbConfig[env as Environments] as DBOptions;
}

function GetSequelize(config: DBOptions): Sequelize {
  if (!config.use_env_variable)
    return new Sequelize(
      config?.database ?? "",
      config?.username ?? "",
      config?.password ?? "",
      config
    );
  const database = process.env[config.use_env_variable] || "";
  return new Sequelize(database, config);
}

export async function InitSequelizeDB(): Promise<Sequelize> {
  const config = await GetDBConfig();
  return GetSequelize(config);
}
