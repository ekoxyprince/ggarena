import env from "../config/env.js";
import createPayment from "../services/payment/create-payment.js";
import catchAsync from "../utils/catchAsync.js";

export const create = catchAsync(async (req, res) => {
  const payment = await createPayment(req.query);
  const directUrl = payment.status == "success" ? "/success" : "failure";
  res.redirect(env.origins[0] + directUrl);
});
