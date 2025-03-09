const Cart = require("../models/cartModels");
const Order = require("../models/orderModel");
const OrderHistory = require("../models/orderHistorySchema");
const Product = require("../models/productModel");

// Process & Create Order
exports.processOrder = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { selectedItems } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let itemsToOrder = selectedItems?.length > 0 
      ? cart.items.filter(item => selectedItems.includes(item.productId._id.toString()))
      : cart.items;

    if (itemsToOrder.length === 0) {
      return res.status(400).json({ message: "No valid items to order" });
    }

    const orderItems = itemsToOrder.map((item) => ({
      productId: item.productId._id,
      productName: item.productId.basicInfo.productName,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = new Order({
      userId,
      items: orderItems,
      totalPrice,
      status: "Pending",
    });

    await newOrder.save();

    // Update product stock
    for (const item of itemsToOrder) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: { "basicInfo.stock": -item.quantity, "metrics.salesCount": item.quantity },
      });
    }

    // Update Order History
    let orderHistory = await OrderHistory.findOne({ userId });
    if (!orderHistory) {
      orderHistory = new OrderHistory({ userId, orders: [newOrder._id] });
    } else {
      orderHistory.orders.push(newOrder._id);
      orderHistory.lastUpdated = Date.now();
    }
    await orderHistory.save();

    // Remove ordered items from cart
    cart.items = cart.items.filter(item => !selectedItems || !selectedItems.includes(item.productId._id.toString()));
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    next(error);
  }
};

// Get Order History for User
exports.getOrderHistoryUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order history", error });
  }
};

// Get Order Details by Order ID
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

// Get All Orders (Seller)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "username").sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders", error });
  }
};

