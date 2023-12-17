import { Document, Model } from "mongoose";
import { ProductDTO } from "./Product.dto";

export interface ProductDocument extends Document<any, any, any>, ProductDTO {}
export type ProductModelType = Model<ProductDocument>;
