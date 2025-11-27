import Product from "../../database/models/product.js";

export default async function getProduct(id) {
  const product = await Product.findById(id);
  return product;
}
