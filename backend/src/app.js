import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./core/database/database.js";
import { ErrorHandler } from "./core/middleware/error-handler.js";
import { API_PREFIX, FRONTEND_URL, PORT } from "./core/config/config.js";
import { Auth, Contact, Orders, Products } from "./index.js";

import passport from "passport";

import "./core/config/passport.js";


// Sin estas variables el servidor no puede firmar sesiones ni guardar datos
for (const name of ["MONGODB_URI", "JWT_SECRET"]) {
  if (!process.env[name]) {
    console.error(`Falta la variable de entorno ${name}`);
    process.exit(1);
  }
}

// Inicialización de aplicación
const app = express();

app.disable("x-powered-by"); // No revelar que el servidor usa Express

// Cabeceras de seguridad básicas
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
  });
  next();
});

app.set("trust proxy", 1); // Confía en el proxy (Vercel, Nginx, etc.)

const origins = [FRONTEND_URL];

// Configuración de CORS
app.use(
  cors({
    origin: origins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Auth-Token",
      "X-Client-System",
    ], // Headers Autorizados
    exposedHeaders: ["X-Auth-Token"], // Headers Expuestos a frontend
    credentials: true,
  }),
);

app.use(express.json({ limit: "100kb" }));

await connectDB();

// Cookie parser
app.use(cookieParser());

app.use(passport.initialize());

// Rutas
app.get(`${API_PREFIX}/health`, (req, res) => {
  return res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Middleware de logging personalizado
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time);
  next();
});

app.use(`${API_PREFIX}/auth`, Auth);
app.use(`${API_PREFIX}/contact`, Contact);
app.use(`${API_PREFIX}/productos`, Products);
app.use(`${API_PREFIX}/orders`, Orders);

// Middleware de manejo de errores
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}${API_PREFIX}`);
});

export default app;
