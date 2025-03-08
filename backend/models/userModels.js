const mongoose = require('mongoose');
const shortid = require('shortid');

const UserSchema = new mongoose.Schema({
  userId: { type: String, default: shortid.generate, unique: true },
  username: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  isAdmin: { type: Boolean, default: false },
  isVerified: {type: Boolean, default: false},
  isBanned: {type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
