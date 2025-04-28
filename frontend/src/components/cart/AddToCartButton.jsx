import React from "react"
import { addToCartAction } from "../../redux/actions/cartThunks"
import { useDispatch } from "react-redux";

export const AddToCartButton = ({productId}) => {

  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCartAction(productId));
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
