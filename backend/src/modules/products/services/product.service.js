import Product from "../../../core/models/Product.js";
import Category from "../../../core/models/Category.js";
import { ErrorResponse } from "../../../core/errors/error-handler.js";

// Normaliza el documento para el frontend (Decimal128 -> number, slug como id público)
const toDTO = (product) => ({
  ...product,
  _id: product.slug || product._id,
  id: product.slug || product._id,
  price: Number(product.price) || 0,
  category: product.category?.name ?? product.category,
  categoryId: product.category?._id ?? product.category,
});

const slugify = (text) =>
  String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export class ProductService {
  async getAll({ category } = {}) {
    const products = await Product.find({ active: true })
      .populate("category", "name")
      .lean();

    const result = products.map(toDTO);
    if (!category) return result;

    const needle = String(category).trim().toLowerCase();
    return result.filter(
      (p) => String(p.category ?? "").toLowerCase() === needle,
    );
  }

  async getByIdentifier(identifier) {
    const value = String(identifier ?? "").trim();
    if (!value) return null;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(value);
    const query = isObjectId
      ? { $or: [{ slug: value.toLowerCase() }, { _id: value }] }
      : { slug: value.toLowerCase() };

    const product = await Product.findOne(query)
      .populate("category", "name")
      .lean();

    return product ? toDTO(product) : null;
  }

  // Documento Mongoose (sin lean) para escribir
  async findDoc(identifier) {
    const value = String(identifier ?? "").trim();
    if (!value) return null;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(value);
    const query = isObjectId
      ? { $or: [{ slug: value.toLowerCase() }, { _id: value }] }
      : { slug: value.toLowerCase() };

    return Product.findOne(query);
  }

  async #resolveCategoryId(value) {
    const raw = String(value ?? "").trim();
    if (!raw) throw new ErrorResponse("La categoría es obligatoria", 400);

    if (/^[0-9a-fA-F]{24}$/.test(raw)) {
      const byId = await Category.findById(raw).lean();
      if (byId) return byId._id;
    }

    const categories = await Category.find().lean();
    const byName = categories.find(
      (c) => c.name.toLowerCase() === raw.toLowerCase(),
    );

    if (!byName) {
      throw new ErrorResponse(`La categoría "${raw}" no existe`, 400);
    }

    return byName._id;
  }

  async #uniqueSlug(name) {
    const root = slugify(name) || `producto-${Date.now()}`;
    let slug = root;
    let suffix = 2;

    while (await Product.exists({ slug })) {
      slug = `${root}-${suffix++}`;
    }

    return slug;
  }

  async create(data) {
    const categoryId = await this.#resolveCategoryId(data.category);

    const payload = {
      ...data,
      category: categoryId,
      slug: data.slug ? slugify(data.slug) : await this.#uniqueSlug(data.name),
    };

    try {
      const doc = await Product.create(payload);

      await Category.findByIdAndUpdate(categoryId, {
        $push: { products: doc._id },
      });

      return this.getByIdentifier(doc.slug || doc._id.toString());
    } catch (error) {
      if (error.code === 11000) {
        throw new ErrorResponse("Ya existe un producto con ese slug", 409);
      }
      throw error;
    }
  }

  async update(identifier, data) {
    const doc = await this.findDoc(identifier);
    if (!doc) return null;

    if (data.category !== undefined) {
      const categoryId = await this.#resolveCategoryId(data.category);

      if (categoryId.toString() !== doc.category.toString()) {
        await Category.findByIdAndUpdate(doc.category, {
          $pull: { products: doc._id },
        });
        await Category.findByIdAndUpdate(categoryId, {
          $push: { products: doc._id },
        });
      }

      data.category = categoryId;
    }

    if (data.slug !== undefined) {
      data.slug = slugify(data.slug);
    }

    Object.assign(doc, data);

    try {
      await doc.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ErrorResponse("Ya existe un producto con ese slug", 409);
      }
      throw error;
    }

    return this.getByIdentifier(doc.slug || doc._id.toString());
  }

  async remove(identifier) {
    const doc = await this.findDoc(identifier);
    if (!doc) return null;

    await Category.findByIdAndUpdate(doc.category, {
      $pull: { products: doc._id },
    });

    await doc.deleteOne();

    return true;
  }
}
