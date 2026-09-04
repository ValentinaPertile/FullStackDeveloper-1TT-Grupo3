let productos = [];

const productosPromise = fetch("data/productos.json")
  .then((res) => {
    if (!res.ok) throw new Error("Error al cargar productos");
    return res.json();
  })
  .then((data) => {
    productos = data;
    return productos;
  });
