import mongoose from "mongoose";

import Order from "../../../core/models/Order.js";
import Product from "../../../core/models/Product.js";
import { ErrorResponse } from "../../../core/errors/error-handler.js";

export class OrderService {
  /**
   * Arma los ítems de la orden con los precios de la base de datos.
   * Del cliente solo se toma qué producto y cuántas unidades: el precio y el
   * total nunca se confían, porque se pueden modificar desde el navegador.
   */
  async buildItems(cartItems) {
    const requested = cartItems.map((item) => ({
      id: String(item._id || item.id || "").trim(),
      quantity: Number(item.cantidad ?? item.quantity ?? 1),
    }));

    for (const { id, quantity } of requested) {
      if (!id) throw new ErrorResponse("Hay un producto sin identificador", 400);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        throw new ErrorResponse("Cantidad inválida (debe ser entre 1 y 99)", 400);
      }
    }

    const ids = requested.map((r) => r.id);
    const objectIds = ids.filter((id) => mongoose.isValidObjectId(id));

    const products = await Product.find({
      $or: [{ slug: { $in: ids.map((id) => id.toLowerCase()) } }, { _id: { $in: objectIds } }],
    }).lean();

    const findProduct = (id) =>
      products.find((p) => p.slug === id.toLowerCase() || p._id.toString() === id);

    const items = requested.map(({ id, quantity }) => {
      const product = findProduct(id);
      if (!product || product.active === false) {
        throw new ErrorResponse(`El producto "${id}" no existe o no está disponible`, 400);
      }
      return {
        product: product._id,
        name: product.name,
        image_url: product.image_url,
        quantity,
        unit_price: Number(product.price),
      };
    });

    const total_amount = items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);

    return { items, total_amount };
  }

  async create(orderData) {
    const { items, total_amount } = await this.buildItems(orderData.items);
    return await Order.create({ ...orderData, items, total_amount });
  }

  async getAll(filter = {}) {
    return await Order.find(filter).sort({ createdAt: -1 }).lean();
  }

  async getById(id) {
    return await Order.findById(id).lean();
  }
}
