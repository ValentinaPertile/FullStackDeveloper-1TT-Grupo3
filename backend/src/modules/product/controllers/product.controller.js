import { ProductService } from "../services/product.service.js";
import { ErrorResponse } from "../../../core/errors/error-handler.js";

export class ProductController {
  constructor(productService = new ProductService()) {
    this.productService = productService;
  }

  getAll = async (req, res, next) => {
    const { category } = req.query;
    try {
      const products = await this.productService.getAll(category);

      return res.status(200).json({
        success: true,
        message: "Productos obtenidos exitosamente",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    const { id } = req.params;

    try {
      if (!id) {
        throw new ErrorResponse("ID de producto requerido", 400);
      }
      const response = await this.productService.getById(id);
      return res.status(200).json({
        success: true,
        message: "Producto obtenido exitosamente",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };
}
