import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export class ProductController {
  async create(request: Request, response: Response) {
    const { name, description, price } = request.body;

    const productService = new ProductService();

    const product = await productService.create({
      name,
      description,
      price,
    });

    return response.json(product);
  }

  async getAll(request: Request, response: Response) {
    const productService = new ProductService();

    const products = await productService.getAll();

    return response.json(products);
  }
}
