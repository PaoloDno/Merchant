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

  useEffect(() => {
    if (cartItems.length === 0) {
      setCartItems(defaultItems);
    }
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className={`animate-opacityAnimation flex flex-col items-center
      justify-between w-full h-[75vh] box-border border border-skin-primary
      text-skin-primary py-2 px-2 rounded-b-lg rounded-t-xl mb-4 text-style4a md:text-style3`}
    >
      <div className="flex flex-col w-full bg-white text-black h-full p-2 rounded-md">
        <h2 className="text-style4 md:text-style3 font-semibold my-4 w-full flex flex-row items-center space-x-2">
          <FiShoppingCart className="text-style3a md:text-style3b" />
          <span className="text-style4a md:text-style3a">Shopping Cart</span>
        </h2>

        <div
          className={`flex flex-col w-full space-y-2 overflow-y-auto overflow-x-hidden p-4 h-[60vh]
          border-t border-b border-skin-primary py-5`}
        >
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between px-2 py-3 bg-slate-200 border-skin-primary 
              border-2 rounded-lg text-style4a md:text-style3"
            >
              <div className="flex flex-col">
                <h3 className="text-style3 md:text-style3a font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-600">Price: <span className="text-gray-950"> ${item.price.toFixed(2)}</span></p>
                <p className="text-gray-600">Quantity: <span className="text-gray-950"> {item.quantity} </span></p>
              </div>
              <div className="flex space-x-3">
                <button
                  className="bg-blue-300 bg-opacity-25 font-bold rounded-lg items-center justify-center p-2 md:p-4 border-skin-primary border
                  text-gray-500 hover:text-blue-800 hover:bg-gray-100 flex flex-row text-style4a md:text-style3"
                  aria-label="See Details"
                >
                  <FaRegEye size={20} /> <span> Details </span>
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-300 bg-opacity-25 font-bold rounded-lg items-center justify-center p-2 md:p-4 border-skin-primary border
                  text-gray-500 hover:text-red-800 hover:bg-gray-100 flex flex-row text-style4a md:text-style3"
                  aria-label="Remove item"
                >
                  <VscTrash size={20} /> <span> Delete </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 mb-2 border-t border-skin-high w-full">
          <div className="flex justify-between text-style3 md:text-style3a font-medium">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full mt-4 bg-skin-secondary text-skin-primary font-semibold py-2 rounded-lg hover:bg-skin-secondary-hover transition-colors duration-300"
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
