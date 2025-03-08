const Order = require("../models/orderModel");
const Cart = require("../models/cartModels");
const Product = require("../models/productModel");

// ✅ Create an Order
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty, cannot place order" });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      productName: item.productId.basicInfo.productName,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalPrice = cart.totalPrice;

    const newOrder = new Order({
      userId: req.user.id,
      items: orderItems,
      totalPrice,
      status: "Pending", // Default status
    });

    await newOrder.save();

    // Update product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { "basicInfo.stock": -item.quantity, "metrics.salesCount": item.quantity },
      });
    }

    // Clear user cart
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [], totalPrice: 0 });

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// 📜 Get Order History for a User
exports.getOrderHistoryUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order history", error });
  }
};

// 📦 Get Order Details by Order ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("userId", "username");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order details", error });
  }
};

// 🔥 Get All Orders (Admin/Seller)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "username").sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders", error });
  }
};
