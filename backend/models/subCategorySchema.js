const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String }
});

const SubCategory = mongoose.model('SubCategory', SubCategorySchema);
module.exports = SubCategory;
