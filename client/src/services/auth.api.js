import { interceptor } from "../api/interceptor/axios-interceptor";

export const getMe = async () => {
  return await interceptor.get("/auth/me");
};

export const login = async (email, password) => {
  return await interceptor.post("/auth/login", { email, password });
};

export const register = async (email, password, dni) => {
  return await interceptor.post("/auth/register", { email, password, dni });
};

export const OAuth = async (provider) => {
  switch (provider) {
    case "google":
      return interceptor.defaults.baseURL + "/auth/google";
    default:
      throw new Error("No se encontro el provider");
  }
};
