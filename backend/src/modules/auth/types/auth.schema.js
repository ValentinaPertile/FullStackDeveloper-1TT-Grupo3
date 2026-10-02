import { z } from "zod";

export const authSchema = z.object({
  user: z.object({
    email: z.email("Formato de email inválido").nullable(),
    password: z
      .string()
      .minLength(4, "La contraseña debe tener al menos 4 caracteres").nullable(),
    dni: z.string().minLength(7, "El DNI debe tener al menos 7 caracteres"),
    phone: z.string(),
  }),
  token: z.string().nullable(),
});
