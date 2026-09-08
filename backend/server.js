require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// ربط الداتابيز
connectDB();

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
