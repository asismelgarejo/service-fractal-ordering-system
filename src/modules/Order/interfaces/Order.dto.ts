import { ProductDTO } from "modules/Product/interfaces";

export interface OrderDTO {
  ID: string;
  Order: string;
  Date: string;
  FinalPrice: number;
  Products: OrderProductDTO[];
}

export interface OrderProductDTO {
  Product: ProductDTO;
  Qty: number;
  TotalPrice: number;
}
