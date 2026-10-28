import { createContext, useState, useEffect } from "react";
import {
  getMe,
  login as authLogin,
  logout as apiLogout,
} from "../services/auth.api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // /auth/me responde { success, data: user }
        const response = await getMe();
        setUser(response?.data || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Devuelve el usuario de la sesión, o null si la cookie no quedó guardada
  const login = async (email, password) => {
    const response = await authLogin(email, password);

    if (response.success) {
      return await refreshUser();
    }

    return null;
  };

  const logout = async () => {
    try {
      const response = await apiLogout();

      if (!response.success) {
        throw new Error(response.error);
      }

      setUser(null);
    } catch (err) {
      console.warn("Error al cerrar sesión en el servidor:", err);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await getMe();
      const sessionUser = response?.data || null;
      setUser(sessionUser);
      return sessionUser;
    } catch {
      setUser(null);
      return null;
    }
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
