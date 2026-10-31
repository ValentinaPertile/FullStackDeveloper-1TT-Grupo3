import { connectDB } from "../core/database/database.js";
import Product from "../core/models/Product.js";
import Category from "../core/models/Category.js";
import { PRODUCTOS as productosData } from "../../data/productos.js";

const DESTACADOS = ["patagonia","copacabana","pampa"]

async function seedDatabase() {
  try {
    await connectDB();

    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoriasUnicas = [
      ...new Set(productosData.map((p) => p.category)),
    ].filter(Boolean);

    const categoryMap = {};
    for (const catName of categoriasUnicas) {
      const cat = await Category.create({ name: catName, products: [] });
      categoryMap[catName] = cat._id;
    }

    const productosParaInsertar = productosData.map((p) => {
      const categoryId = categoryMap[p.category];
      if (!categoryId) {
        throw new Error(`Categoría desconocida "${p.category}" en ${p._id}`);
      }

      return {
        slug: p._id,
        name: p.name,
        description: p.description,
        longDescription: p.longDescription,
        price: p.price,
        category: categoryId,
        specs: p.specs || [],
        stock: p.stock ?? 10,
        image_url: p.image_url,
        destacado: DESTACADOS.includes(p._id),
        active: true,
      };
    });

    const insertados = await Product.insertMany(productosParaInsertar);
    console.log(`Se insertaron con éxito ${insertados.length} productos.`);

    for (const prod of insertados) {
      await Category.findByIdAndUpdate(prod.category, {
        $push: { products: prod._id },
      });
    }

    console.log("¡Seeding completado con éxito!");
    process.exit(0);
  } catch (error) {
    console.error("Error durante el seeding:", error);
    process.exit(1);
  }
}

seedDatabase();
