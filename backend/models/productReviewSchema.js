const mongoose = require('mongoose');

const ProductReviewSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const ProductReview = mongoose.model('ProductReview', ProductReviewSchema);
module.exports = ProductReview;
