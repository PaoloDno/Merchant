import React from "react"
import { removeFromCartAction } from "../../redux/actions/cartThunks"
import { useDispatch } from "react-redux";

export const AddToCartButton = ({productId}) => {

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(removeFromCartAction(productId));
  };

  return (
    <button
      onClick={handleAdd}
      className=""
    >
      Add to Cart
    </button>
  )
};

export default AddToCartButton;
