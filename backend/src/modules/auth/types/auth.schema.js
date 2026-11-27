import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Formato de email inválido"),
  password: z.string().min(1, "La contraseña es requerida").max(128),
});

export const registerSchema = z.object({
  user: z.object({
    email: z.email("Formato de email inválido").nullable(),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(128, "La contraseña no puede superar los 128 caracteres")
      .nullable(),
    dni: z.string().min(7, "El DNI debe tener al menos 7 caracteres"),
    phone: z.string(),
  }),
  token: z.string().nullable(),
});
