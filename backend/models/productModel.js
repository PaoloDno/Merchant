const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String },
  color: {type: String},
  material: {type: String},
  size: {type: String},
  features: {type: String}, 
  price: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
  stock: { type: Number, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductReview' }]
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
