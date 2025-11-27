import Product from "../../database/models/product.js";

export default async function communityProduct(communityId) {
  const communityProducts = await Product.find({
    community: communityId,
  }).populate("community");
  return communityProducts;
}
