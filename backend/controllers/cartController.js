const Cart = require("../models/cartModels");
const Product = require("../models/productModel");

// Get Cart
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart) {
      return res.status(200).json({ message: "Cart is empty", items: [], totalPrice: 0 });
    }
    console.log(cart);

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      cart});
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
    next(error);
  }
};

// Add to Cart
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;


    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    // Find item in cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price: product.basicInfo.price });
    }

    //  Auto-update total price
    cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
    next(error);
  }
};

// Update Cart Item Quantity
exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity < 1) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;

    //  Auto-update total price
    cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
    next(error);
  }
};

// Remove Item from Cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    // Auto-update total price
    cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      cart
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
    next(error);
  }
};

// Clear Entire Cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(200).json({ 
      success: true,
      message: "Cart cleared successfully" });
  } catch (error) {
    next(error);
  }
};


