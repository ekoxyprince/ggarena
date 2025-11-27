import createProduct from "../services/products/create-product.js";
import getProduct from "../services/products/get-product.js";
import communityProducts from "../services/products/community-products.js";
import updateProduct from "../services/products/update-product.js";
import getProducts from "../services/products/get-products.js";
import catchAsync from "../utils/catchAsync.js";

export const create = catchAsync(async (req, res) => {
  req.body.community = req.params.communityId;
  await createProduct(req.body, req.file);
  res.status(200).json({ success: true, message: "Product created" });
});
export const getByCommunity = catchAsync(async (req, res) => {
  const products = await communityProducts(req.params.communityId);
  res
    .status(200)
    .json({ success: true, message: "Products retrieved", data: products });
});
export const getAll = catchAsync(async (req, res) => {
  const products = await getProducts();
  res
    .status(200)
    .json({ success: true, message: "Products retrieved", data: products });
});
export const get = catchAsync(async (req, res) => {
  const product = await getProduct(req.params.productId);
  res.status(200).json({
    success: true,
    message: "Product retrieved",
    data: product,
  });
});

export const update = catchAsync(async (req, res) => {
  await updateProduct(req.params.productId, req.body);
  res.status(200).json({ success: true, message: "Product updated" });
});
