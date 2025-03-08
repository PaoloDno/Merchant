const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/authorizationMiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");

const {
  getHotProducts,
  searchProducts,
  getProductsByCategory,
  getNewProducts,
  getRandomProducts
} = require("../controllers/viewProductsController");

const router = express.Router();

router.get("/:id", getProductById); // Get a single product by ID

// Protected Routes (User Must Be Logged In)
router.post("/", authMiddleware, createProduct); // User create product
router.put("/:id", authMiddleware, updateProduct); // User update product
router.delete("/:id", authMiddleware, deleteProduct); // User delete product

//view products

router.get("/hot/", getHotProducts);
router.get("/searchQuery/:query", searchProducts);
router.get("/category/:id", getProductsByCategory);
router.get("/new/", getNewProducts);
router.get("/random/", getRandomProducts);

module.exports = router;
