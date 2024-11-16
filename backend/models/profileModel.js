const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  profileImage: { type: String, default: "avatar" },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  },
  userReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductReview' }],
  orderHistoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderHistory'}
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports = UserProfile;
