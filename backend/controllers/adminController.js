const Store = require("../models/sellerModel");
const Product = require("../models/productModel");
const Categories = require("../models/categorySchema");
const SubCategories = require("../models/subCategorySchema");
const Profile = require("../models/profileModel");
const Reviews = require("../models/productReviewSchema");
const Order = require("../models/orderModel");

// Utility function for pagination
const getPagination = (page, limit) => {
  const resultsPerPage = parseInt(limit);
  const currentPage = parseInt(page);
  const skipDocuments = (currentPage - 1) * resultsPerPage;
  return { resultsPerPage, currentPage, skipDocuments };
};

// Get all profiles
exports.getProfiles = async (req, res, next) => {
  try {
    const {
      limit = 12,
      page = 1,
      firstname,
      lastname,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    const filter = {};

    if (firstname) filter.firstname = { $regex: firstname, $options: "i" };
    if (lastname) filter.lastname = { $regex: lastname, $options: "i" };

    const { resultsPerPage, currentPage, skipDocuments } = getPagination(
      page,
      limit
    );

    console.log(filter);

    const profiles = await Profile.find(filter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skipDocuments)
      .limit(resultsPerPage);
    console.log(profiles);
    const totalCounts  = await Profile.countDocuments(filter);
    res.json({
      profiles,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalCounts  / resultsPerPage),
        totalCounts ,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all stores
exports.getStores = async (req, res, next) => {
  try {
    const {
      limit = 12,
      page = 1,
      hot,
      new: isNew,
      storeName,
      rating,
      isVerified,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    const filter = {};

    if (hot) filter.isHot = true;
    if (isNew)
      filter.createdAt = {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      };
    if (storeName) filter.storeName = { $regex: storeName, $options: "i" };
    if (rating) filter.rating = { $gte: parseFloat(rating) };
    if (isVerified === "true") filter.isVerified = true;

    const { resultsPerPage, currentPage, skipDocuments } = getPagination(
      page,
      limit
    );

    const stores = await Store.find(filter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skipDocuments)
      .limit(resultsPerPage);

    const totalCounts = await Store.countDocuments(filter);
    res.json({
      stores,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalCounts / resultsPerPage),
        totalCounts ,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all products
exports.getProducts = async (req, res, next) => {
  try {
    const {
      limit = 12,
      page = 1,
      hot,
      new: isNew,
      bestSelling,
      category,
      subcategory,
      productName,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    const filter = {};
    
    //if (hot) filter.isHot = true;
    if (isNew)
      filter.createdAt = {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      };
    //if (bestSelling) filter.salesCount = { $gte: 100 };
    if (category) filter["categoryDetails.category"] = category;
    if (subcategory) filter["categoryDetails.subCategory"] = subcategory;
    if (productName)
      filter["basicInfo.productName"] = { $regex: productName, $options: "i" };
    console.log(filter);
    const { resultsPerPage, currentPage, skipDocuments } = getPagination(
      page,
      limit
    );

    const products = await Product.find(filter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skipDocuments)
      .limit(resultsPerPage);

    const totalCounts = await Product.countDocuments(filter);
    console.log(products);
    res.json({
      products,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalCounts / resultsPerPage),
        totalCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const {
      limit = 12,
      page = 1,
      name,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };

    const { resultsPerPage, currentPage, skipDocuments } = getPagination(
      page,
      limit
    );

    const categories = await Categories.find(filter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skipDocuments)
      .limit(resultsPerPage);

    const totalCounts  = await Categories.countDocuments(filter);
    res.json({
      categories,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalCounts  / resultsPerPage),
        totalCounts ,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all subcategories
exports.getSubCategories = async (req, res, next) => {
  try {
    const {
      limit = 12,
      page = 1,
      name,
      sortBy = "createdAt",
      sortOrder = "desc",
     } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };

    const { resultsPerPage, currentPage, skipDocuments } = getPagination(
      page,
      limit
    );

    const subCategories = await SubCategories.find(filter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skipDocuments)
      .limit(resultsPerPage);

    const totalCounts  = await SubCategories.countDocuments();
    res.json({
      subCategories,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalCounts  / resultsPerPage),
        totalCounts ,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all reviews
exports.getReviews = async (req, res, next) => {
  try {
    const { limit = 12, page = 1, product } = req.query;
    const filter = {};
    if (product) filter.product = product;

    const { resultsPerPage, currentPage, skipDocuments } = getPagination(
      page,
      limit
    );

    const reviews = await Reviews.find(filter)
      .skip(skipDocuments)
      .limit(resultsPerPage);

    const totalCounts  = await Reviews.countDocuments(filter);
    res.json({
      reviews,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalCounts  / resultsPerPage),
        totalCounts ,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all orders
exports.getOrders = async (req, res, next) => {
  try {
    const { limit = 12, page = 1, user } = req.query;
    const filter = {};
    if (user) filter.userId = user;

    const { resultsPerPage, currentPage, skipDocuments } = getPagination(
      page,
      limit
    );

    const orders = await Order.find(filter)
      .skip(skipDocuments)
      .limit(resultsPerPage);

    const totalCounts  = await Order.countDocuments(filter);
    res.json({
      orders,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalCounts  / resultsPerPage),
        totalCounts ,
      },
    });
  } catch (error) {
    next(error);
  }
};
