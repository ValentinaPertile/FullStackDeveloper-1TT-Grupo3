import { ErrorResponse } from "../errors/error-handler.js";

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse("No autenticado", 401));
  }

  if (req.user.role !== "ADMIN") {
    return next(
      new ErrorResponse(
        "Acceso denegado: se requiere rol administrador",
        403,
      ),
    );
  }

  next();
};
