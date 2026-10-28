import { Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";

export default function NotFound() {
  return (
    <section
      className="wrap flex flex-col items-center gap-4 py-24 text-center"
      aria-labelledby="not-found-titulo"
    >
      <p className="eyebrow">Error 404</p>
      <h1 id="not-found-titulo" className="section-title">
        Esta página no existe
      </h1>
      <p className="hero__lead max-w-xl">
        Puede que el enlace esté roto o que la pieza que buscás ya no forme
        parte de nuestro catálogo.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link className="btn btn--primary" to={ROUTES.HOME}>
          Volver al inicio
        </Link>
        <Link className="btn btn--ghost" to={ROUTES.PRODUCTS}>
          Ver el catálogo
        </Link>
      </div>
    </section>
  );
}
