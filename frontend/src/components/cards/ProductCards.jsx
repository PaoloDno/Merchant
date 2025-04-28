import React from "react";
import ProductImage from "../images/productImage";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaEye } from "react-icons/fa";

const ProductCards = ({ product, onAddToCart }) => {
  const { basicInfo, categoryDetails, specifications } = product;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col rounded-lg p-1 md:p-3 shadow-md w-[110px] md:w-[220px] h-[260px] 
    md:h-[330px] items-start justify-center bg-white bg-opacity-80 text-black border hover:shadow-lg 
    transition mx-auto">
      <div className="w-full h-[130px] md:h-[180px] border-skin-primary mb-1
       md:mb-3 flex items-center justify-center border-2">
        <ProductImage subcategory={categoryDetails.subcategory} />
      </div>

      <h3 className="font-semibold text-style4a truncate">{basicInfo.productName}</h3>
      <p className="text-style4a">Price: ${basicInfo.price}</p>
      <p className="text-style4">Category: {categoryDetails.category}</p>
      {specifications?.color && <p className="text-style4">Color: {specifications.color}</p>}

      <div className="mt-2 md:mt-3 flex gap-2 mx-auto">
        <button
          className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800 flex-1 flex items-center justify-center gap-1"
          onClick={() => onAddToCart(product)}
        >
          <FaCartPlus />
          <span className="hidden md:inline">Cart</span>
        </button>
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 flex-1 flex items-center justify-center gap-1"
          onClick={() => product._id && navigate(`/viewProduct/${product._id}`)}
        >
          <FaEye />
          <span className="hidden md:inline">View</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCards;
