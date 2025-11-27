import mongoose from "mongoose";

const Payment = mongoose.model(
  "Payment",
  new mongoose.Schema({
    amount: {
      type: Number,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    order: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Order",
    },
  })
);

export default Payment;
