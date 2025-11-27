import createPayment from "../services/payment/create-payment.js";
import catchAsync from "../utils/catchAsync.js";

export const create = catchAsync(async (req, res) => {
  const payment = await createPayment(req.query);
  res
    .status(200)
    .json({ success: true, message: "payment created", data: payment });
});
