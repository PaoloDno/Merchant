import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VscTrash } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";

const CartPopUp = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart?.items || []);
  let defaultItems = [];
  useEffect(() =>  {
  let isMounted = true;
  if (isMounted) {
    defaultItems = items || [
      { id: 1, name: "Laptop", price: 999.99, quantity: 1 },
      { id: 2, name: "Headphones", price: 199.99, quantity: 2 },
      { id: 3, name: "Smartphone", price: 799.99, quantity: 1 },
    ];
  }}, []);

  // cart items
  const [ cartItems, setCartItems ] = useState(defaultItems);
  const [ cartDet, setCartDet ] = useState(false);

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
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0 );

  // 
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Summarize cart items for numeric breakdown
  const summarizedItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.price * item.quantity;
    } else {
      acc.push({
        name: item.name,
        unitPrice: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      });
    }
    return acc;
  }, []);

  return (
    <div
      className={`animate-opacityAnimation flex flex-col items-center
      justify-center w-full h-[90vh] box-border border border-2px border-skin-primary p-2
      pb-4 px-3 rounded-b-lg rounded-t-xl
      mb-4 text-style4a md:text-style3`}
    >
      <div
        className="flex flex-col w-full bg-skin-fill-3 text-skin-secondary
       h-full px-5 rounded-md relative space-y-2"
      >
        <h2
          className="text-style4a md:text-style3 font-semibold my-4 w-full
         flex flex-row items-center space-x-2"
        >
          <FiShoppingCart className="text-style3 mr-[1rem]" />
          Shopping Cart
        </h2>

        {/* Cart Details - Toggle between detailed view and numeric summary */}
        <div
          className={`flex flex-col w-full space-y-3 overflow-y-auto
          overflow-x-hidden p-4 h-full max-h-[50vh]
         border-t border-b border-skin-primary pt-1 md:pt-6
         ${
           cartDet
             ? "bg-white text-black animate-opacityAnimation"
             : "bg-skin-fill-1 bg-opacity-10 text-skin-primary"
         }`}
        >
          {cartDet ? (
            // Numeric Breakdown (Detailed Receipt Summary)
            <div className="flex flex-col w-full h-full py-1 md:py-2 box-content">
              <h3
                className="text-black text-style3
                md:text-style3b font-semibold bg-gray-200 px-2"
              >
                Cart Summary
              </h3>

              <p
                className="text-gray-950 text-style4a px-3
              md:text-style3"
              >
                Total items: {totalItems}
              </p>
              {summarizedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex md:flex-row items-start space-y-5 justify-between p-1 md:p-4
              rounded-sm md:text-style3 text-gray-900"
                >
                  <div
                    className="flex flex-col w-full space-y-3
                bg-gray-400 bg-opacity-25 p-2"
                  >
                    <span
                      className="flex flex-nowrap text-style4a font-semibold
                  text-black overflow-hidden"
                    >
                      {index + 1}. {item.name}
                    </span>
                    <span
                      className="flex flex-nowrap text-style4a overflow-hidden
                  text-slate-800
                  "
                    >
                      Unit Price: ${item.unitPrice.toFixed(2)} x {item.quantity}
                    </span>
                  </div>
                  <span
                    className="flex flex-nowrap text-style4a px-5 justify-center 
                    align-center font-semibold
                  text-black overflow-hidden"
                  >
                    ${item.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            // Detailed Cart Items with Delete Button
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row
                 items-center justify-center w-full
                 px-2 py-3 bg-slate-100 border-2 
                  rounded-lg mr-3 
                 text-style4a md:text-style3 border-black"
              >
                <div className="block w-[5rem] h-[5rem] md:h-[6rem] md:w-[6rem] border rounded-md 
                bg-skin-fill-1 border-black bg-opacity-45">
                  {/* Product Image Placeholder */}
                </div>

                <div className="flex-1 mx-4 my-1">
                  <div className="flex flex-col">
                    <h3 className="text-style3 md:text-style4a font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-style4a">
                      Price:{" "}
                      <span className="text-gray-950">
                        ${item.price.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-gray-600 text-style4a">
                      Quantity:{" "}
                      <span className="text-gray-950">{item.quantity}</span>
                    </p>
                    <p className="text-gray-800 text-style4a">
                      Price x Quantity:{" "}
                      <span className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex w-full md:w-auto items-center justify-center space-x-4
                 flex-row space-y-1 md:space-y-0 md:space-x-3">
                  <button
                    className="flex items-center justify-center p-2 md:p-3 bg-blue-200 text-black
                    border border-skin-primary rounded-lg hover:bg-gray-100 hover:text-blue-400"
                    aria-label="See Details"
                  >
                    <FaRegEye size={20} />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="flex items-center justify-center p-2 md:p-3 bg-red-300 border text-black
                     border-skin-primary rounded-lg hover:bg-gray-100 hover:text-red-800"
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
          className="flex p-2 items-center justify-center text-black text-style4a my-2 underline hover:text-skin-high"
          onClick={() => setCartDet(!cartDet)}
        >
          {cartDet ? "Show item details" : "Show numeric breakdown"}
        </button>

        {/* Total & Checkout */}
        <div className="mt-6 mb-2 border-t border-skin-high w-full">
          <div className="flex justify-between text-style3 md:text-style3a font-medium">
            <span>CART TOTAL:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full mt-4 bg-skin-fill-1 text-skin-primary font-semibold py-2 rounded-lg hover:bg-skin-button-secondary hover:text-skin-secondary transition-colors duration-300"
            aria-label="Cart Button"
          >
            GO TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopUp;
