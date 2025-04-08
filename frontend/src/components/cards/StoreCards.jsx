import React from "react";

const StoreCards = ({ store, onviewStore }) => {
  const { storeName, storeDescription, address } = store;

  return (
    <div className="border rounded-lg p-3 shadow-md w-[150px] md:w-[220px] bg-white hover:shadow-lg transition">
      <h3 className="text-black font-semibold truncate">{storeName}</h3>
      <p className="text-sm text-gray-700">{storeDescription}</p>
      <p className="text-sm text-gray-600 italic">{address}</p>

      <button
        className="mt-3 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 w-full"
        onClick={() => onviewStore(store)}
      >
        View Store
      </button>
    </div>
  );
};

export default StoreCards;
