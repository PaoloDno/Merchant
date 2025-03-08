const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const Product = require("../models/productModel");

// create Category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required" });

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) return res.status(400).json({ message: "Category already exists" });

    const newCategory = new Category({ name, description });
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
    next(error);
  }
};

// Get All Categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
    next(error);
  }
};

// Get Products By Category by ID
exports.getProductByCategoryId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: "Category not found" });

    const products = await Product.find({ 
      "categoryDetails.categoryId": categoryId
    });
    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: "Error fetching products by category", error });
    next(error);
  }
};

// Update a Category
exports.updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, description },
      { new: true } //change before return update
    );

    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
    next(error);
  }
};

exports.createSubCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "SubCategory name is required" });

    const newSubCategory = new SubCategory({ name, description });
    await newSubCategory.save();

    res.status(201).json({ message: "SubCategory created successfully", subCategory: newSubCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating subcategory", error });
    next(error);
  }
};

exports.getAllSubCategories = async (req, res, next) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
    next(error);
  }
};

exports.getProductsBySubCategoryId = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;

    // Check if subCategory exists
    const subCategory = await SubCategory.findById(subCategoryId);
    if (!subCategory) return res.status(404).json({ message: "SubCategory not found" });

    // Find products where subCategoryId exists in the array
    const products = await Product.find({
      "categoryDetails.subCategoryId": subCategoryId, // Matches subCategoryId inside the array
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by subcategory", error });
    next(error);
  }
};


// Update a SubCategory
exports.updateSubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const { name, description } = req.body;

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      subCategoryId,
      { name, description },
      { new: true }
    );

    if (!updatedSubCategory) return res.status(404).json({ message: "SubCategory not found" });

    res.status(200).json({ message: "SubCategory updated successfully", subCategory: updatedSubCategory });
  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory", error });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const deletedSubCategory = await SubCategory.findByIdAndDelete(subCategoryId);

    if (!deletedSubCategory) return res.status(404).json({ message: "SubCategory not found" });

    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subcategory", error });
  }
};

module.exports = {
  createCategory,
  createSubCategory,
  getProductByCategoryId,
  getProductsBySubCategoryId,
  getAllCategories,
  getAllSubCategories,
  updateCategory,
  updateSubCategory,
  deleteCategory,
  deleteSubCategory
}