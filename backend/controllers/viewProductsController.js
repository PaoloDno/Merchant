const Product = require("../models/productModel");

// Get top 12 hot products
exports.getHotProducts = async (req, res, next) => {
  try {
    const hotProducts = await Product.find({ "metrics.isHot": true })
      .sort({ "metrics.salesCount": -1 }) // Sort by sales count
      .limit(12);

    res.status(200).json({ success: true, products: hotProducts });
  } catch (error) {
    next(error);
  }
};

// Get products by category or subcategory
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    let filter = {};
    if (categoryId) filter["categoryDetails.categoryId"] = categoryId;

    const products = await Product.find(filter).limit(12); // Limit to 12 results

    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// Get New Products (last 7 days)
exports.getNewProducts = async (req, res, next) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newProducts = await Product.find({
      createdAt: { $gte: sevenDaysAgo },
    })
      .sort({ createdAt: -1 }) // Sort newest first
      .limit(12);

    res.status(200).json({ success: true, products: newProducts });
  } catch (error) {
    next(error);
  }
};

// Get 12 random products
exports.getRandomProducts = async (req, res, next) => {
  try {
    const randomProducts = await Product.aggregate([{ $sample: { size: 12 } }]);
    res.status(200).json({ success: true, products: randomProducts });
  } catch (error) {
    next(error);
  }
};


exports.searchProducts = async (req, res, next) => {
  try {
    const { query } = req.params;
    const { categoryId, subCategoryId, minPrice, maxPrice, inStock, sortBy } = req.query;

    let filter = {}; // Store the filtering conditions

    // Keyword search (by product name or description)
    if (query) {
      filter.$or = [
        { "basicInfo.productName": { $regex: query, $options: "i" } },
        { "basicInfo.description": { $regex: query, $options: "i" } }
      ];
    }

    // Category filter
    if (categoryId) {
      filter["categoryDetails.categoryId"] = categoryId;
    }

    // Subcategory filter
    if (subCategoryId) {
      filter["categoryDetails.subCategoryId"] = subCategoryId;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter["basicInfo.price"] = {};
      if (minPrice) filter["basicInfo.price"].$gte = Number(minPrice); // Greater than or equal to minPrice
      if (maxPrice) filter["basicInfo.price"].$lte = Number(maxPrice); // Less than or equal to maxPrice
    }

    // Stock availability filter
    if (inStock === "true") {
      filter["basicInfo.stock"] = { $gt: 0 }; // Products that have stock
    }

    // Sorting (default by newest products)
    let sortOption = { _id: -1 }; // Default: newest first
    if (sortBy === "priceLowToHigh") sortOption = { "basicInfo.price": 1 };
    if (sortBy === "priceHighToLow") sortOption = { "basicInfo.price": -1 };
    if (sortBy === "rating") sortOption = { "metrics.rating": -1 };
    if (sortBy === "sales") sortOption = { "metrics.salesCount": -1 };

    // Fetch the filtered products (limit to 20 results)
    const products = await Product.find(filter).sort(sortOption).limit(12);

    res.status(200).json(products);

  } catch (error) {
    
    res.status(500).json({ message: "Error searching products", error });
    next(error);

  }
};

module.exports = {
  getHotProducts,
  getProductsByCategory,
  getNewProducts,
  getRandomProducts,
  searchProducts
}