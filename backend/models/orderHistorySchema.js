const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({
  profileID: { // Change from userID to profileID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  lastUpdated: { type: Date, default: Date.now }
});

const OrderHistory = mongoose.model('OrderHistory', OrderHistorySchema);
module.exports = OrderHistory;
