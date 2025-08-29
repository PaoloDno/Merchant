import React from "react"
import { removeFromCartAction } from "../../redux/actions/cartThunks"
import { useDispatch } from "react-redux";

export const RemoveToCartButton = ({productId}) => {

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(removeFromCartAction(productId));
  };

  return (
    <button
      onClick={handleAdd}
      className=""
    >
      Remove to Cart
    </button>
  )
};

export default RemoveToCartButton;
