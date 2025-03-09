const Seller = require("../models/sellerModel");
const User = require("../models/userModels");
const Profile = require("../models/profileModel")

// Create a new seller profile
exports.createSeller = async (req, res, next) => {
  try {
    const { storeName, storeDescription, contactEmail, contactPhone, address } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: "Your account is banned. You cannot create a seller profile." });
    }

    const existingSeller = await Seller.findOne({ user: req.user.id });
    if (existingSeller) {
      return res.status(400).json({ message: "User already has a seller profile" });
    }

    const profile = await Profile.findOne({ userId: req.user.userId });
    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    // Create a new seller profile
    const seller = new Seller({
      userId: req.user.userId,
      storeName,
      storeDescription,
      contactEmail,
      contactPhone,
      address,
    });

    await seller.save();

    // Update the user profile to include this seller ID
    await Profile.findByIdAndUpdate(profile._id, { $push: { stores: seller._id } });

    res.status(201).json({ message: "Seller profile created successfully", seller });
  } catch (error) {
    res.status(500).json({ message: "Error creating seller profile", error });
    next(error);
  }
};

// Get seller details
exports.getMyStore = async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ userId: req.user.userId });

    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    res.json(seller);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seller profile", error });
    next(error);
  }
};

// Update seller details
exports.updateMyStore = async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ user: req.user.userId });

    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    const { storeName, storeDescription, contactEmail, contactPhone, address } = req.body;

    seller.storeName = storeName || seller.storeName;
    seller.storeDescription = storeDescription || seller.storeDescription;
    seller.contactEmail = contactEmail || seller.contactEmail;
    seller.contactPhone = contactPhone || seller.contactPhone;
    seller.address = address || seller.address;

    await seller.save();
    res.status(200).json({ message: "Seller profile updated successfully", seller });
  } catch (error) {
    res.status(500).json({ message: "Error updating seller profile", error });
    next(error);
  }
};



// Delete seller profile
exports.deleteMyStore = async (req, res, next) => {
  try {
    const { id } = req.params; // Store ID from request parameters
    const userId = req.user.userId; // Authenticated user's ID

    // Find the seller profile by store ID and user ID
    const seller = await Seller.findOne({ _id: id, userId: userId });

    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found or unauthorized to delete this store" });
    }

    // Delete the seller profile
    await Seller.findByIdAndDelete(id);

    res.status(200).json({ message: "Seller profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting seller profile:", error.message);
    res.status(500).json({ message: "Error deleting seller profile", error: error.message });
    next(error);
  }
};



exports.adminVerifySeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    seller.verified = true; // Mark seller as verified
    await seller.save();

    res.status(200).json({ message: "Seller verified successfully", seller });
  } catch (error) {
    res.status(500).json({ message: "Error verifying seller", error });
    next(error);
  }
};



exports.adminDeleteSeller = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    // Delete seller profile
    await Seller.findByIdAndDelete(req.params.id);

    // Ban user associated with the seller
    await User.findByIdAndUpdate(seller.userId, { isBanned: true });

    res.status(200).json({ message: "Seller deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting seller", error });
    next(error);
  }
};

exports.viewStore = async (req, res, next) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seller details", error });
    next(error);
  }
};

