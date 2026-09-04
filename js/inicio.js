document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDestacados();
});

async function cargarProductosDestacados() {
    try {
        const respuesta = await fetch('data/productos.json');
        
        if (!respuesta.ok) {
            throw new Error('Error al cargar el archivo JSON local');
        }

        const productos = await respuesta.json();
        const destacados = productos.filter(producto => producto.destacado === true);
        const productosAMostrar = destacados.slice(0, 3);
        const contenedor = document.getElementById('contenedor-productos');

        productosAMostrar.forEach(producto => {
            const precioFormateado = new Intl.NumberFormat('es-AR').format(producto.precio);

            const li = document.createElement('li');
            li.classList.add('producto-card');
            
            li.innerHTML = `
              <article>
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p class="descripcion-breve">${producto.descripcion}</p>
                    <p class="precio">$ ${precioFormateado}</p>
                    <button class="btn-agregar" data-id="${producto.id}">AGREGAR AL CARRITO</button>
                </div>
              </article>
            `;
            
            contenedor.appendChild(li);
        });

    } catch (error) {
        console.error('Hubo un problema cargando los productos destacados:', error);
    }
}

/* --- lógica del carrito --- */

const grillaProductos = document.getElementById('contenedor-productos');

grillaProductos.addEventListener('click', (evento) => {
   
    if (evento.target.classList.contains('btn-agregar')) {
        
        const idProducto = evento.target.getAttribute('data-id');
        
        agregarAlCarrito(idProducto);
    }
});

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito_jota')) || [];
    
    carrito.push(id);
    
    localStorage.setItem('carrito_jota', JSON.stringify(carrito));
    
    alert(`¡Producto agregado exitosamente!`);
    console.log("Estado actual del carrito:", carrito);
}