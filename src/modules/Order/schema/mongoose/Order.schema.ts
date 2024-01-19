import mongoose, { Schema } from "mongoose";
import {
  OrderDocument,
  OrderModelType,
} from "../../interfaces/Order.interfaces";

const OrderSchema = new Schema(
  {
    Date: String,
    Order: {
      type: String,
      unique: true,
    },
    FinalPrice: Number,
    Status: {
      type: String,
      enum: ["Pending", "InProgress", "Completed"],
    },
    Products: [
      {
        Product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        Qty: {
          type: Number,
          default: 1,
        },
        TotalPrice: {
          type: Number,
        },
      },
    ],
  },
  {
    virtuals: {
      ID: {
        get() {
          return this._id;
        },
      },
    },
  }
);

OrderSchema.set("toJSON", { virtuals: true });

export default function GetSchema(dbClient: typeof mongoose) {
  return dbClient.model<OrderDocument, OrderModelType>("Order", OrderSchema);
}
