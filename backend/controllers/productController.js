const Product = require("../models/productModel");
const { body, validationResult } = require("express-validator");

// CREATE PRODUCT
const createProduct = [
  // Validation rules
  body("basicInfo.productName")
    .isLength({ min: 3, max: 12 })
    .withMessage("Product name must be 3-12 characters long.")
    .matches(/^[^<>\/\?@!]*$/)
    .withMessage("No special characters allowed."),
  body("basicInfo.description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long."),
  body("basicInfo.price").isFloat({ min: 0 }).withMessage("Price must be a valid number."),
  body("basicInfo.stock").isInt({ min: 0 }).withMessage("Stock must be a whole number."),
  body("categoryDetails.category").notEmpty().withMessage("Category is required."),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { basicInfo, categoryDetails, specifications } = req.body;

      // Check if product already exists
      const existingProduct = await Product.findOne({ "basicInfo.productName": basicInfo.productName });
      if (existingProduct) {
        return res.status(400).json({ success: false, message: "Product already exists" });
      }

      // Create new product
      const product = new Product({ basicInfo, categoryDetails, specifications });
      await product.save();

      res.status(201).json({ success: true, message: "Product created successfully", product });
    } catch (error) {
      next(error); // Pass error to middleware
    }
  },
];

// GET ALL PRODUCTS
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE PRODUCT BY ID
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res, next) => {
  try {
    const { basicInfo, categoryDetails, specifications } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { basicInfo, categoryDetails, specifications },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    next(error);
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Export all functions
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
