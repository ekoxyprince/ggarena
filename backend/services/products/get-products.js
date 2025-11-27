import Product from "../../database/models/product.js";

export default async function getProducts(limit = 10) {
  const products = await Product.find().limit(limit).populate("community");
  return products;
}
