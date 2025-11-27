import createOrder from "../services/order/create-order.js";
import catchAsync from "../utils/catchAsync.js";

export const create = catchAsync(async (req, res) => {
  const data = await createOrder(req.body, req.user, req.params.productId);
  res.status(200).json({ success: true, message: "order created", data });
});
