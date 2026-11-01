import { Router } from "express";

import { ProductController } from "../controllers/product.controller.js";
import { isAuthenticated } from "../../../core/middleware/isAuthenticated.js";
import { isAdmin } from "../../../core/middleware/isAdmin.js";
import { validate } from "../../../core/middleware/validation.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../types/product.schema.js";

const router = Router();
const controller = new ProductController();

// Público
router.get("/", controller.list);
router.get("/:id", controller.getById);

// Solo ADMIN (isAuthenticated primero, isAdmin después)
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  validate(createProductSchema),
  controller.create,
);

router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  validate(updateProductSchema),
  controller.update,
);

router.delete("/:id", isAuthenticated, isAdmin, controller.remove);

export default router;
