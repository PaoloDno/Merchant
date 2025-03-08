const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  products: {type: Number, default: 0}
});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);
module.exports = SubCategory;
