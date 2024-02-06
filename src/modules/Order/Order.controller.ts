import { HttpResponse } from "../../constants/interfaces";
import OrderService from "./Order.service";
import { OrderDTO } from "./interfaces";
import { Response, Router, Request } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";

export default class OrderController {
  constructor(private orderService: OrderService) {}

  Init(): Router {
    const router = Router();
    router.get("/", this.getOrders.bind(this));
    router.post("/", this.createOrder.bind(this));
    router.delete("/:orderId", this.deleteOrder.bind(this));
    router.put("/:orderId", this.updateOrder.bind(this));
    router.get("/:orderId", this.findOrder.bind(this));
    return router;
  }

  async getOrders(req: Request, res: Response) {
    const response: HttpResponse<OrderDTO[]> = {};
    res.contentType("application/json");

    try {
      const orders = await this.orderService.getOrders();
      response.data = orders;

      response.message = "success";
      response.status = httpStatus.OK;

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("OrderController GET: ", error);
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.BAD_REQUEST).send(response);
    }
  }
  async createOrder(req: Request, res: Response) {
    const response: HttpResponse<OrderDTO[]> = {};
    res.contentType("application/json");
    const payload = req.body as unknown as OrderDTO;

    if (!payload) {
      response.message = "fields were not supplied.";
      response.status = httpStatus.BAD_REQUEST;
      res.status(httpStatus.BAD_REQUEST).send(response);
      return;
    }

    try {
      await this.orderService.createOrder(payload);
      response.status = httpStatus.CREATED;
      response.message = "Order was successfully created.";
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      console.log("OrderController CREATE: ", error);
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
  async updateOrder(req: Request, res: Response) {
    const ID = req.params.orderId;
    const response: HttpResponse<OrderDTO[]> = {};
    res.contentType("application/json");
    const payload = req.body as unknown as OrderDTO;

    if (!payload) {
      response.message = "fields were not supplied.";
      response.status = httpStatus.BAD_REQUEST;
      res.status(httpStatus.BAD_REQUEST).send(response);
      return;
    }
    try {
      await this.orderService.updateOrder(+ID, payload);
      response.status = httpStatus.OK;
      response.message = "Order was successfully updated.";
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("OrderController updateOrder: ", error);
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
  async deleteOrder(req: Request, res: Response) {
    const ID = req.params.orderId;
    const response: HttpResponse<OrderDTO[]> = {};
    res.contentType("application/json");
    try {
      await this.orderService.deleteOrder(ID);
      response.status = httpStatus.OK;
      response.message = "Order was successfully deleted.";
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("OrderController deleteOrder: ", error);
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
  async findOrder(req: Request, res: Response) {
    const ID = req.params.orderId;
    const response: HttpResponse<OrderDTO> = {};
    res.contentType("application/json");
    try {
      const orderRes = await this.orderService.findOrder(+ID);
      response.status = httpStatus.OK;
      response.message = ReasonPhrases.OK;
      response.data = orderRes;
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("OrderController findOrder: ", error);
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
}
