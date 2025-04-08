const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  storeName: { type: String, required: true, unique: true }, // Unique store name
  storeDescription: { type: String, default: "" },
  storeLogo: { type: String, default: "mart" },
  storeBanner: { type: String, default: "mart" },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  address: { type: String, required: true },
  
  // Seller Metrics
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Products sold by this store
  totalSales: { type: Number, default: 0 }, // Number of products sold
  revenue: { type: Number, default: 0 }, // Total revenue from sales
  rating: { type: Number, default: 0 }, // Store rating
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductReview" }], // Reviews for the store

  // Store Management
  isVerified: { type: Boolean, default: false }, // Verification status
  createdAt: { type: Date, default: Date.now },
});

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
