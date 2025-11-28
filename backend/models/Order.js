const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number
    }
  ],
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  total: Number,
  paymentStatus: String,
  paymentMethod: String,
  shippingMethod: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);

