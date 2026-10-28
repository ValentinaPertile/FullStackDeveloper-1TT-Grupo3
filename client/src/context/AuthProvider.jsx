import { createContext, useState, useEffect, useCallback } from "react";
import { getMe, logout as apiLogout } from "../services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener usuario autenticado desde el backend validando la cookie de sesión (accessToken)
  const checkAuth = useCallback(async () => {
    try {
      const response = await getMe();
      if (response && response.data) {
        setUser(response.data);
        return response.data;
      }
      setUser(null);
      return null;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    getMe()
      .then((response) => {
        if (active && response?.data) {
          setUser(response.data);
        } else if (active) {
          setUser(null);
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

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

  const loginUser = async (userData) => {
    if (userData) {
      setUser(userData);
    }
    return await checkAuth();
  };

  const logoutUser = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.warn("Error al cerrar sesión en el servidor:", err);
    } finally {
      setUser(null);
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
