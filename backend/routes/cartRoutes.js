const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

router.get("/", authMiddleware, getCart);
router.put("/add", authMiddleware, addToCart);
router.put("/updt", authMiddleware, updateCartItem);
router.put("/remove", authMiddleware, removeFromCart);
router.put("/clr", authMiddleware, clearCart);


module.exports = router;