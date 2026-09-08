const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/email");

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// 1. التسجيل وإرسال OTP للإيميل
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email already registered" });
    }

    // إنشاء كود OTP عشوائي من 6 أرقام
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // صالح لمدة 10 دقائق

    // لو الإيميل يطابق إيميل الأدمن المسجل في .env يأخذ رتبة admin تلقائياً
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    const newUser = await User.create({
      name,
      email,
      password,
      role,
      otpCode: otp,
      otpExpires,
      isVerified: false,
    });

    // قالب الإيميل الشيك
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #ff6600; text-align: center;">AS Vision - Admin Verification</h2>
        <p>مرحباً <strong>${newUser.name}</strong>،</p>
        <p>لقد قمت بطلب تسجيل حساب كمسؤول في منصة AS Vision. استخدم كود التحقق التالي لتأكيد حسابك:</p>
        <div style="background-color: #f4f4f4; text-align: center; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; margin: 20px 0;">
          ${otp}
        </div>
        <p style="color: #777;">هذا الكود صالح لمدة 10 دقائق فقط.</p>
      </div>
    `;

    await sendEmail({
      email: newUser.email,
      subject: "رمز التحقق الخاص بحسابك - AS Vision",
      html: emailHtml,
    });

    res.status(200).json({
      status: "success",
      message:
        "OTP has been sent to your email! Please verify to activate your account.",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 2. التحقق من الـ OTP وتفعيل الحساب
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      otpCode: otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or expired OTP code!",
      });
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id, user.role);

    res.status(200).json({
      status: "success",
      message: "Account verified successfully!",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// 3. تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "Please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json({ status: "fail", message: "Incorrect email or password" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        status: "fail",
        message: "Please verify your email first before logging in!",
      });
    }

    const token = signToken(user._id, user.role);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
