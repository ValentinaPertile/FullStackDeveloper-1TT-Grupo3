import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { isAuthenticated } from "../../../core/middleware/isAuthenticated.js";
import { isAdmin } from "../../../core/middleware/isAdmin.js";

const router = Router();
const controller = new OrderController();

// POST /api/orders - Crear orden de compra (usuarios e invitados)
router.post("/", controller.create);

// GET /api/orders - Listar órdenes (tienen datos personales: solo ADMIN)
router.get("/", isAuthenticated, isAdmin, controller.list);

export default router;
