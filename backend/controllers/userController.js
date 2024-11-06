const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const Address = require('../models/addressModel');
const Profile = require('../models/profileModel');
const Cart = require('../models/cartModels');
const OrderHistory = require('../models/orderHistorySchema');


const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (req, res) => {

  try {
    const {user, address, profile} = req.body;
    const {username, email, password} = user;
    const {street, city, landmark, zipCode, country } = address;
    const {firstname, lastname, phoneNumber, profileImage} = profile;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username or Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const newAddress = new Address({

    })


  } catch {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }

}