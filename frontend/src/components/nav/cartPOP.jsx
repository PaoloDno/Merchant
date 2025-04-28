import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VscTrash } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";

import { getCartAction } from "../../redux/actions/cartThunks";

const CartPopUp = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.cart || { items: [] });
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]); // initially empty
  const [cartDet, setCartDet] = useState(false);

  const defaultItems = [
    {
      id: 1,
      product: {
        basicInfo: {
          productName: "Azus",
          description: "Default Laptop",
          price: "30000",
          stock: "14",
        },
        categoryDetails: {
          category: "Electronics",
          subcategory: "laptop",
        },
        specifications: {},
        metric: {},
        seller: {},
        reviews: {},
      },
      quantity: 1,
      price: 30000,
    },
    {
      id: 2,
      product: {
        basicInfo: {
          productName: "Coca-Cola",
          description: "coke",
          price: "35",
          stock: "1000",
        },
        categoryDetails: {
          category: "Food",
          subcategory: "softdrinks",
        },
        specifications: {},
        metric: {},
        seller: {},
        reviews: {},
      },
      quantity: 2,
      price: 35,
    },
    {
      id: 3,
      product: {
        basicInfo: {
          productName: "Black Adidas",
          description: "black adidas",
          price: "7500",
          stock: "20",
        },
        categoryDetails: {
          category: "Fashion",
          subcategory: "footwear",
        },
        specifications: {},
        metric: {},
        seller: {},
        reviews: {},
      },
      quantity: 1,
      price: 230,
    },
  ];

  const handleRefreshCart = async () => {
    setLoading(true);

    try {
      const result = await dispatch(getCartAction());
      if (result?.payload) {
        console.log(result.payload);
        setCartItems(result.payload.items || defaultItems);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Always stop loading after 1 second
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initializeItems = () => {
      if (isMounted) {
        if (items && items.length > 0) {
          setCartItems(items);
        } else {
          setCartItems(defaultItems);
        }
      }
    };

    initializeItems();

    return () => (isMounted = false);
  }, [items]);

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const summarizedItems = cartItems.map((item) => ({
    name: item.product?.basicInfo?.productName || "Unknown Product",
    unitPrice: item.price,
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
  }));

  return (
    <div
      className="animate-opacityAnimation flex flex-col items-center
      justify-center w-full h-[90vh] box-border border-2 border-skin-primary p-2
      pb-4 px-3 rounded-b-lg rounded-t-xl mb-4 text-style4a md:text-style3"
    >
      <div className="flex flex-col w-full bg-skin-fill-3 text-skin-secondary
       h-full px-5 rounded-md relative space-y-2"
      >
        {/* Header */}
        <div className="flex flex-row justify-between items-center my-4 w-full">
          <div className="flex items-center space-x-2">
            <FiShoppingCart className="text-style3" />
            <span className="font-semibold">Shopping Cart</span>
          </div>
          <button
            onClick={handleRefreshCart}
            className="flex px-2 justify-center text-center p-1 border rounded-md bg-skin-fill-2 hover:bg-gray-100"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Cart Details */}
        <div
          className={`flex flex-col w-full space-y-3 overflow-y-auto overflow-x-hidden p-4 h-full max-h-[50vh]
           border-t border-b border-skin-primary pt-1 md:pt-6
           ${
             cartDet
               ? "bg-white text-black animate-opacityAnimation"
               : "bg-skin-fill-1 bg-opacity-10 text-skin-primary"
           }`}
        >
          {cartDet ? (
            // Numeric Breakdown
            <div className="flex flex-col w-full h-full py-2">
              <h3 className="text-black text-style3 font-semibold bg-gray-200 px-2">Cart Summary</h3>
              <p className="text-gray-950 text-style4a px-3">Total items: {totalItems}</p>
              {summarizedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between p-4 rounded-sm bg-gray-100 text-gray-900"
                >
                  <div>
                    <span className="font-semibold">{index + 1}. {item.name}</span>
                    <div>Unit Price: ${item.unitPrice} x {item.quantity}</div>
                  </div>
                  <div className="font-bold">${item.totalPrice.toFixed(2)}</div>
                </div>
              ))}
            </div>
          ) : (
            // Detailed Cart Items
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-center w-full px-2 py-3 bg-slate-100 border-2 rounded-lg text-style4a md:text-style3 border-black"
              >
                <div className="block w-[5rem] h-[5rem] md:h-[6rem] md:w-[6rem] border rounded-md bg-skin-fill-1 border-black bg-opacity-45" />
                <div className="flex-1 mx-4 my-1">
                  <h3 className="text-style3 font-medium text-gray-900">
                    {item.product?.basicInfo?.productName || "Unknown Product"}
                  </h3>
                  <p className="text-gray-600">Price: <span className="text-gray-950">${item.price}</span></p>
                  <p className="text-gray-600">Quantity: <span className="text-gray-950">{item.quantity}</span></p>
                  <p className="text-gray-800">
                    Price x Quantity: <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>

                <div className="flex flex-row space-x-3">
                  <button
                    className="p-3 bg-blue-200 text-black border border-skin-primary rounded-lg hover:bg-gray-100 hover:text-blue-400"
                    aria-label="See Details"
                  >
                    <FaRegEye size={20} />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-3 bg-red-300 text-black border border-skin-primary rounded-lg hover:bg-gray-100 hover:text-red-800"
                    aria-label="Remove item"
                  >
                    <VscTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Toggle */}
        <button
          className="flex p-2 items-center justify-center text-black text-style4a my-2 underline hover:text-skin-high"
          onClick={() => setCartDet(!cartDet)}
        >
          {cartDet ? "Show item details" : "Show numeric breakdown"}
        </button>

        {/* Total */}
        <div className="mt-6 mb-2 border-t border-skin-high w-full">
          <div className="flex justify-between text-style3 font-medium">
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
