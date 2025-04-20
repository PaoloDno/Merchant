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

      const profile = await Profile.findOne({ userId: user._id });
      if (!profile) {
        return res
          .status(404)
          .json({ success: false, message: "Profile not found" });
      }

      // Retrieve Address using the addressId from the Profile
      let address = null;
      if (profile.addressId) {
        address = await Address.findById(profile.addressId);
      }

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          username: user.username,
          userId: user.userId, //fake user ID
          email: user.email,
          isAdmin: user.isAdmin,
        },
        profile: {
          firstname: profile.firstname,
          lastname: profile.lastname,
          phoneNumber: profile.phoneNumber,
        },
        address: {
          street: address.street,
          city: address.city,
          zipCode: address.zipCode,
          landmark: address.landmark,
          country: address.country,
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

      console.log("Register request:", user, address, profile);

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

      // Check if the username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username: user.username }, { email: user.email }],
      });

      if (existingUser) {
        console.log("Registration failed: User already exists.");
        return res.status(400).json({
          success: false,
          message: "Username or Email already in use",
        });
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Create the new user
      const newUser = new User({
        username: user.username,
        email: user.email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      // Create the user's address, cart, orderhistory
      const savedAddress = new Address({
        userId: savedUser._id,
        ...address,
      });
      await savedAddress.save();

      const savedCart = new Cart({
        userId: savedUser._id,
        items: [],
      });
      await savedCart.save();

      const savedOrderHistory = new OrderHistory({
        userId: savedUser._id,
        orders: [],
      });
      await savedOrderHistory.save();

      const savedProfile = new Profile({
        userId: savedUser._id,
        firstname: profile.firstName,
        lastname: profile.lastName,
        addressId: savedAddress._id,
        cartId: savedCart._id,
        orderHistoryId: savedOrderHistory._id,
        ...profile,
      });
      await savedProfile.save();

      console.log("Registration successful");

      // Generate JWT token
      const token = generateToken(savedUser);

      // Send back only necessary user info
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token,
        user: {
          username: savedUser.username,
          userId: savedUser._id, // Corrected fake userId
          email: savedUser.email,
          isAdmin: savedUser.isAdmin,
        },
        profile: {
          firstname: savedProfile.firstname,
          lastname: savedProfile.lastname,
          phoneNumber: savedProfile.phoneNumber,
        },
        address: {
          street: savedAddress.street,
          city: savedAddress.city,
          zipCode: savedAddress.zipCode,
          landmark: savedAddress.landmark,
          country: savedAddress.country,
        },
      });
    } catch (error) {
      console.error("Registration Error:", error.message);
      next(error);
    }
  },
];

const updateProfile = async (req, res, next) => {
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

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Profile Update Error:", error.message);
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
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

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Address Update Error:", error.message);
    next(error);
  }
};

const DisplayUser = async (req, res, next) => {
  try {
    let userId = req.user.userId;
    console.log("user", userId);

    // Find the user's profile and populate related data
    let profile = await Profile.findOne({ userId: userId })
      .populate("addressId")
      .populate("cartId")
      .populate("stores")
      .populate("orderHistoryId")
      .populate("userReviews");

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    // Extract the related data from the populated profile
    const address = profile.addressId || null;
    const cart = profile.cartId || null;
    const stores = profile.stores || [];
    const orderHistory = profile.orderHistoryId || null;
    const userReviews = profile.userReviews || [];

    console.log({
      success: true,
      profile,
      address,
      cart,
      stores,
      orderHistory,
      userReviews,
    });
    res.status(200).json({
      success: true,
      profile,
      address,
      cart,
      stores,
      orderHistory,
      userReviews,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    console.log("userId", req.params.id);
    const profile = await Profile.findById(req.params.id)
      .populate("userId")
      .populate("addressId")
      .populate("cartId")
      .populate("stores")
      .populate("orderHistoryId")
      .populate("userReviews");
    
    console.log({
      success: true,
      profile
    });
    console.log(profile);

    res.status(200).json({
      success: true,
      profile
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
    next(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  updateProfile,
  updateAddress,
  DisplayUser,
  getUserById,
};
