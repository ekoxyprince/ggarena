import mongoose from "mongoose";

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      community: {
        type: mongoose.Types.ObjectId,
        ref: "Community",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      features: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      stockCount: {
        type: Number,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default Product;
