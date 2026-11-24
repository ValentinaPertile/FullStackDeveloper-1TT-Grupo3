import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../core/config/config.js";
import { ErrorResponse } from "../../core/errors/error-handler.js";

function encodeRole(role) {
  return role === "ADMIN" ? "a" : "u";
}

export function createToken(user) {
  const payload = {
    sub: user._id.toString(),
    rol: encodeRole(user.role),
    prv: user.provider,
    typ: "access",
  };

  return jwt.sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ErrorResponse("El token ha expirado. Por favor, solicita uno nuevo.", 401);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new ErrorResponse("El token proporcionado no es válido o fue alterado.", 401);
    }
    throw new ErrorResponse("Error al procesar la autenticación.", 401);
  }
}

// Token corto que se entrega tras el login con Google a un usuario nuevo,
// para que complete DNI y teléfono. No sirve como sesión (typ "register").
export function createRegisterToken({ email, provider, avatar_url }) {
  return jwt.sign({ email, provider, avatar_url, typ: "register" }, JWT_SECRET, {
    expiresIn: "15m",
    algorithm: "HS256",
  });
}
