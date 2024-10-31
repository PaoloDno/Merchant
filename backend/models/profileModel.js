const UserProfileSchema = new mongoose.Schema({
  userID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  profileImage: { type: String, default: "avatar" },
  addressID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  },
  cartID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  },
  userReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductReview' }],
  orderHistoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderHistory'}
});

const UserProfile = mongoose.model('UserProfile', UserProfileSchema);
module.exports = UserProfile;
