const Cart = require("../models/Cart");
const Order = require("../models/Order");
const OrderHistory = require("../models/orderHistorySchema");

exports.processOrder = async (req, res, next) => {
  try {
    const { userId } = req.user; // Authenticated user
    const { selectedItems } = req.body; // Optional: User-selected products

    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let itemsToOrder = [];

    if (selectedItems && selectedItems.length > 0) {
      // If user selects specific items, filter them from the cart
      itemsToOrder = cart.items.filter((item) =>
        selectedItems.includes(item.productId.toString())
      );
    } else {
      // If no selection, order everything in the cart
      itemsToOrder = cart.items;
    }

    if (itemsToOrder.length === 0) {
      return res.status(400).json({ message: "No valid items to order" });
    }

    // Calculate total price
    const totalPrice = itemsToOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create Order
    const order = new Order({
      userId,
      items: itemsToOrder,
      totalPrice,
      status: "pending",
    });

    await order.save();

    // Add order to OrderHistory
    let orderHistory = await OrderHistory.findOne({ userId });

    if (!orderHistory) {
      // If no history exists, create a new record
      orderHistory = new OrderHistory({
        userId,
        orders: [order._id],
      });
    } else {
      // If history exists, push the new order into the array
      orderHistory.orders.push(order._id);
      orderHistory.lastUpdated = Date.now();
    }

    await orderHistory.save();

    // Remove ordered items from cart
    cart.items = cart.items.filter((item) => 
      !selectedItems || !selectedItems.includes(item.productId.toString())
    );
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    next(error);
  }
};

module.exports = { processOrder };