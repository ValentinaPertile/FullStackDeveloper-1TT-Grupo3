import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ROUTES } from "../routes/paths";
import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../hooks/useCart";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/product.api.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();


  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await getProductById(id);
      return response.data;
    },
    enabled: !!id,

    refetchInterval: 20 * 60 * 1000,
    staleTime: 0,
    cacheTime: 20 * 60 * 1000,
  });

  console.log(product);


  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Hermanos Jota`;
    } else {
      document.title = "Producto — Hermanos Jota";
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, cantidad);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleIncrement = () => {
    setCantidad((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCantidad((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (isLoading) {
    return (
      <main className="wrap py-16 text-center">
        <p className="font-inter text-stone-600">Cargando producto…</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="wrap py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-[var(--tinta)] mb-4">
          Producto no encontrado
        </h1>
        <p className="font-inter text-stone-600 mb-6">
          No pudimos encontrar el mueble que estás buscando en nuestro catálogo.
        </p>
        <Link to={ROUTES.PRODUCTS} className="btn btn--primary">
          ← Volver al catálogo
        </Link>
      </main>
    );
  }

  const sinStock = product.stock <= 0;

  return (
    <main className="wrap">
      <article className="detalle">
        {/* Imagen del producto */}
        <div className="detalle__imagen">
          <img
            src={product.image_url}
            alt={`${product.name}`}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* Información y compra */}
        <div className="detalle__info">
          {product.category && (
            <p className="detalle__categoria">{product.category}</p>
          )}

          <h1 className="detalle__nombre">{product.name}</h1>
          <p className="detalle__precio">{formatPrice(product.price)}</p>

          <p className="detalle__descripcion">
            {product.longDescription}
          </p>

          {/* Especificaciones técnicas */}
          {product.specs && product.specs.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--tinta-suave)] mb-2 font-inter">
                Especificaciones técnicas
              </h2>
              <dl className="product-card__specs">
                {product.specs.map((spec, index) => (
                  <div key={index}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Selector de cantidad y botón de compra */}
          <div className="detalle__acciones">
            <div className="detalle__cantidad" aria-label="Selector de cantidad">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={sinStock || cantidad <= 1}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <input
                type="number"
                id="cantidad"
                min="1"
                value={cantidad}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setCantidad(isNaN(val) || val < 1 ? 1 : val);
                }}
                disabled={sinStock}
                aria-label="Cantidad seleccionada"
              />
              <button
                type="button"
                onClick={handleIncrement}
                disabled={sinStock}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              type="button"
              id="btn-agregar-detalle"
              className="btn btn--primary detalle__btn-add"
              onClick={handleAddToCart}
              disabled={sinStock}
            >
              {sinStock
                ? "Sin stock"
                : added
                ? "Añadido ✓"
                : "Añadir al carrito"}
            </button>
          </div>

          {/* Badges de calidad y sustentabilidad */}
          <div className="detalle__badge">
            <svg
              className="w-4 h-4 text-emerald-700 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Maderas nativas certificadas FSC® · Garantía artesanal de 10 años</span>
          </div>

          <div className="mt-8 pt-4 border-t border-[var(--borde)]">
            <Link to={ROUTES.PRODUCTS} className="detalle__volver">
              ← Volver al catálogo completo
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
