const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. التحقق من التوكن (Logged In)
exports.protect = async (req, res, next) => {
  try {
    let token;

    // استخراج التوكن من الـ Headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // التأكد من أن صاحب التوكن ما زال موجوداً في الداتابيز
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token no longer exists.",
      });
    }

    // تمرير المستخدم للـ Request القادم
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token!",
    });
  }
};

// 2. التحقق من صلاحية الأدمن (Restrict To Roles)
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };
};
