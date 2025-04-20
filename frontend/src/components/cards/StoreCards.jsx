import React from "react";
import { useNavigate } from "react-router-dom";
import StoreImage from "../images/storeImage";
import StoreBanner from "../images/storeBanner";

const StoreCards = React.memo(({ store }) => {
  const navigate = useNavigate();
  const { _id, storeName, storeDescription, address, storeLogo, storeBanner } = store;

  const handleViewStore = () => {
    navigate(`/store/${_id}`);
  };

  return (
    <div className="flex flex-col border rounded-lg p-3 shadow-md w-[110px] md:w-[220px] h-[260px] md:h-[330px] justify-between md:m-4 bg-white hover:shadow-lg transition">
      <div className="flex justify-center items-center relative">
        <div className="w-full h-20 flex overflow-hidden justify-center">
          <StoreBanner storeBanner={storeBanner} className="object-cover" />
        </div>
        <div className="absolute w-12 h-12 rounded-full border-2 border-white overflow-hidden left-1 top-1/3">
          <StoreImage storeLogo={storeLogo} />
        </div>
      </div>

      <div>
        <h3 className="text-black font-semibold text-style4a truncate">{storeName}</h3>
        <p className="text-sm text-gray-700 truncate">{storeDescription}</p>
        <p className="text-gray-600 italic text-style4 truncate">{address}</p>
      </div>

      <button
        className="mt-3 text-style4 md:text-style4a bg-gray-500 text-white px-3 py-1 rounded hover:bg-skin-primary hover:text-skin-primary w-full"
        onClick={handleViewStore}
      >
        View Store
      </button>
    </div>
  );
});

export default StoreCards;
