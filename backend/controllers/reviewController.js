const ProductReview = require("../models/productReviewModel");
const Product = require("../models/productModel");
const User = require("../models/userModels");

// Create a Review and Update Product Rating
exports.createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    const {isVerified, isBanned} = req.user;
    if(!isVerified || isBanned){
      return res.status(404).json({ message: "User is not qualified for a review"});
    } 

    if (!productId || !rating) {
      return res.status(400).json({ message: "Product ID and rating are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newReview = new ProductReview({
      userId: req.user.id,
      productId,
      rating,
      comment,
    });

    await newReview.save();

    // Add review reference to product
    product.reviews.push(newReview._id);

    // Update product rating metrics
    product.metrics.rating[`${rating}star`] += 1;

    // Calculate new average rating
    const ratingMetrics = product.metrics.rating;
    const totalRatings =
      ratingMetrics["1star"] +
      ratingMetrics["2star"] +
      ratingMetrics["3star"] +
      ratingMetrics["4star"] +
      ratingMetrics["5star"];

    let avgRating = 0;
    if (totalRatings > 0) {
      const totalScore =
        (1 * ratingMetrics["1star"]) +
        (2 * ratingMetrics["2star"]) +
        (3 * ratingMetrics["3star"]) +
        (4 * ratingMetrics["4star"]) +
        (5 * ratingMetrics["5star"]);

      avgRating = (totalScore / totalRatings).toFixed(1);
    }

    product.metrics.AverageRating = avgRating;
    await product.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    next(error);
  }
};


// Delete a Review and Update Rating
exports.deleteReview = async (req, res, next) => {
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

    const product = await Product.findById(review.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Decrease rating count
    product.metrics.rating[`${review.rating}star`] -= 1;

    // Remove review from product
    product.reviews.pull(reviewId);
    await review.deleteOne();

    // Recalculate average rating
    const ratingMetrics = product.metrics.rating;
    const totalRatings =
      ratingMetrics["1star"] +
      ratingMetrics["2star"] +
      ratingMetrics["3star"] +
      ratingMetrics["4star"] +
      ratingMetrics["5star"];

    let avgRating = 0;
    if (totalRatings > 0) {
      const totalScore =
        (1 * ratingMetrics["1star"]) +
        (2 * ratingMetrics["2star"]) +
        (3 * ratingMetrics["3star"]) +
        (4 * ratingMetrics["4star"]) +
        (5 * ratingMetrics["5star"]);

      avgRating = (totalScore / totalRatings).toFixed(1);
    }

    product.metrics.AverageRating = avgRating;
    await product.save();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};


// Get All Reviews for a Product
exports.getReviewProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId }).populate(
      "userId",
      "username"
    );
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product reviews", error });
  }
};

// Get All Reviews by a User
exports.getReviewUser = async (req, res) => {
  try {
    const reviews = await ProductReview.find({ userId: req.user.id }).populate(
      "productId",
      "basicInfo.productName"
    );
    console.log(review);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user reviews", error });
  }
};

module.exports = {};
