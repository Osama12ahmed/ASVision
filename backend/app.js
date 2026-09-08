const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

module.exports = app;
