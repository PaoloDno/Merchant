import React from "react";
import { clearCartAction } from "../../redux/actions/cartThunks";
import { useDispatch } from "react-redux";

export const ClearCartButton = () => {
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch( clearCartAction())
  }

  return (
    <button
    onClick={handleClear}
    className=""
    >
      Clear
    </button>
  )
};

export default ClearCartButton;
