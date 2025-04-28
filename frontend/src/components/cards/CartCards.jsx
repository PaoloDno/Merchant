import React from "react";

import ProductImage from "../images/productImage";

export const CartCardsMini = ({ subcategory, ProductName, price, quantity }) => {
    
  return (
    <div className="flex flex-row w-full bg-slate-300 p-2 bg-opacity-75 container">
      <div className="flex bg-cover w-6 h-6">
        <ProductImage subcategory={subcategory} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-style4a font-bold">{ProductName}</h3>
        <span className="flex justify-between w-full">
          <p className="text-style4 font-bold w-1/3 text-right">{price} x {quantity}</p>
          <p className="text-style4 font-semibold w-1/2 text-center">{quantity * price}</p>
        </span>
      </div>
    </div>
  );
};