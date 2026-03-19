const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connect
mongoose.connect("mongodb+srv://admin-omkar:9028609403@cluster0.htlkaku.mongodb.net/foodies")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schemas
const User = mongoose.model("User", {
  email: String,
  password: String,
});

const Order = mongoose.model("Order", {
  email: String,
  items: Array,
  total: Number,
  date: { type: Date, default: Date.now }
});

// ================= ROUTES =================

// ✅ Register
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  await new User({ email, password: hashed }).save();

  res.json({ message: "Registered successfully" });
});

// ✅ Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Wrong password" });

  res.json({ message: "Login success", email });
});

// ✅ Place Order
app.post("/order", async (req, res) => {
  try {
    const { email, items, total } = req.body;

    if (!email || items.length === 0) {
      return res.status(400).json({ message: "Invalid order" });
    }

    const order = new Order({ email, items, total });
    await order.save();

    res.json({ message: "Order saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Orders
app.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
});

// ✅ Get Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// START SERVER
app.listen(5000, () => console.log("🚀 Server running on 5000"));