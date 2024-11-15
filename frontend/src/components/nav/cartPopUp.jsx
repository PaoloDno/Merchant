import React, { useState, useEffect } from "react";
import { VscAccount, VscTrash } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";

const CartPopUp = ({ isOpened }) => {
  const defaultItems = [
    { id: 1, name: "Laptop", price: 999.99, quantity: 1 },
    { id: 2, name: "Headphones", price: 199.99, quantity: 2 },
    { id: 3, name: "Smartphone", price: 799.99, quantity: 1 },
  ];

  const [cartItems, setCartItems] = useState([]);
  const [cartDet, setCartDet] = useState(false);

  // useEffect to set default cart items
  useEffect(() => {
    if (cartItems.length === 0) {
      setCartItems(defaultItems);
    }
  }, [cartItems]);

  // Function to remove an item by ID
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total price and total items
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Summarize cart items for numeric breakdown
  const summarizedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.price * item.quantity;
    } else {
      acc.push({ name: item.name, unitPrice: item.price, quantity: item.quantity, totalPrice: item.price * item.quantity });
    }
    return acc;
  }, []);

  return (
    <div
      className={`animate-opacityAnimation transform-origin-left flex flex-col items-end
       justify-between w-full h-[70vh] bg-skin-button-primary box-border
       text-skin-primary py-2 px-2 rounded-b-lg rounded-t-xl mb-4`}
    >
      <h2 className="text-style4 md:text-style3 font-semibold mb-4 w-full flex items-center space-x-2">
        <FiShoppingCart className="text-style3" />
        <span>Shopping Cart</span>
      </h2>

      {/* Cart Details - Toggle between detailed view and numeric summary */}
      <div
        className={`flex flex-col w-full space-y-4 overflow-y-auto overflow-x-hidden p-4 h-[60vh]
         border-t border-b border-skin-primary py-4 ${cartDet ? "bg-white text-black animate-opacityAnimation" : "bg-skin-primary text-skin-high"}`}
      >
        {cartDet ? (
          // Numeric Breakdown (Detailed Receipt Summary)
          <div className="flex flex-col w-full space-y-2">
            <h3 className="text-lg font-semibold">Cart Summary</h3>
            <p className="text-gray-500">Total items: {totalItems}</p>
            {summarizedItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-gray-700">
                <div>
                  <span className="text-style3 font-medium">{item.name}</span>
                  <p className="text-sm text-gray-500">
                    Unit Price: ${item.unitPrice.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <span className="font-semibold">${item.totalPrice.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          // Detailed Cart Items with Delete Button
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex box-border w-full items-center justify-between px-4 py-5 bg-slate-200 border-skin-primary border-2 rounded-lg mr-3 text-sm"
            >
              <div>
                <h3 className="text-style3 font-medium text-gray-700">{item.name}</h3>
                <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove item"
                >
                  <VscTrash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Toggle Button for Detailed View / Numeric Summary */}
      <button
        className="mt-2 text-skin-high text-sm underline hover:text-gray-700"
        onClick={() => setCartDet(!cartDet)}
      >
        {cartDet ? "Show item details" : "Show numeric breakdown"}
      </button>

      {/* Total & Checkout */}
      <div className="mt-6 border-t border-gray-200 pt-4 w-full">
        <div className="flex justify-between text-lg font-medium">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="w-full mt-4 bg-skin-button-secondary text-skin-primary font-semibold py-2 rounded-lg hover:bg-skin-button-secondary-hover transition-colors duration-300"
          aria-label="Checkout button"
        >
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
};

export default CartPopUp;
