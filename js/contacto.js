document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const formContacto = document.getElementById('form-contacto');
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const textareaMensaje = document.getElementById('mensaje');
    const mensajeExito = document.getElementById('mensaje-exito');

    const errorNombre = document.getElementById('error-nombre');
    const errorEmail = document.getElementById('error-email');
    const errorMensaje = document.getElementById('error-mensaje');

    // Funciones para mostrar y limpiar errores
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

    // Validación de formato de email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Manejo del envío del formulario
    formContacto.addEventListener('submit', (event) => {
        event.preventDefault();

        mensajeExito.textContent = '';
        mensajeExito.classList.remove('visible');
        limpiarTodosLosErrores();

        const valorNombre = inputNombre.value.trim();
        const valorEmail = inputEmail.value.trim();
        const valorMensaje = textareaMensaje.value.trim();

        let esValido = true;

        if (valorNombre === '') {
            mostrarError(inputNombre, errorNombre, 'Por favor, ingresá tu nombre.');
            esValido = false;
        } else if (valorNombre.length < 3) {
            mostrarError(inputNombre, errorNombre, 'El nombre debe tener al menos 3 caracteres.');
            esValido = false;
        }

        if (valorEmail === '') {
            mostrarError(inputEmail, errorEmail, 'Por favor, ingresá tu email.');
            esValido = false;
        } else if (!validarEmail(valorEmail)) {
            mostrarError(inputEmail, errorEmail, 'Ingresá un formato de email válido (ej: nombre@correo.com).');
            esValido = false;
        }

        if (valorMensaje === '') {
            mostrarError(textareaMensaje, errorMensaje, 'Por favor, escribí tu mensaje.');
            esValido = false;
        } else if (valorMensaje.length < 10) {
            mostrarError(textareaMensaje, errorMensaje, 'El mensaje debe tener al menos 10 caracteres.');
            esValido = false;
        }

        if (esValido) {
            mensajeExito.textContent = `¡Gracias por tu mensaje, ${valorNombre}! Nos pondremos en contacto a la brevedad.`;
            mensajeExito.classList.add('visible');
            formContacto.reset();
        }
    });

    // Limpieza de errores en tiempo real
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
