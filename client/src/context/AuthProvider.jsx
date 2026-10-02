import { createContext, useState, useEffect, useCallback } from "react";
import { getMe, logout as apiLogout } from "../services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Sincronizar estado con backend si hay sesión activa
  const checkAuth = useCallback(async () => {
    try {
      const response = await getMe();
      if (response && response.data) {
        setUser(response.data);
        localStorage.setItem("auth_user", JSON.stringify(response.data));
      }
    } catch (err) {
      // Si la cookie expiró o no es válida, limpiar usuario local
      if (err?.status === 401 || err?.status === 403) {
        setUser(null);
        localStorage.removeItem("auth_user");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Escuchar mensajes de login con OAuth (Google popup)
  useEffect(() => {
    const handleOAuthMessage = (event) => {
      if (event.data?.type === "OAUTH_SUCCESS") {
        checkAuth();
      }
    };
    window.addEventListener("message", handleOAuthMessage);
    return () => window.removeEventListener("message", handleOAuthMessage);
  }, [checkAuth]);

  const loginUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("auth_user", JSON.stringify(userData));
    }
  };

  const logoutUser = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("Error al cerrar sesión en el servidor:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("auth_user");
    }
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login: loginUser,
    logout: logoutUser,
    refreshUser: checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};