import React, { useState, useEffect } from "react";
import { VscTrash } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";

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
    <div className={`animate-opacityAnimation flex flex-col items-center
      justify-between w-full h-[75vh] box-border border border-skin-primary
      text-skin-primary py-2 px-2 rounded-b-lg rounded-t-xl
       mb-4 text-style4a md:text-style3`}
    >
      <div className="flex flex-col w-full bg-white text-black h-full p-2 
      rounded-md">
        <h2 className="text-style4 md:text-style3 font-semibold my-4 
        w-full flex flex-row items-center space-x-2">
          <FiShoppingCart className="text-style3a md:text-style3b" />
          <span className="text-style4a md:text-style3a">Shopping Cart</span>
        </h2>

      {/* Cart Details - Toggle between detailed view and numeric summary */}
      <div
        className={`flex flex-col w-full space-y-2 overflow-y-auto overflow-x-hidden p-4 h-full
         border-t border-b border-skin-primary py-5 
         ${cartDet ? "bg-white text-black animate-opacityAnimation" : "bg-skin-primary bg-opacity-25 text-skin-high"}`}
      >
        {cartDet ? (
          // Numeric Breakdown (Detailed Receipt Summary)
          <div className="flex flex-col w-full space-y-3 h-full py-3 box-content">
            <h3 className="text-black text-style3a md:text-style3b font-semibold">Cart Summary</h3>
            <p className="text-gray-950">Total items: {totalItems}</p>
            {summarizedItems.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start flex-between box-border p-2 md:p-4 
              justify-center bg-slate-300 rounded-md text-style-3 text-gray-900">
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-black">{item.name}</span>
                  <p className="text-style4a my-2">
                    Unit Price: ${item.unitPrice.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <span className="font-semibold py-2"> ${item.totalPrice.toFixed(2)}</span>
              </div>
            ))}
          </div>
        ) : (
          // Detailed Cart Items with Delete Button
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col box-border w-full items-center 
              justify-between px-2 py-3 bg-slate-100 border-skin-primary 
              border-2 rounded-lg mr-3 text-style4a md:text-style3"
            >
              <div className="block w-20 h-20 md:h-40 md:w-40 border rounded-md bg-skin-secondary border-skin-primary">

              </div>
              <div className="flex flex-col my-3">
                <h3 className="text-style3 md:text-style3a font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-600">Price: <span className="text-gray-950"> ${item.price.toFixed(2)}</span></p>
                <p className="text-gray-600">Quantity: <span className="text-gray-950"> {item.quantity} </span></p>              
                <p className="text-gray-800">
                  Price x Quantity: <span>${(item.price * item.quantity).toFixed(2)} </span>
                </p>
              </div>
              <div className="flex flex-col space-y-1 space-x-0 md:flex-row md:space-x-3 ">
                <button
                  className="bg-blue-300 w-full bg-opacity-25 font-bold rounded-lg items-center justify-center p-2 md:p-4 border-skin-primary border
                  text-black hover:text-blue-800 hover:bg-gray-100 flex flex-row text-style4a md:text-style3"
                  aria-label="See Details"
                >
                  <FaRegEye size={20} /> <span> Details </span>
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-300 w-full bg-opacity-25 font-bold rounded-lg items-center justify-center p-2 md:p-4 border-skin-primary border
                   text-black hover:text-red-800 hover:bg-gray-100 flex flex-row text-style4a md:text-style3"
                  aria-label="Remove item"
                >
                  <VscTrash size={20} /> <span> Delete </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Toggle Button for Detailed View / Numeric Summary */}
      <button
        className="text-black text-style4a my-3 underline hover:text-skin-high"
        onClick={() => setCartDet(!cartDet)}
      >
        {cartDet ? "Show item details" : "Show numeric breakdown"}
      </button>

      {/* Total & Checkout */}
      <div className="mt-6 mb-2 border-t border-skin-high w-full">
        <div className="flex justify-between text-style3 md:text-style3a font-medium">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="w-full mt-4 bg-skin-button-primary text-skin-button font-semibold py-2 rounded-lg hover:bg-skin-button-secondary hover:text-skin-secondary transition-colors duration-300"
          aria-label="Checkout button"
        >
          Proceed to Checkout
        </button>
      </div>

    </div>
    </div>
  );
};

export default CartPopUp;
