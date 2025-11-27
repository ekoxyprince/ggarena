import mongoose from "mongoose";

const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default: "pending",
      },
      payment: {
        type: mongoose.Types.ObjectId,
        ref: "Payment",
      },
      community: {
        type: mongoose.Types.ObjectId,
        ref: "Community",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Order;
