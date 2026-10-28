import { useParams } from "react-router-dom";

// Placeholder: Brisa reemplaza este archivo con el formulario de creación/edición.
// La misma página atiende /admin/productos/nuevo y /admin/productos/:id/editar.
export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-4 font-display text-4xl">
        {isEdit ? "Editar producto" : "Nuevo producto"}
      </h1>
      <p className="text-stone-600">En construcción.</p>
    </section>
  );
}
