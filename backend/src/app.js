import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";

// Inicialización de variables de entorno  y aplicación
dotenv.config();
const app = express();

app.set("trust proxy", 1); // Confía en el proxy (Vercel, Nginx, etc.)
const PORT = process.env.PORT || 3000;

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

// Cookie parser
app.use(cookieParser());

// Configuración de sesiones
const isProd = process.env.NODE_ENV === "production";

// Configuración de sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // La cookie solo se genera al iniciar sesión
    cookie: {
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 días
      secure: isProd, // Obliga a usar HTTPS en producción
      sameSite: isProd ? "none" : "lax",
      httpOnly: true, // Protege contra ataques XSS
    },
  }),
);

// Rutas
app.get('/health', (req, res) => res.status(200));

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
});


app.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
});

export default app;
