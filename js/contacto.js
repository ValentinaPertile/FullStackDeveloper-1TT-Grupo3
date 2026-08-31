// ==========================================================================
// LÓGICA DE CONTACTO Y VALIDACIÓN - MUEBLERÍA HERMANOS JOTA
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener referencias a los elementos del DOM
    const formContacto = document.getElementById('form-contacto');
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const textareaMensaje = document.getElementById('mensaje');
    const mensajeExito = document.getElementById('mensaje-exito');

    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorMensaje = document.getElementById('error-mensaje');

    const cartCount = document.getElementById('cart-count');

    // 2. Inicializar contador del carrito desde localStorage (si existe)
    actualizarCarritoHeader();

    function actualizarCarritoHeader() {
        if (!cartCount) return;
        try {
            const carrito = JSON.parse(localStorage.getItem('cartItems') || '[]');
            const total = Array.isArray(carrito)
                ? carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0)
                : 0;
            cartCount.textContent = total;
        } catch {
            cartCount.textContent = '0';
        }
    }

    // 3. Funciones auxiliares para mostrar y limpiar errores en el DOM
    function mostrarError(input, spanError, mensaje) {
        const campo = input.parentElement;
        campo.classList.add('invalido');
        spanError.textContent = mensaje;
    }

    function limpiarError(input, spanError) {
        const campo = input.parentElement;
        campo.classList.remove('invalido');
        spanError.textContent = '';
    }

    function limpiarTodosLosErrores() {
        limpiarError(inputNombre, errorNombre);
        limpiarError(inputEmail, errorEmail);
        limpiarError(textareaMensaje, errorMensaje);
    }

    // 4. Funciones de validación
    function validarEmail(email) {
        // Expresión regular para validar formato usuario@dominio.extension
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // 5. Manejar el evento submit del formulario
    formContacto.addEventListener('submit', (event) => {
        // Evitamos que la página se recargue
        event.preventDefault();

        // Ocultamos mensaje de éxito previo y limpiamos errores
        mensajeExito.textContent = '';
        mensajeExito.classList.remove('visible');
        limpiarTodosLosErrores();

        // Obtenemos los valores ingresados (quitando espacios extra)
        const valorNombre = inputNombre.value.trim();
        const valorEmail = inputEmail.value.trim();
        const valorMensaje = textareaMensaje.value.trim();

        let esValido = true;

        // Validación de Nombre
        if (valorNombre === '') {
            mostrarError(inputNombre, errorNombre, 'Por favor, ingresá tu nombre.');
            esValido = false;
        } else if (valorNombre.length < 3) {
            mostrarError(inputNombre, errorNombre, 'El nombre debe tener al menos 3 caracteres.');
            esValido = false;
        }

        // Validación de Email
        if (valorEmail === '') {
            mostrarError(inputEmail, errorEmail, 'Por favor, ingresá tu email.');
            esValido = false;
        } else if (!validarEmail(valorEmail)) {
            mostrarError(inputEmail, errorEmail, 'Ingresá un formato de email válido (ej: nombre@correo.com).');
            esValido = false;
        }

        // Validación de Mensaje
        if (valorMensaje === '') {
            mostrarError(textareaMensaje, errorMensaje, 'Por favor, escribí tu mensaje.');
            esValido = false;
        } else if (valorMensaje.length < 10) {
            mostrarError(textareaMensaje, errorMensaje, 'El mensaje debe tener al menos 10 caracteres.');
            esValido = false;
        }

        // Si todos los campos son válidos:
        if (esValido) {
            // Renderizamos mensaje de éxito dinámico en el DOM
            mensajeExito.textContent = `¡Gracias por tu mensaje, ${valorNombre}! Nos pondremos en contacto a la brevedad.`;
            mensajeExito.classList.add('visible');

            // Limpiamos los campos del formulario
            formContacto.reset();
        }
    });

    // 6. Limpieza de errores en tiempo real al escribir
    inputNombre.addEventListener('input', () => {
        if (inputNombre.parentElement.classList.contains('invalido')) {
            limpiarError(inputNombre, errorNombre);
        }
    });

    inputEmail.addEventListener('input', () => {
        if (inputEmail.parentElement.classList.contains('invalido')) {
            limpiarError(inputEmail, errorEmail);
        }
    });

    textareaMensaje.addEventListener('input', () => {
        if (textareaMensaje.parentElement.classList.contains('invalido')) {
            limpiarError(textareaMensaje, errorMensaje);
        }
    });
});
