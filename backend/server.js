import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "./models/Product.js";
import Cart from "./models/Cart.js";
import authRoutes, { verifyAdmin } from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);

// ================== DATABASE ==================
mongoose
  .connect("mongodb://127.0.0.1:27017/crochetshop")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ================== ORDER MODEL ==================
const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  subtotal: Number,
  shipping: Number,
  tax: Number,
  discount: Number,
  total: Number,
  paymentMethod: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// ================== ROOT ==================
app.get("/", (req, res) => {
  res.send("Miyume Crochet Backend 🧶");
});

// ================== PRODUCTS ==================

// ✅ Search + Fetch Products
app.get("/api/products", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) query = { name: { $regex: search, $options: "i" } };

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add Product (admin only)
app.post("/api/products", verifyAdmin, async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================== CART ==================
app.get("/api/cart/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    if (!cart) return res.json({ userId: req.params.userId, items: [] });
    res.json(cart);
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/cart/:userId", async (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) cart = new Cart({ userId: req.params.userId, items: [] });

    const itemIndex = cart.items.findIndex((i) => i.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ productId, name, price, quantity: quantity || 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/cart/:userId/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find((i) => i.productId.toString() === req.params.productId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.productId.toString() !== req.params.productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("❌ Error updating cart:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/cart/:userId/:productId", async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId.toString() !== req.params.productId);
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error("❌ Error removing item:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================== CHECKOUT ==================
app.post("/api/checkout/:userId", async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const shipping = subtotal > 2000 ? 0 : 200;
    const tax = subtotal * 0.05;
    const discount = subtotal > 5000 ? 500 : 0;
    const total = subtotal + shipping + tax - discount;

    const newOrder = new Order({
      userId: req.params.userId,
      items: cart.items,
      subtotal,
      shipping,
      tax,
      discount,
      total,
      paymentMethod,
      status: paymentMethod === "cod" ? "Pending (COD)" : "Awaiting Payment",
    });
    await newOrder.save();

    cart.items = [];
    await cart.save();

    if (paymentMethod === "cod") {
      return res.json({
        provider: "Cash on Delivery",
        amount: total,
        message: "Order placed successfully. Pay on delivery.",
      });
    }

    if (paymentMethod === "easypaisa") {
      return res.json({
        provider: "Easypaisa",
        amount: total,
        redirectURL: "https://easypay.telenor.com.pk/test-checkout",
        message: "Redirect user to Easypaisa payment page",
      });
    }

    if (paymentMethod === "jazzcash") {
      return res.json({
        provider: "JazzCash",
        amount: total,
        redirectURL: "https://sandbox.jazzcash.com.pk/checkout",
        message: "Redirect user to JazzCash payment page",
      });
    }

    res.status(400).json({ error: "Invalid payment method" });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================== PAYMENT CALLBACKS ==================
app.post("/api/payment/callback/easypaisa", async (req, res) => {
  console.log("📩 Easypaisa callback:", req.body);
  res.sendStatus(200);
});

app.post("/api/payment/callback/jazzcash", async (req, res) => {
  console.log("📩 JazzCash callback:", req.body);
  res.sendStatus(200);
});

// ================== SERVER ==================
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

