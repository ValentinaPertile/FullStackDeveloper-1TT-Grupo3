import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

import { authSchema } from "../types/auth.schema.js";
import { validate } from "../../../core/middleware/validation.js";
import { AuthService } from "../services/auth.service.js";

const router = Router();

const service = new AuthService();
const controller = new AuthController(service);

// Login
// =========================================================
router.post("/login", validate(authSchema), controller.login);

// Register
// =========================================================
router.post("/register", validate(authSchema), controller.register);

export default router;
