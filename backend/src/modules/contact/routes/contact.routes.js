import { Router } from "express";
import { ContactController } from "../controllers/contact.controller.js";

import { contactSchema } from "../contact.validation.js";
import { validate } from "../../../core/middleware/validation.js";
import { isAuthenticated } from "../../../core/middleware/isAuthenticated.js";
import { isAdmin } from "../../../core/middleware/isAdmin.js";

const router = Router();

const controller = new ContactController();

router.post("/", validate(contactSchema), controller.create);

// Las consultas tienen datos personales: solo ADMIN
router.get("/", isAuthenticated, isAdmin, controller.list);

export default router;
