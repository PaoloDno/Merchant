const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One cart per user
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Method to Calculate Total Price
CartSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  return this.totalPrice;
};

module.exports = mongoose.model("Cart", CartSchema);
