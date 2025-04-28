import React, { useEffect, useState } from "react";
import { getCartAction } from "../../redux/actions/cartThunks";
import { useDispatch, useSelector} from "react-redux";

import { FiShoppingCart } from "react-icons/fi";

const CartInitializer = ({ handlePopup }) => {
  
  const dispatch = useDispatch();
  const items  = useSelector((state) => state?.cart?.items || [] );

  const [ loading, setLoading ] = useState(false);
  const [ error, setError] = useState(null);
  useEffect(() => {
    setTotalCount(items.length() || 0);
  }, [items]);

  useEffect(() => {
    let isMounted = false;
    setLoading(true);

    if (loading && isMounted) initializeCart();


    return () => isMounted = false;
  })

  const initializeCart = async(isMounted) => {
    if (isMounted && loading){
      try {
      const result = await dispatch(getCartAction);
      if(result?.payload){
        setCartItems(result?.payload?.cart?.items);
      }
    } catch {
      console.log(error);
    } finally {
      setLoading(false);
    }}
  };

  const [ totalCount, setTotalCount ] = useState(0);
  const [ cartItems, setCartItems ] = useState([]);

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
