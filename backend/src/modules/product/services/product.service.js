import { ErrorResponse } from "../../../core/errors/error-handler.js";
import Order from "../../../core/models/Order.js";
import Product from "../../../core/models/Product.js";

export class ProductService {
  constructor() {}

  async getAll(category) {
    const query = {};

    if (category) {
      query.category = category;
    }

    const data = await Product.find(query).sort({ createdAt: -1 }).lean();
    return data;
  }

  async getById(id) {
    try {
      const product = await Product.findById(id).lean();
      if (!product) throw new ErrorResponse("Producto no encontrado", 404);
      return product;
    } catch (error) {
      throw new ErrorResponse("Error al obtener el producto", 404);
    }
  }
}
