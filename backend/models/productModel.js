const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  basicInfo: {
    productName: { type: String, required: true, minlength: 3, maxlength: 12 },
    description: { type: String, required: true, minlength: 10 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
  },
  categoryDetails: {
    category: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: [{ type: String }],  
    subCategoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }],
    features: { type: String },
  },
  specifications: {
    color: { type: String },
    material: { type: String },
    size: { type: String },
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductReview" }],
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
