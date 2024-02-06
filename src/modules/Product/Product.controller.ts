import { HttpResponse } from "../../constants/interfaces";
import ProductService from "./Product.service";
import { ProductDTO } from "./interfaces";
import { Response, Router, Request } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";

export default class ProductController {
  constructor(private productService: ProductService) {}

  Init(): Router {
    const router = Router();
    router.get("/", this.getProducts.bind(this));
    router.post("/", this.createProduct.bind(this));
    router.delete("/:productId", this.deleteProduct.bind(this));
    router.put("/:productId", this.updateProduct.bind(this));
    router.get("/:productId", this.findProduct.bind(this));
    return router;
  }

  async getProducts(req: Request, res: Response) {
    const response: HttpResponse<ProductDTO[]> = {};
    res.contentType("application/json");

    try {
      const products = await this.productService.getProducts();
      response.data = products;

      response.message = "success";
      response.status = httpStatus.OK;

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("ProductController GET: ", error);

      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);

      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;

      res.send(response);
    }
  }
  async createProduct(req: Request, res: Response) {
    const response: HttpResponse<ProductDTO[]> = {};
    res.contentType("application/json");
    const payload = req.body as unknown as ProductDTO;

    if (!payload) {
      response.message = "fields were not supplied.";
      response.status = httpStatus.BAD_REQUEST;
      res.status(httpStatus.BAD_REQUEST).send(response);
      return;
    }

    try {
      await this.productService.createProduct(payload);
      response.status = httpStatus.CREATED;
      response.message = "Product was successfully created.";
      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      console.log("ProductController CREATE: ", error);
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
  async updateProduct(req: Request, res: Response) {
    const ID = req.params.productId;
    const response: HttpResponse<ProductDTO[]> = {};
    res.contentType("application/json");
    const payload = req.body as unknown as ProductDTO;

    if (!payload) {
      response.message = "fields were not supplied.";
      response.status = httpStatus.BAD_REQUEST;
      res.status(httpStatus.BAD_REQUEST).send(response);
      return;
    }
    try {
      await this.productService.updateProduct(+ID, payload);
      response.status = httpStatus.OK;
      response.message = "Product was successfully updated.";
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("ProductController updateProduct: ", error);
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const ID = req.params.productId;
    const response: HttpResponse<ProductDTO[]> = {};
    res.contentType("application/json");
    try {
      await this.productService.deleteProduct(+ID);
      response.status = httpStatus.OK;
      response.message = "Product was successfully deleted.";
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("ProductController deleteProduct: ", error);
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
  async findProduct(req: Request, res: Response) {
    const ID = req.params.productId;
    const response: HttpResponse<ProductDTO> = {};
    res.contentType("application/json");
    try {
      const productRes = await this.productService.findProduct(+ID);
      response.status = httpStatus.OK;
      response.message = ReasonPhrases.OK;
      response.data = productRes;
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      console.log("ProductController findProduct: ", error);
      response.message = ReasonPhrases.INTERNAL_SERVER_ERROR;
      response.status = httpStatus.INTERNAL_SERVER_ERROR;
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
    }
  }
}
