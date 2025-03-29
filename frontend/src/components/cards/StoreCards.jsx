import React from "react"

const StoreCards = ({ store, onviewStore }) => {
  const {storeName, storeDescription, address} = store;
  
  return (
    <div className="border rounded-lg p-4 shadow-md w-25 md:w-54 text-skin-primary">
    <h3 className="text-style4a font-bold">{storeName}</h3>
    <p className="text-style4">{storeDescription}</p>
    <p className="text-style4">{address}</p>
    </div>
  )
};

export default StoreCards;