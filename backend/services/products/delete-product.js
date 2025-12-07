import Product from "../../database/models/product.js";

export default async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}
