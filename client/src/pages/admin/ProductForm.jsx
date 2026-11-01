import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { create, update, getProductById } from "../../services/products.api";
import { ROUTES } from "../../routes/paths";

// Las specs se guardan como [{ label, valor }]; en el form se editan una por línea ("Medidas: 45 × 35 cm")
const specsToText = (specs) =>
  Array.isArray(specs)
    ? specs.map((s) => `${s.label}: ${s.valor}`).join("\n")
    : "";

const textToSpecs = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return { label: label.trim(), valor: rest.join(":").trim() };
    });

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    longDescription: "",
    price: 0,
    category: "",
    stock: 0,
    image_url: "",
    specs: "",
    destacado: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;

    let active = true;
    getProductById(id)
      .then((data) => {
        if (!active) return;
        const prod = data.product || data.data || data;
        setFormData({
          name: prod.name || "",
          description: prod.description || "",
          longDescription: prod.longDescription || "",
          price: prod.price ?? 0,
          category: prod.category?._id || prod.category || "",
          stock: prod.stock ?? 0,
          image_url: prod.image_url || "",
          specs: specsToText(prod.specs),
          destacado: Boolean(prod.destacado),
        });
      })
      .catch((err) => {
        if (active) setError(err.message || "Error al cargar el producto");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = { ...formData, specs: textToSpecs(formData.specs) };

    try {
      const res = isEdit
        ? await update(id, payload)
        : await create(payload);

      if (res && res.success === false) {
        setError(res.error || "Ocurrió un error al guardar el producto");
        setLoading(false);
        return;
      }

      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch {
      setError("Error al conectar con el servidor");
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-6 font-display text-4xl">
        {isEdit ? "Editar producto" : "Nuevo producto"}
      </h1>

      {error && (
        <div className="mb-6 rounded border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-stone-700"
          >
            Nombre del producto
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded border border-stone-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-stone-700"
          >
            Descripción corta
          </label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full rounded border border-stone-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="longDescription"
            className="mb-1 block text-sm font-medium text-stone-700"
          >
            Descripción larga
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows="3"
            className="w-full rounded border border-stone-300 px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              Precio
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
              className="w-full rounded border border-stone-300 px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="mb-1 block text-sm font-medium text-stone-700"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
              className="w-full rounded border border-stone-300 px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-stone-700"
          >
            Categoría
          </label>
          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded border border-stone-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="image_url"
            className="mb-1 block text-sm font-medium text-stone-700"
          >
            URL de la imagen
          </label>
          {/* text y no url: las imágenes del catálogo son rutas relativas (/img/...) */}
          <input
            id="image_url"
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
            placeholder="/img/mi_producto.webp o https://..."
            className="w-full rounded border border-stone-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="specs"
            className="mb-1 block text-sm font-medium text-stone-700"
          >
            Especificaciones (una por línea)
          </label>
          <textarea
            id="specs"
            name="specs"
            value={formData.specs}
            onChange={handleChange}
            rows="4"
            placeholder={"Medidas: 45 × 35 × 60 cm\nMateriales: Roble macizo FSC®"}
            className="w-full rounded border border-stone-300 px-3 py-2"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-stone-700">
          <input
            type="checkbox"
            name="destacado"
            checked={formData.destacado}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span>Producto destacado (mostrar en Home)</span>
        </label>

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-stone-900 px-5 py-2.5 text-white hover:bg-stone-800 disabled:opacity-50"
          >
            {loading
              ? "Guardando..."
              : isEdit
                ? "Guardar cambios"
                : "Crear producto"}
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
            className="rounded border border-stone-300 px-5 py-2.5 text-stone-700 hover:bg-stone-100"
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}