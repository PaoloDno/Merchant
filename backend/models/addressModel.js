const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  landmark: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true }
});

const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
