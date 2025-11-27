import { BadrequestError } from "../../http/exceptions/error.js";
import axios from "axios";
import Payment from "../../database/models/payment.js";
import _ from "lodash";
import { paystack } from "../../utils/paystack.js";
const { verifyPayment } = paystack(axios);
import Order from "../../database/models/order.js";
import Product from "../../database/models/product.js";

export default function (req) {
  const ref = req.reference;
  if (!ref) {
    throw new BadrequestError("No reference passed in query!");
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await verifyPayment(ref);
      const { reference, amount, status } = response.data.data;
      const { email } = response.data.data.customer;
      const { full_name, userId, orderId } = response.data.data.metadata;
      const newPayment = {
        reference,
        amount: amount / 100,
        email,
        fullname: full_name,
        status,
        userId,
        order: orderId,
      };
      const existingPayment = await Payment.findOne({
        where: { reference: reference },
      });
      let payment;
      let stat = "not set";
      if (existingPayment) {
        stat = existingPayment.status;
        existingPayment.status = status;
        payment = await existingPayment.save();
      } else {
        payment = await Payment.create(newPayment);
      }
      const order = await Order.findById(orderId);
      order.payment = payment._id;
      if (payment.status == "success") {
        const product = await Product.findById(order.product);
        product.stockCount -= Number(Number(amount / 100) / product.price);
        await product.save();
      }
      await order.save();
      return resolve(stat == newPayment.status ? null : payment);
    } catch (error) {
      error.source = "Create Payment Service";
      return reject(error);
    }
  });
}
