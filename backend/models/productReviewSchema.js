const ProductReviewSchema = new mongoose.Schema({
  profileID: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const ProductReview = mongoose.model('ProductReview', ProductReviewSchema);
module.exports = ProductReview;
