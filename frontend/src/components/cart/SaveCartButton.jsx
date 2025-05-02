import React from "react";
import { updateCartAction } from "../../redux/actions/cartThunks";
import { useDispatch } from "react-redux";


const SaveCartButton = ({itemsData}) => {
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateCartAction(itemsData));
  }

  return (
    <button
      onClick={handleSave}
      className=""
    >
      Save
    </button>  )
};

export default SaveCartButton;