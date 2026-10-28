import { Router } from "express";
import { PRODUCTOS } from "../../../../data/productos.js";
import { ProductService } from "../services/product.service.js";
import { ProductController } from "../controllers/product.controller.js";

import Product from "../../../core/models/Product.js";

const router = Router();

const service = new ProductService();
const controller = new ProductController(service);

// Obtener productos
router.get("/", controller.getAll);

// Obtener producto por ID
router.get("/:id", controller.getById);

export default router;