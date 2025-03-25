import React from "react";
import { useDispatch } from "react-redux";
import { adminGetProfiles } from "../../../redux/actions/adminThunks";
import { getHotProductsActions } from "../../../redux/actions/getProductThunks";

const DisplayProductAdmin = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center w-full h-full items-center gap-4">
      {/* Button to fetch admin profiles */}
      <button
        onClick={() => dispatch(adminGetProfiles())}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Get Admin Profiles
      </button>

      {/* Button to fetch hot products */}
      <button
        onClick={() => dispatch(getHotProductsActions())}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Get Hot Products
      </button>
    </div>
  );
};

export default DisplayProductAdmin;
