const Store = require('../models/sellerModel');
const Product = require('../models/productModel');
const Categories = require('../models/categorySchema');
const SubCategories = require('../models/subCategorySchema');
const Profile = require("../models/profileModel");
const Reviews = require("../models/productReviewSchema");
const Order = require("../models/orderModel");

// Get all profiles (limited to 15)
exports.getProfiles = async (req, res, next) => {
    try {
        const { limit = 15, page = 1, firstname, lastname } = req.query;
  
        // Build the query object
        const filter = {};
  
        if (firstname) {
            filter.firstname = { $regex: firstname, $options: 'i' }; // Partial match, case-insensitive
        }
        
        if (lastname) {
            filter.lastname = { $regex: lastname, $options: 'i' }; // Partial match, case-insensitive
        }

        //pagination
        const resultsPerPage = parseInt(limit);
        const currentPage = parseInt(page);
        const skipDocuments = (currentPage - 1) * resultsPerPage 
  
        // Find profiles based on query with limit
        const profiles = await Profile.find(filter)
        .skip(skipDocuments)
        .limit(resultsPerPage);

        //get
        const totalProfiles = await Profile.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts/ resultsPerPage);
        
        res.json({
            profiles,
            pagination: {
                currentPage,
                totalPages,
                totalProfiles
            }
        });
    } catch (error) {
        next(error);
    }
  };

// Get all stores (limited to 15)
exports.getStores = async (req, res, next) => {
    try {
        const { limit = 15, hot, new: isNew, storeName, rating, isVerified } = req.query; 
        let filter = {};

        if (hot) filter.isHot = true;
        if (isNew) filter.createdAt = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }; // Created within the last 30 days
        if (storeName) filter.storeName = { $regex: storeName, $options: 'i' }; // Partial match, case-insensitive
        if (rating) filter.rating = { $gte: parseFloat(rating) }; // Only get stores with rating >= specified value
        if (isVerified === 'true') filter.isVerified = true; // Only get verified stores if isVerified is true

        //pagination logic
        const resultsPerPage = parseInt(limit);
        const currentPage = parseInt(page);
        const skipDocuments = (currentPage - 1 ) * resultsPerPage;

        const stores = await Store.find(filter).skip(skipDocuments).limit(resultsPerPage);

        const totalStores = await Store.countDocuments(filter);
        const totalPages = Math.ceil(totalStores / resultsPerPage);
        
        res.json({
            stores,
            pagination: {
                currentPage,
                totalPages,
                totalProducts
            }
        });
    } catch (error) {
        next(error);
    }
};


// Get all products (limited to 15)
exports.getProducts = async (req, res, next) => {
    try {
        const { 
            limit = 15, 
            page = 1,
            hot, 
            new: isNew, 
            bestSelling, 
            category, 
            subcategory,
            productName 
        } = req.query;

        let filter = {};

        // Building the Filter
        if (hot) filter.isHot = true;
        if (isNew) filter.createdAt = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
        if (bestSelling) filter.salesCount = { $gte: 100 };
        if (category) filter.category = category;
        if (subcategory) filter.subcategory = subcategory;
        if (productName) {
            filter['basicInfo.productName'] = { $regex: productName, $options: 'i' };
        }

        // Pagination Logic
        const resultsPerPage = parseInt(limit);    // Results per page
        const currentPage = parseInt(page);         // Current page number
        const skipDocuments = (currentPage - 1) * resultsPerPage;  // How many documents to skip

        // Fetching Data
        const products = await Product.find(filter)
            .skip(skipDocuments)
            .limit(resultsPerPage);

        // Getting Total Count of Documents Matching Filter
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / resultsPerPage);

        // Returning Response
        res.json({
            products,
            pagination: {
                currentPage,
                totalPages,
                totalProducts,
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get all categories (limited to 15)
exports.getCategories = async (req, res, next) => {
    try {
        const { limit = 15 } = req.query;
        const categories = await Categories.find().limit(parseInt(limit));
        res.json(categories);
    } catch (error) {
        next(error);
    }
};

// Get all subcategories (limited to 15)
exports.getSubCategories = async (req, res, next) => {
  try {
      const { limit = 15 } = req.query;
      const subCategories = await SubCategories.find().limit(parseInt(limit));
      res.json(subCategories);
  } catch (error) {
      next(error);
  }
};

// Get all reviews (limited to 15)
exports.getReviews = async (req, res, next) => {
  try {
      const { limit = 15, product } = req.query;
      let filter = {};

      if (product) filter.product = product; // Fetch reviews related to a specific product

      const reviews = await Reviews.find(filter).limit(parseInt(limit));
      res.json(reviews);
  } catch (error) {
      next(error);
  }
};

// Get all orders (limited to 15)
exports.getOrders = async (req, res, next) => {
  try {
      const { limit = 15, user } = req.query;
      let filter = {};

      if (user) filter.userId = user; // Fetch orders related to a specific user

      const orders = await Order.find(filter).limit(parseInt(limit));
      res.json(orders);
  } catch (error) {
      next(error);
  }
};
