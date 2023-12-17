import mongoose from "mongoose";
import { dbStrConnection } from "../constants/app";

export async function InitializeDB(): Promise<typeof mongoose> {
  const dbClient = await mongoose.connect(dbStrConnection, {});
  console.log("Connected to Mongo");
  return dbClient;
}
