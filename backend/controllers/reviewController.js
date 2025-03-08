const ProductReview = require("../models/productReviewModel");
const Product = require("../models/productModel");
const User = require('../models/userModels');

// ✅ Create a Review
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({ message: "Product ID and rating are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = new ProductReview({
      userId: req.user.id, // Assuming authentication middleware sets req.user
      productId,
      rating,
      comment,
    });

    await newReview.save();

    // Add review reference to product
    product.reviews.push(newReview._id);
    await product.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

// ❌ Delete a Review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await ProductReview.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the logged-in user is the owner of the review
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this review" });
    }

    await ProductReview.findByIdAndDelete(reviewId);

    // Remove review from product
    await Product.findByIdAndUpdate(review.productId, { $pull: { reviews: reviewId } });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

// 🔍 Get All Reviews for a Product
exports.getReviewProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId }).populate("userId", "username");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product reviews", error });
  }
};

// 🙋 Get All Reviews by a User
exports.getReviewUser = async (req, res) => {
  try {
    const reviews = await ProductReview.find({ userId: req.user.id }).populate("productId", "basicInfo.productName");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user reviews", error });
  }
};
