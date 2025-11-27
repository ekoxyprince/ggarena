import createPayment from "../payment/create-payment.js";
import startPayment from "../payment/start-payment.js";
import Order from "../../database/models/order.js";
import Product from "../../database/models/product.js";
import { BadrequestError } from "../../http/exceptions/error.js";

export default async function createOrder(body, user, productId) {
  const product = await Product.findById(productId);
  if (body.quantity > product.stockCount) {
    throw new BadrequestError("out of stock");
  }
  const newOrder = await Order.create({
    quantity: body.quantity,
    totalAmount: body.amount,
    community: body.community,
    product: product._id,
  });
  const resp = await startPayment({
    amount: body.amount,
    email: user.email,
    fullname: user.fullname,
    userId: user._id,
    orderId: newOrder._id,
  });
  return resp;
}
