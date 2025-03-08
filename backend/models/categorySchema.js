const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  products: {type: Number, default: 0}
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
