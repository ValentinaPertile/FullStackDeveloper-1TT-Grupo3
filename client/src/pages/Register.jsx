import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTES } from "../routes/paths";

import { jwtDecode } from "jwt-decode";

import AuthSection from "../components/auth/AuthSection";

import auth_bg from "../assets/images/auth_bg.webp";

export default function Register() {
  const [params] = useSearchParams();

  const token = params.get("token");

  let decoded = null;

  if (token) {
    decoded = jwtDecode(token);
  }

  const [user, setUser] = useState({
    email: token ? decoded.email : "",
    password: "",
    confirmPassword: "",
    phone: "",
    dni: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(user);
  };

  return (
    <AuthSection>
      {/** Componente central */}
      <div className="relative w-full max-w-md rounded-2xl p-3 sm:p-6 shadow-2xl overflow-hidden">
        <img
          src={auth_bg}
          alt="Fondo de marco"
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        <section className="relative z-20 w-full bg-[var(--superficie)] rounded-xl p-6 sm:p-8 border border-black/10 flex flex-col justify-center">
          {/* Encabezado */}
          <div className="text-center mb-6">
            <h1 className="font-display font-bold text-3xl text-[var(--tinta)] tracking-tight">
              Registro
            </h1>
            <p className="font-inter text-xs sm:text-sm text-[var(--tinta-suave)] mt-1.5">
              Ingresa tus datos para registrarte
            </p>
          </div>

          {/* Inicios de sesión sociales */}
          <div className="grid grid-cols-1 gap-3 mb-5">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border border-stone-300 text-stone-700 font-medium text-xs hover:bg-stone-50 hover:border-stone-400 transition-all shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>

          {/* Divisor */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-stone-200" />
            <span className="absolute bg-[var(--superficie)] px-3 text-xs text-stone-400 font-medium lowercase">
              o
            </span>
          </div>

          {/* Formulario */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--tinta)] mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                readOnly={token}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="ejemplo@correo.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--siena)] focus:border-transparent transition-all"
              />
            </div>

            {!token && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-[var(--tinta)] mb-1.5">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--siena)] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--tinta)] mb-1.5">
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={user.confirmPassword}
                    onChange={(e) =>
                      setUser({ ...user, confirmPassword: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--siena)] focus:border-transparent transition-all"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-[var(--tinta)] mb-1.5">
                Teléfono
              </label>
              <input
                type="tel"
                required
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                placeholder="11-4567-8901"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--siena)] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--tinta)] mb-1.5">
                DNI
              </label>
              <input
                type="number"
                required
                value={user.dni}
                onChange={(e) => setUser({ ...user, dni: e.target.value })}
                placeholder="12345678"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[var(--siena)] focus:border-transparent transition-all"
              />
            </div>

            <div className="text-right">
              <a
                href="#"
                className="text-xs font-medium text-stone-600 hover:text-[var(--siena)] hover:underline transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[var(--tinta)] hover:bg-[var(--siena)] text-[var(--alabastro)] font-semibold rounded-lg text-sm transition-colors shadow-md cursor-pointer mt-2"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Llamado a Registro */}
          <p className="text-center text-xs text-stone-600 mt-5">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-bold text-[var(--tinta)] hover:text-[var(--siena)] hover:underline"
            >
              Inicia sesión
            </Link>
          </p>

          {/* Legales */}
          <p className="text-center text-[11px] text-stone-400 mt-4 leading-normal">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="hover:text-stone-600">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="hover:text-stone-600">
              Política de Privacidad
            </a>
            .
          </p>
        </section>
      </div>
    </AuthSection>
  );
}
