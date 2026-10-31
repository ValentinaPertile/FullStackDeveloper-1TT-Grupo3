import { ProductService } from "../services/product.service.js";

export class ProductController {
  constructor(productService = new ProductService()) {
    this.productService = productService;
  }

  list = async (req, res, next) => {
    try {
      const { category, categoria } = req.query;
      const data = await this.productService.getAll({
        category: category ?? categoria,
      });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const product = await this.productService.getByIdentifier(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Producto no encontrado",
        });
      }

      return res.status(200).json({ success: true, data: product });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
      try {
        const product = await this.productService.create(req.body);

        return res.status(201).json({
          success: true,
          message: "Producto creado exitosamente",
          data: product,
        });
      } catch (error) {
        next(error);
      }
    };

    update = async (req, res, next) => {
      try {
        const product = await this.productService.update(req.params.id, req.body);

        if (!product) {
          return res.status(404).json({
            success: false,
            error: "Producto no encontrado",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Producto actualizado exitosamente",
          data: product,
        });
      } catch (error) {
        next(error);
      }
    };

    remove = async (req, res, next) => {
      try {
        const deleted = await this.productService.remove(req.params.id);

        if (!deleted) {
          return res.status(404).json({
            success: false,
            error: "Producto no encontrado",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Producto eliminado exitosamente",
        });
      } catch (error) {
        next(error);
      }
    };
}
