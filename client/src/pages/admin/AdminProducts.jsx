import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { formatPrice } from "../../utils/formatPrice";
import { interceptor } from "../../api/interceptor/axios-interceptor";
import { API_URL } from "../../api/config/config";

async function deleteProduct(id) {
  try {
    await interceptor.delete(`/productos/${id}`);
  } catch (err) {
    // El interceptor ya normaliza el error a { status, success, error }
    throw new Error(err?.error || "No se pudo borrar el producto", {
      cause: err,
    });
  }
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/productos`);
        if (!response.ok) {
          throw new Error(`Error ${response.status} al cargar los productos`);
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : (data.data ?? []);
        // Por las dudas, no mostramos productos inactivos (active = false)
        setProducts(list.filter((p) => p.active !== false));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Seguro que querés borrar "${product.name}"?`)) return;

    setDeletingId(product._id);
    setError(null);
    try {
      await deleteProduct(product._id);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-10 font-inter">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-4xl">Panel de productos</h1>
        <Link
          to={ROUTES.ADMIN_PRODUCT_NEW}
          className="rounded-md bg-stone-900 px-4 py-2 text-sm text-white hover:bg-stone-700"
        >
          Nuevo producto
        </Link>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="mb-4 text-red-600">{error}</p>}

      {!loading && products.length === 0 && !error && (
        <p className="text-stone-600">No hay productos cargados.</p>
      )}

      {!loading && products.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-stone-200 bg-stone-50 text-stone-600">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Destacado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-stone-100 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {product.category?.name ?? product.category ?? "—"}
                  </td>
                  <td className="px-4 py-3">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">{product.destacado ? "Sí" : "No"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={ROUTES.ADMIN_PRODUCT_EDIT(product._id)}
                        className="rounded-md border border-stone-300 px-3 py-1.5 hover:bg-stone-100"
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        disabled={deletingId === product._id}
                        className="rounded-md border border-red-300 px-3 py-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === product._id ? "Borrando..." : "Borrar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
