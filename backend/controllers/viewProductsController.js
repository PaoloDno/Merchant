const Product = require("../models/productModel");

const FIXED_LIMIT = 6; // Set fixed limit for pagination

// Helper function to get pagination values
const getPagination = (req) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const skip = (page - 1) * FIXED_LIMIT;
  return { page, skip };
};

// Get top 15 hot products
exports.getHotProducts = async (req, res, next) => {
  try {
    const { page, skip } = getPagination(req);

    const hotProducts = await Product.find({ "metrics.isHot": true })
      .sort({ "metrics.salesCount": -1 })
      .skip(skip)
      .limit(FIXED_LIMIT);

    const totalProducts = await Product.countDocuments({ "metrics.isHot": true });
    console.log(hotProducts)
    const totalPages = Math.ceil(totalProducts / FIXED_LIMIT);

    res.status(200).json({ success: true, products: hotProducts, pagination: { page, totalPages, totalProducts } });
  } catch (error) {
    next(error);
  }
};

// Get products by category or subcategory with pagination
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { page, skip } = getPagination(req);

    let filter = {};
    if (categoryId) filter["categoryDetails.categoryId"] = categoryId;

    const products = await Product.find(filter).skip(skip).limit(FIXED_LIMIT);

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / FIXED_LIMIT);

    res.status(200).json({ success: true, products, pagination: { page, totalPages, totalProducts } });
  } catch (error) {
    next(error);
  }
};

// Get New Products (last 7 days) with pagination
exports.getNewProducts = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const { page } = getPagination(req);
    console.log(page)
    const skip = page - 1;

    const newProducts = await Product.find({ createdAt: { $gte: sevenDaysAgo } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(FIXED_LIMIT);

    const totalProducts = await Product.countDocuments({ createdAt: { $gte: sevenDaysAgo } });
    const totalPages = Math.ceil(totalProducts / FIXED_LIMIT);

    console.log("a:", newProducts);

    res.status(200).json({ success: true, products: newProducts, pagination: { page, totalPages, totalProducts } });
  } catch (error) {
    next(error);
  }
};

// Get 15 random products
exports.getRandomProducts = async (req, res, next) => {
  try {
    const randomProducts = await Product.aggregate([{ $sample: { size: FIXED_LIMIT } }]);

    res.status(200).json({ success: true, products: randomProducts, pagination: { page: null, totalPages: null } });
  } catch (error) {
    next(error);
  }
};

// Search Products with filters, sorting, and pagination
exports.searchProducts = async (req, res, next) => {
  try {
    const { query } = req.params;
    const { categoryId, subCategoryId, minPrice, maxPrice, inStock, sortBy } = req.query;
    const { page, skip } = getPagination(req);

    let filter = {};

    // Keyword search (by product name or description)
    if (query) {
      filter.$or = [
        { "basicInfo.productName": { $regex: query, $options: "i" } },
        { "basicInfo.description": { $regex: query, $options: "i" } },
      ];
    }

    // Category filter
    if (categoryId) filter["categoryDetails.categoryId"] = categoryId;

    // Subcategory filter
    if (subCategoryId) filter["categoryDetails.subCategoryId"] = subCategoryId;

    // Price range filter
    if (minPrice || maxPrice) {
      filter["basicInfo.price"] = {};
      if (minPrice) filter["basicInfo.price"].$gte = Number(minPrice);
      if (maxPrice) filter["basicInfo.price"].$lte = Number(maxPrice);
    }

    // Stock availability filter
    if (inStock === "true") filter["basicInfo.stock"] = { $gt: 0 };

    // Sorting options
    let sortOption = { _id: -1 };
    if (sortBy === "priceLowToHigh") sortOption = { "basicInfo.price": 1 };
    if (sortBy === "priceHighToLow") sortOption = { "basicInfo.price": -1 };
    if (sortBy === "rating") sortOption = { "metrics.rating": -1 };
    if (sortBy === "sales") sortOption = { "metrics.salesCount": -1 };

    // Fetch the filtered products with pagination
    const products = await Product.find(filter).sort(sortOption).skip(skip).limit(FIXED_LIMIT);

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / FIXED_LIMIT);

    res.status(200).json({ success: true, products, pagination: { page, totalPages, totalProducts } });
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error });
    next(error);
  }
};
