import { z } from "zod";

// Acepta ObjectId o el nombre de la categoría ("Living"); el service resuelve
const categoryRef = z
  .string()
  .trim()
  .min(1, "La categoría es obligatoria");

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  description: z.string().trim().min(1, "La descripción es obligatoria"),
  longDescription: z.string().trim().optional(),
  price: z.coerce.number().min(0, "El precio no puede ser negativo"),
  category: categoryRef,
  specs: z.array(z.any()).optional(),
  stock: z.coerce.number().int().min(0).optional(),
  image_url: z.string().trim().min(1, "La imagen es obligatoria"),
  destacado: z.boolean().optional(),
  active: z.boolean().optional(),
  slug: z.string().trim().optional(),
});

export const updateProductSchema = createProductSchema.partial();
