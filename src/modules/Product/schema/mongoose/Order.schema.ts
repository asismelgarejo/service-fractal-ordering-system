import { ProductDocument, ProductModelType } from "modules/Product/interfaces";
import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  Name: String,
  UnitPrice: Number,
});

ProductSchema.virtual("ID").get(function () {
  return this._id;
});
ProductSchema.set("toJSON", { virtuals: true });

export default function GetSchema(dbClient: typeof mongoose) {
  return dbClient.model<ProductDocument, ProductModelType>(
    "Product",
    ProductSchema
  );
}
