const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const Address = require("../models/addressModel");
const Profile = require("../models/profileModel");
const Cart = require("../models/cartModels");
const OrderHistory = require("../models/orderHistorySchema");
const { body, validationResult } = require("express-validator");
//const validateLogin = require('./../middlewares/validInputMiddleware')

//token function

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
    isVerified: user.isVerified,
    isBanned: user.isBanned,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" });
};

// Login User
const loginUser = [
  //validateLogin, // Input validation middleware
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      console.log("Login request body:", req.body);

      const user = await User.findOne({ username });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid password" });
      }

      console.log(user);
      const token = generateToken(user);
      console.log(token);
      console.log("success");

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          username: user.username,
          userId: user.userId, //fake user ID
          email: user.email,
        },
      });
    } catch (error) {
      console.log("fail login", error.message);
      next(error); // Pass to error handling middleware
    }
  },
];

// Register User
const registerUser = [
  body("user.username").trim().notEmpty().withMessage("Username is required"),
  body("user.email").isEmail().withMessage("Invalid email format"),
  body("user.password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("address.zipCode")
    .optional()
    .isPostalCode("any")
    .withMessage("Invalid zip code"),
  async (req, res, next) => {
    try {
      const { user, address, profile } = req.body;

      console.log(user, address, profile);

      if (!user || !address || !profile) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid request structure" });
      }

      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const existingUser = await User.findOne({
        $or: [{ username: user.username }, { email: user.email }],
      });
      if (existingUser) {
        console.log("unsuccessful");
        return res
          .status(400)
          .json({
            success: false,
            message: "Username or Email already in use",
          });
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = new User({
        username: user.username,
        email: user.email,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();

      const savedAddress = await new Address({
        userId: savedUser._id,
        ...address,
      }).save();
      const savedCart = await new Cart({
        userId: savedUser._id,
        items: [],
      }).save();
      const savedOrderHistory = await new OrderHistory({
        userId: savedUser._id,
        orders: [],
      }).save();
      const savedProfile = await new Profile({
        userId: savedUser._id,
        firstname: profile.firstName,
        lastname: profile.lastName,
        ...profile,
      }).save();

      savedProfile.addressId = savedAddress._id;
      savedProfile.cartId = savedCart._id;
      await savedProfile.save();
      console.log("success");

      const token = generateToken(user);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
          username: user.username,
          userId: user.userId,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Registration Error:", error.message);
      next(error);
    }
  },
];

exports.updateProfile = async (req, res, next) => {
  try {
    const { firstname, lastname, phoneNumber, profileImage } = req.body;

    // Find the user's profile
    let profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    // Update profile fields
    profile.firstname = firstname || profile.firstname;
    profile.lastname = lastname || profile.lastname;
    profile.phoneNumber = phoneNumber || profile.phoneNumber;
    profile.profileImage = profileImage || profile.profileImage;

    await profile.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Profile updated successfully",
        profile,
      });
  } catch (error) {
    console.error("Profile Update Error:", error.message);
    next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const { street, city, state, zipCode, country } = req.body;

    // Find the user's profile
    let profile = await Profile.findOne({ userId: req.user.id });

    if (!profile || !profile.addressId) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Find the address by ID
    let address = await Address.findById(profile.addressId);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address record not found" });
    }

    // Update address fields
    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.country = country || address.country;

    await address.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Address updated successfully",
        address,
      });
  } catch (error) {
    console.error("Address Update Error:", error.message);
    next(error);
  }
};

exports.DisplayUser = async (req, res, next) => {
  try {
    let userId = req.user.userId;

    // Find the user's profile
    let profile = await Profile.findOne({ userId: userId });
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    if (!profile.addressId) {
      return res
        .status(404)
        .json({ success: false, message: "Address ID not found in profile" });
    }

    // Fetch the address using the stored addressId
    let address = await Address.findById(profile.addressId);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    res.status(200).json({ success: true, profile, address });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { loginUser, registerUser, updateProfile, updateAddress, DisplayUser };
