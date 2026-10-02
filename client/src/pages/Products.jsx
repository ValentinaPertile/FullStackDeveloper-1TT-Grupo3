import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { useCart } from "../hooks/useCart";
import { PRODUCTOS } from "../data/productos";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState(PRODUCTOS);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/productos`);
        if (response.ok) {
          const data = await response.json();
          const items = Array.isArray(data) ? data : (data.data ?? []);
          if (isMounted && items.length > 0) {
            setProducts(items);
            return;
          }
        }
      } catch (err) {
        console.warn(
          "API de productos no disponible, usando catálogo local:",
          err.message,
        );
      }

      if (isMounted) {
        setProducts(PRODUCTOS);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 font-display text-4xl">Nuestros productos</h1>

      <ProductList products={products} onAddToCart={addToCart} />
    </main>
  );
}
