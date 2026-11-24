import { ErrorResponse } from "../errors/error-handler.js";

/**
 * Limita la cantidad de pedidos por IP en una ventana de tiempo.
 * Se usa en login y registro para frenar ataques de fuerza bruta.
 * Guarda los contadores en memoria: alcanza para una sola instancia del servidor.
 */
export const rateLimit = ({ windowMs, max, message }) => {
  const hits = new Map();

  // Limpia contadores vencidos para que el Map no crezca sin límite
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(ip);
    }
  }, windowMs).unref();

  return (req, res, next) => {
    const now = Date.now();
    const entry = hits.get(req.ip);

    if (!entry || entry.resetAt <= now) {
      hits.set(req.ip, { count: 1, resetAt: now + windowMs });
      return next();
    }

    entry.count += 1;

    if (entry.count > max) {
      res.set("Retry-After", Math.ceil((entry.resetAt - now) / 1000));
      return next(new ErrorResponse(message, 429));
    }

    next();
  };
};
