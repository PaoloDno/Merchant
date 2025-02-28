const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  console.log("Auth Middleware Triggered");

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("No valid Authorization header");
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    const token = authHeader.split(' ')[1]; // Extract token
    const decoded = jwt.verify(token, SECRET_KEY);

    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("User not found in database");
      return res.status(404).json({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: "Token expired. Please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ success: false, message: "Invalid token. Access denied." });
    } else {
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  }
};

module.exports = authMiddleware;
