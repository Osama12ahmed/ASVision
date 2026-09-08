const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

// مفتوحة للكل (Public)
router.get("/", productController.getAllProducts);

// محمية للأدمن فقط (Protected)
router.post("/", protect, restrictTo("admin"), productController.createProduct);

module.exports = router;
