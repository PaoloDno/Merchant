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

const {
  createReview,
  deleteReview,
  getReviewProduct,
  getReviewUser,
} = require('../controllers/reviewController');

const router = express.Router();


//view products

router.get("/hot", getHotProducts); // Get hot products
router.get("/category/:categoryId", getProductsByCategory); // Get products by category
router.get("/new", getNewProducts); // Get new products
router.get("/random", getRandomProducts); // Get random products
router.get("/search/:query", searchProducts); // Search products


router.post("/review", authMiddleware, createReview);
router.delete("/review", authMiddleware, deleteReview);
router.get("/review/user", authMiddleware, getReviewUser);
router.get("/review/product/:id", authMiddleware, getReviewProduct);

router.get("/:id", getProductById); // Get a single product by ID

// Protected Routes (User Must Be Logged In)
router.post("/:id", authMiddleware, createProduct); // User create product
router.put("/:id", authMiddleware, updateProduct); // User update product
router.delete("/:id", authMiddleware, deleteProduct); // User delete product


module.exports = router;
