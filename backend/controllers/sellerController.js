const Seller = require("../models/sellerModel");
const User = require("../models/userModels");
const Profile = require("../models/profileModel");

// Create a new store profile
exports.createStore = async (req, res, next) => {
  try {
    const { storeName, storeDescription, contactEmail, contactPhone, address } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: "Your account is banned. You cannot create a store profile." });
    }

    const existingStore = await Seller.findOne({ userId: req.user.id });
    if (existingStore) {
      return res.status(400).json({ message: "User already has a store profile" });
    }

    const profile = await Profile.findOne({ userId: req.user.userId });
    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    //limit profile.stores to 3
    if (profile.stores && profile.stores.length >= 2) {
      return res.status(400).json({ message: "You can only have up to 2 store profiles." });
    }


    // Create a new store profile
    const store = new Seller({
      userId: req.user.userId,
      storeName,
      storeDescription,
      contactEmail,
      contactPhone,
      address,
    });

    await store.save();

    // Update the user profile to include this store ID
    await Profile.findByIdAndUpdate(profile._id, { $push: { stores: store._id } });

    res.status(201).json({ message: "Store profile created successfully", store });
  } catch (error) {
    res.status(500).json({ message: "Error creating store profile", error });
    next(error);
  }
};

// Get store details
exports.getMyStore = async (req, res, next) => {
  try {
    const store = await Seller.findOne({ userId: req.user.userId });

    if (!store) {
      return res.status(404).json({ message: "Store profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "get Product successfully",
      store,
    });
  } catch (error) {
    res.status(500).json({ success: true, message: "Error fetching store profile", error });
    next(error);
  }
};

// Update store details
exports.updateMyStore = async (req, res, next) => {
  try {
    const store = await Seller.findOne({ user: req.user.userId });

    if (!store) {
      return res.status(404).json({ message: "Store profile not found" });
    }

    const { storeName, storeDescription, contactEmail, contactPhone, address } = req.body;

    store.storeName = storeName || store.storeName;
    store.storeDescription = storeDescription || store.storeDescription;
    store.contactEmail = contactEmail || store.contactEmail;
    store.contactPhone = contactPhone || store.contactPhone;
    store.address = address || store.address;

    await store.save();
    res.status(200).json({ message: "Store profile updated successfully", store });
  } catch (error) {
    res.status(500).json({ message: "Error updating store profile", error });
    next(error);
  }
};

// Delete store profile
exports.deleteMyStore = async (req, res, next) => {
  try {
    const { id } = req.params; // Store ID from request parameters
    const userId = req.user.userId; // Authenticated user's ID

    const store = await Seller.findOne({ _id: id, userId: userId });

    if (!store) {
      return res.status(404).json({ message: "Store profile not found or unauthorized to delete this store" });
    }

    await Seller.findByIdAndDelete(id);

    res.status(200).json({ message: "Store profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting store profile:", error.message);
    res.status(500).json({ message: "Error deleting store profile", error: error.message });
    next(error);
  }
};

// Admin: Verify store
exports.adminVerifyStore = async (req, res, next) => {
  try {
    const store = await Seller.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store profile not found" });
    }

    store.isVerified = true;
    await store.save();

    res.status(200).json({ message: "Store verified successfully", store });
  } catch (error) {
    res.status(500).json({ message: "Error verifying store", error });
    next(error);
  }
};

// Admin: Delete store
exports.adminDeleteStore = async (req, res, next) => {
  try {
    const store = await Seller.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store profile not found" });
    }

    await Seller.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(store.userId, { isBanned: true });

    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting store", error });
    next(error);
  }
};

// View store details
exports.viewStore = async (req, res, next) => {
  try {
    const store = await Seller.findById(req.params.id);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error fetching store details", error });
    next(error);
  }
};
