const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/authorizationMiddleware");

const router = express.Router();

const {
  getProfiles,
  getProducts,
  getCategories,
  getSubCategories,
  getStores,
  getOrders,
  getReviews
} = require("../controllers/adminController");

// Apply both middlewares to all routes
router.get("/profiles", authMiddleware, adminMiddleware, getProfiles);
router.get("/products", authMiddleware, adminMiddleware, getProducts);
router.get("/categories", authMiddleware, adminMiddleware, getCategories);
router.get("/subcategories", authMiddleware, adminMiddleware, getSubCategories);
router.get("/stores", authMiddleware, adminMiddleware, getStores);
router.get("/orders", authMiddleware, adminMiddleware, getOrders);
router.get("/reviews", authMiddleware, adminMiddleware, getReviews);

module.exports = router;
