import { HttpResponse } from "../../constants/interfaces";
import OrderProductService from "./OrderProduct.service";
import { OrderProductDTO } from "./interfaces";
import { Response, Router, Request } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";

export default class OrderProductController {
  constructor(private orderService: OrderProductService) {}

  Init(): Router {
    const router = Router();
    router.delete("/", this.deleteOrder.bind(this));
    return router;
  }

  async deleteOrder(req: Request, res: Response) {
    const response: HttpResponse<OrderProductDTO[]> = {};
    res.contentType("application/json");
    try {
      if (!req.query.ProductID) throw new Error("ProductID was not specified");
      if (!req.query.OrderCode) throw new Error("OrderCode was not specified");
      if (typeof req.query.OrderCode !== "string")
        throw new Error("OrderCode is not a string");
      const ProductID = req.query.ProductID;
      const OrderCode = req.query.OrderCode as string;

      await this.orderService.deleteOrder(OrderCode, +ProductID);
      response.status = httpStatus.OK;
      response.message = "OrderProduct was successfully deleted.";
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("OrderProductController deleteOrder: ", error);
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
}
