import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartAction } from "../../../redux/actions/cartThunks";
import { FiShoppingCart } from "react-icons/fi";

const CartInitializer = ({ handlePopup }) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state?.cart?.items || []);
  const totalCount = items.length;

  // Fetch cart items once on mount
  useEffect(() => {
    dispatch(getCartAction());
  }, [dispatch]);

  return (
    <button
      onClick={() => handlePopup("cart")}
      aria-label="Cart"
      className="flex relative justify-center items-center rounded-[0.375rem] hover:bg-skin-fill-3 
        hover:text-skin-secondary box-content aspect-square w-10 transition-all duration-300
        ease-in-out hover:rounded-full hover:scale-110"
    >
      <FiShoppingCart />
      <div className="absolute top-0 right-0 z-10 w-5 h-5 text-style4 p-1 text-white bg-red-800 bg-opacity-80">
        {totalCount}
      </div>
    </button>
  );
};

export default CartInitializer;
