import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories";

type ProductRequest = {
  name: string;
  description: string;
  price: number;
};

export class ProductService {
  async create({ name, description, price }: ProductRequest) {
    const product = ProductRepository().create({
      name,
      description,
      price,
    });

    await ProductRepository().save(product);

    return product;
  }

  async getAll(): Promise<Product[]> {
    const products = await ProductRepository().find();
    return products;
  }
}
