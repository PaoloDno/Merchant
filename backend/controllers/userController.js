const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const Address = require('../models/addressModel');
const Profile = require('../models/profileModel');
const Cart = require('../models/cartModels');
const OrderHistory = require('../models/orderHistorySchema');
const { body, validationResult } = require('express-validator');
const validateLogin = require('./../middlewares/validInputMiddleware')

const SECRET_KEY = process.env.SECRET_KEY;

// Login User
const loginUser = [
  validateLogin, // Input validation middleware
  async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, { expiresIn: '2h' });

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      next(error); // Pass to error handling middleware
    }
  },
];

// Register User
const registerUser = [
  body('user.username').trim().notEmpty().withMessage('Username is required'),
  body('user.email').isEmail().withMessage('Invalid email format'),
  body('user.password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('address.zipCode').optional().isPostalCode('any').withMessage('Invalid zip code'),
  async (req, res, next) => {
    try {
      const { user, address, profile } = req.body;

      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      // Check for existing user
      const existingUser = await User.findOne({ $or: [{ username: user.username }, { email: user.email }] });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username or Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = new User({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: user.role || 'user',
      });

      const savedUser = await newUser.save();

      // Create related records
      const [savedAddress, savedCart, savedOrderHistory, savedProfile] = await Promise.all([
        new Address({ userId: savedUser._id, ...address }).save(),
        new Cart({ userId: savedUser._id, items: [] }).save(),
        new OrderHistory({ userId: savedUser._id, orders: [] }).save(),
        new Profile({ userId: savedUser._id, ...profile }).save(),
      ]);

      // Update profile with IDs
      savedProfile.addressId = savedAddress._id;
      savedProfile.cartId = savedCart._id;
      await savedProfile.save();

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
];

module.exports = { loginUser, registerUser };