import { useState } from "react";
import { validateContact } from "../validation/contact.validation";
import { sendContact } from "../services/contact.api";
import "../styles/Contact.css";

const initialForm = {
  nombre: "",
  email: "",
  mensaje: "",
};

const initialErrors = {
  nombre: "",
  email: "",
  mensaje: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [exito, setExito] = useState("");
  const [fallo, setFallo] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
    if (exito) setExito("");
    if (fallo) setFallo("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setExito("");
    setFallo("");

    const valores = {
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      mensaje: form.mensaje.trim(),
    };

    const { valid: esValido, errors: nextErrors } = validateContact(valores);

    setErrors(nextErrors);

    if (!esValido) return;

    setEnviando(true);

    try {
      await sendContact(valores);

      setExito(
        `¡Gracias por tu mensaje, ${valores.nombre}! Nos pondremos en contacto a la brevedad.`,
      );
      setForm(initialForm);
    } catch (error) {
      const mensajeServidor = error?.message;
      const esErrorDeRed =
        !mensajeServidor || mensajeServidor === "Error inesperado";

      setFallo(
        esErrorDeRed
          ? "No pudimos enviar tu mensaje. Por favor, intenta nuevamente más tarde."
          : mensajeServidor,
      );
    } finally {
      setEnviando(false);
    }
  };

  const campoClass = (nombre) => `campo ${errors[nombre] ? " invalido" : ""}`;

  return (
    <>
      <a className="skip-link" href="#form-contacto">
        Saltar al formulario de contacto
      </a>

      <section className="contacto-page">
        <div className="wrap">
          <header className="contacto-intro">
            <p className="eyebrow">Taller &amp; Consultas</p>
            <h1 className="section-title">Hablemos de tu próximo espacio</h1>
            <p className="contacto-intro__lead">
              ¿Tenés un proyecto especial en mente, dudas sobre nuestras piezas
              o te gustaría coordinar una visita a nuestra Casa Taller? Dejanos
              tu mensaje y te responderemos a la brevedad.
            </p>
          </header>

          <div className="contacto-layout">
            {/* Formulario */}
            <section className="contacto-card" aria-labelledby="form-titulo">
              <h2 id="form-titulo" className="sr-only">
                Formulario de consulta
              </h2>

              <form id="form-contacto" noValidate onSubmit={handleSubmit}>
                <div className={campoClass("nombre")}>
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu nombre completo"
                    autoComplete="name"
                    value={form.nombre}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.nombre)}
                    aria-describedby="error-nombre"
                  />
                  <span className="error" id="error-nombre">
                    {errors.nombre}
                  </span>
                </div>

                <div className={campoClass("email")}>
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tuemail@ejemplo.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby="error-email"
                  />
                  <span className="error" id="error-email">
                    {errors.email}
                  </span>
                </div>

                <div className={campoClass("mensaje")}>
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="5"
                    placeholder="Escribí tu consulta, requerimientos o medidas..."
                    value={form.mensaje}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.mensaje)}
                    aria-describedby="error-mensaje"
                  />
                  <span className="error" id="error-mensaje">
                    {errors.mensaje}
                  </span>
                </div>

                <button
                  type="submit"
                  id="btn-enviar"
                  className="btn btn--primary btn--submit"
                  disabled={enviando}
                >
                  {enviando ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>

              <div
                id="mensaje-exito"
                className={`mensaje-exito${exito ? " visible" : ""}`}
                role="status"
                aria-live="polite"
              >
                {exito}
              </div>

              <div
                id="mensaje-error"
                className={`mensaje-error${fallo ? " visible" : ""}`}
                role="alert"
              >
                {fallo}
              </div>
            </section>

            {/* Información adicional */}
            <aside className="contacto-info">
              <div className="contacto-info__item">
                <h3 className="contacto-info__title">Casa Taller</h3>
                <address>
                  Av. San Juan 2847, San Cristóbal
                  <br />
                  C1232AAB — Buenos Aires, Argentina
                </address>
                <p>
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
                    <a href="https://wa.me/5491145678900">+54 11 4567-8900</a>
                  </li>
                  <li>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@hermanosjota.com.ar">
                      info@hermanosjota.com.ar
                    </a>
                  </li>
                  <li>
                    <strong>Instagram:</strong>{" "}
                    <a href="https://instagram.com/hermanosjota_ba">
                      @hermanosjota_ba
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
