const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/authorizationMiddleware');
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

router.get("/", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get a single product by ID

// Protected Routes (User Must Be Logged In)
router.post("/", authMiddleware, adminMiddleware, createProduct); // Admin Only: Create product
router.put("/:id", authMiddleware, adminMiddleware, updateProduct); // Admin Only: Update product
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct); // Admin Only: Delete product

module.exports = router;