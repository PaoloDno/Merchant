const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
      options: { type: Object } // For any additional product options (e.g., size, color)
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
