const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);
module.exports = SubCategory;
