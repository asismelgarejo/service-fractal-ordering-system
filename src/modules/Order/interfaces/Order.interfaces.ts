import { Document, Model } from "mongoose";
import { OrderDTO } from "./Order.dto";

//#region ORDER
export interface OrderDocument extends Document<any, any, any>, OrderDTO {}
export type OrderModelType = Model<OrderDocument>;
//#endregion ORDER
