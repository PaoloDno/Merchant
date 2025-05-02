const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const SECRET_KEY = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  console.log("Auth Middleware Triggered");

  try {
    console.log("abbc");
    const authHeader = req.headers.authorization;
    console.log("bccd");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Access denied. No token provided.");
      error.statusCode = 401;
      throw error;
    }
    console.log("authing");

    const token = authHeader.split(" ")[1]; // Extract token
    console.log("decoded: ", token);
    console.log("decoding...");
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded Token:", decoded);

    // Store decoded user data in req.user
    req.user = decoded;

    // Optional: Fetch user from DB if needed
    const user = await User.findById(decoded.userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }

    next();
  } catch (error) {
    console.error(" Token verification error:", error.message);

    if (error instanceof jwt.TokenExpiredError) {
      error.statusCodeCode = 401;
      error.message = "Token expired. Please log in again.";
    } else if (error instanceof jwt.JsonWebTokenError) {
      error.statusCodeCode = 401;
      error.message = "Invalid token. Access denied.";
    } else {
      error.statusCode = error.statusCode || 500;
      error.message = error.message || "Internal server error.";
    }
    console.log(error)
    next(error); // Pass error to global error handler middleware
  }
};

module.exports = authMiddleware;
