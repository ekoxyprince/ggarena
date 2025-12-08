import Product from "../../database/models/product.js";
import cloudinary from "../../storage/cloudinary.js";
import Community from "../../database/models/community.js";
import { BadrequestError } from "../../http/exceptions/error.js";

export default async function createProduct(body, file) {
  const community = await Community.findById(body.community);
  if (!community.isVerified) {
    throw new BadrequestError(
      "community not verified. please contact GG Arena ESPORTS to verify your community."
    );
  }
  const image = (await cloudinary.uploadSingleImageToCloudinary(file))
    .secure_url;
  const newProduct = await Product.create({ ...body, image });
  return newProduct;
}
