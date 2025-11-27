import Product from "../../database/models/product.js";
import cloudinary from "../../storage/cloudinary.js";

export default async function createProduct(body, file) {
  const image = (await cloudinary.uploadSingleImageToCloudinary(file))
    .secure_url;
  const newProduct = await Product.create({ ...body, image });
  return newProduct;
}
