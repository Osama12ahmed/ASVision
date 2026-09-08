const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    soldCount: {
      type: String,
      default: "0 sold",
    },
    sizes: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
