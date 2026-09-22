import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./core/database/database.js";
import { ErrorHandler } from "./core/middleware/error-handler.js";
import { API_PREFIX, PORT } from "./core/config/config.js";
import { Auth } from "./index.js";

// Inicialización de aplicación
const app = express();

app.set("trust proxy", 1); // Confía en el proxy (Vercel, Nginx, etc.)

const origins = [process.env.FRONTEND_URL];

// Configuración de CORS
app.use(
  cors({
    origin: origins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

connectDB();

// Cookie parser
app.use(cookieParser());

// Rutas
app.get(`${API_PREFIX}/health`, (req, res) => {
  return res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use(`${API_PREFIX}/auth`, Auth);

// Middleware de manejo de errores
app.use(ErrorHandler); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}${API_PREFIX}`);
});

export default app;
