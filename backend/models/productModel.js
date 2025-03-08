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
  metrics: {
    likes: { type: Number, default: 0 }, // User likes
    salesCount: { type: Number, default: 0 }, // Number of times sold
    isHot: { type: Boolean, default: false }, // Mark as hot-selling product
  },
  seller: {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
    sellerName: { type: String, required: true },
    contact: { type: String },
    rating: { type: Number, default: 0 },
    view: { type: Number, default: 0},
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductReview" }],
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
