import { useCart } from "../hooks/useCart";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.api";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

export default function Products() {
  const { addToCart } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await getProducts(category);

        return response.data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "Error al obtener los productos";
        throw new Error(errorMessage, { cause: error });
      }
    },

    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 60,
    retry: 3,
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 font-display text-4xl">Nuestros productos</h1>

      {error && (
        <div
          className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{error.message}</span>
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <p className="text-center">No se encontraron productos</p>
      )}

      {isLoading ? (
        <p className="text-center">Cargando productos...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </main>
  );
}
