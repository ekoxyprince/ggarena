import Product from "../../database/models/product.js";

export default async function updateProduct(id, update) {
  await Product.findByIdAndUpdate(id, update);
}
