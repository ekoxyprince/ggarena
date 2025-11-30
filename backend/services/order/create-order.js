import createPayment from "../payment/create-payment.js";
import startPayment from "../payment/start-payment.js";
import Order from "../../database/models/order.js";
import Product from "../../database/models/product.js";
import { BadrequestError } from "../../http/exceptions/error.js";
import defaultMailOptions from "../../utils/mail/default-mailoption.js";
import orderMailOptions from "../../utils/mail/order-mailoption.js";

export default async function createOrder(body, user, productId) {
  const product = await Product.findById(productId).populate("community");
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
  orderMailOptions(user.fullname, user.email, "Order Created", {
    orderId: newOrder._id,
    productName: product.name,
    quantity: body.quantity,
    amount: body.amount,
  });
  defaultMailOptions(
    undefined,
    undefined,
    "New Order",
    `${user.fullname} has placed an order of ID ${newOrder._id} for ${body.quantity} Product: ${product.name} belonging to community ${product.community.name}`
  );
  return resp;
}
