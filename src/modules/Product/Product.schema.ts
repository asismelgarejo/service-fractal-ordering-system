import { Schema } from "mongoose";

const ProductSchema = new Schema({
  Name: String,
  UnitPrice: Number,
});

ProductSchema.virtual("ID").get(function () {
  return this._id;
});
ProductSchema.set("toJSON", { virtuals: true });

export default ProductSchema;
