import { agregarAlCarrito, initCarritoUI } from './carrito.js';

document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDestacados();
    initCarritoUI();
});

async function cargarProductosDestacados() {
    try {
        const respuesta = await fetch('data/productos.json');
        if (!respuesta.ok) throw new Error('Error al cargar JSON local');

        const productos = await respuesta.json();

        const destacados = productos.filter(p => p.destacado === true);
        const productosAMostrar = destacados.length > 0 ? destacados.slice(0, 3) : productos.slice(0, 3);

        const contenedor = document.getElementById('contenedor-productos');
        
        if (!contenedor) return; 

        productosAMostrar.forEach(producto => {
            const precioFormateado = new Intl.NumberFormat('es-AR').format(producto.precio);
            const li = document.createElement('li');
            li.classList.add('producto-card');
            
            const descripcion = producto.descripcion_corta || producto.descripcion || '';
            
            li.innerHTML = `
              <article>
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p class="descripcion-breve">${descripcion}</p>
                    <p class="precio">$ ${precioFormateado}</p>
                    <button class="btn-agregar" data-id="${producto.id}">AGREGAR AL CARRITO</button>
                </div>
              </article>
            `;
            contenedor.appendChild(li);
        });

    } catch (error) {
        console.error('Hubo un problema cargando los productos:', error);
    }
}


const grillaProductos = document.getElementById('contenedor-productos');
if (grillaProductos) {
    grillaProductos.addEventListener('click', (evento) => {
        if (evento.target.classList.contains('btn-agregar')) {
            const idProducto = evento.target.getAttribute('data-id');
            
            agregarAlCarrito(idProducto);
            
            // feedback visual al usuario
            const boton = evento.target;
            const textoOriginal = boton.textContent;
            boton.textContent = '¡AÑADIDO ✓!';
            boton.style.backgroundColor = '#2a1a11';
            
            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.style.backgroundColor = '';
            }, 1500);
        }
    });
}