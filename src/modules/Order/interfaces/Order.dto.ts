import { ProductDTO } from "modules/Product/interfaces";

type OrderStatus = "Pending" | "InProgress" | "Completed";
export interface OrderDTO {
  ID: string;
  Order: string;
  Date: string;
  FinalPrice: number;
  Products: OrderProductDTO[];
  Status: OrderStatus;
}

export interface OrderProductDTO {
  Product: ProductDTO;
  Qty: number;
  TotalPrice: number;
}
