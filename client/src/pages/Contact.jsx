import { useState, useEffect } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    document.title = "Contacto — Hermanos Jota";
  }, []);

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpieza de error en tiempo real
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccessMessage("");
    const newErrors = { nombre: "", email: "", mensaje: "" };
    let esValido = true;

    const valorNombre = formData.nombre.trim();
    const valorEmail = formData.email.trim();
    const valorMensaje = formData.mensaje.trim();

    if (valorNombre === "") {
      newErrors.nombre = "Por favor, ingresá tu nombre.";
      esValido = false;
    } else if (valorNombre.length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
      esValido = false;
    }

    if (valorEmail === "") {
      newErrors.email = "Por favor, ingresá tu email.";
      esValido = false;
    } else if (!validarEmail(valorEmail)) {
      newErrors.email = "Ingresá un formato de email válido (ej: nombre@correo.com).";
      esValido = false;
    }

    if (valorMensaje === "") {
      newErrors.mensaje = "Por favor, escribí tu mensaje.";
      esValido = false;
    } else if (valorMensaje.length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
      esValido = false;
    }

    setErrors(newErrors);

    if (esValido) {
      setSuccessMessage(
        `¡Gracias por tu mensaje, ${valorNombre}! Nos pondremos en contacto a la brevedad.`
      );
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
      });
    }
  };

  return (
    <main id="contacto" className="contacto-page">
      <div className="wrap">
        <header className="contacto-intro">
          <p className="eyebrow">Taller & Consultas</p>
          <h1 className="section-title">Hablemos de tu próximo espacio</h1>
          <p className="contacto-intro__lead">
            ¿Tenés un proyecto especial en mente, dudas sobre nuestras piezas o
            te gustaría coordinar una visita a nuestra Casa Taller? Dejanos tu
            mensaje y te responderemos a la brevedad.
          </p>
        </header>

        <div className="contacto-layout">
          {/* Formulario */}
          <section className="contacto-card" aria-labelledby="form-titulo">
            <h2 id="form-titulo" className="sr-only">
              Formulario de consulta
            </h2>

            <form id="form-contacto" onSubmit={handleSubmit} noValidate>
              <div className={`campo ${errors.nombre ? "invalido" : ""}`}>
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  autoComplete="name"
                />
                <span className="error" id="error-nombre">
                  {errors.nombre}
                </span>
              </div>

              <div className={`campo ${errors.email ? "invalido" : ""}`}>
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tuemail@ejemplo.com"
                  autoComplete="email"
                />
                <span className="error" id="error-email">
                  {errors.email}
                </span>
              </div>

              <div className={`campo ${errors.mensaje ? "invalido" : ""}`}>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="5"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Escribí tu consulta, requerimientos o medidas..."
                ></textarea>
                <span className="error" id="error-mensaje">
                  {errors.mensaje}
                </span>
              </div>

              <button
                type="submit"
                id="btn-enviar"
                className="btn btn--primary btn--submit"
              >
                Enviar Mensaje
              </button>
            </form>

            {successMessage && (
              <div
                id="mensaje-exito"
                className="mensaje-exito visible"
                role="status"
                aria-live="polite"
              >
                {successMessage}
              </div>
            )}
          </section>

          {/* Información adicional */}
          <aside className="contacto-info">
            <div className="contacto-info__item">
              <h3 className="contacto-info__title">Casa Taller</h3>
              <address>
                Av. San Juan 2847, San Cristóbal<br />
                C1232AAB — Buenos Aires, Argentina
              </address>
              <p className="mt-2">
                Atención con cita previa para asesoramiento personalizado.
              </p>
            </div>

            <div className="contacto-info__item">
              <h3 className="contacto-info__title">Horarios de Atención</h3>
              <p>Lunes a Viernes: 10:00 – 19:00 hs</p>
              <p>Sábados: 10:00 – 14:00 hs</p>
            </div>

            <div className="contacto-info__item">
              <h3 className="contacto-info__title">Canales Directos</h3>
              <ul className="contacto-info__list">
                <li>
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href="https://wa.me/5491145678900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +54 11 4567-8900
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@hermanosjota.com.ar">
                    info@hermanosjota.com.ar
                  </a>
                </li>
                <li>
                  <strong>Instagram:</strong>{" "}
                  <a
                    href="https://instagram.com/hermanosjota_ba"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @hermanosjota_ba
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
