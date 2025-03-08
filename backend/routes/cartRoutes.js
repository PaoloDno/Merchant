const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

route.get("/", authMiddleware, getCart);
route.put("/add", authMiddleware, addToCart);
route.put("/updt", authMiddleware, updateCartItem);
route.put("/remove", authMiddleware, removeFromCart);
route.put("/clr", authMiddleware, clearCart);
