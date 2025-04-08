import React from "react";
import ProductImage from "../images/productImage";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaEye } from "react-icons/fa";

const ProductCards = ({ product, onAddToCart }) => {
  const { basicInfo, categoryDetails, specifications } = product;
  const navigate = useNavigate();

  return (
    <div className="rounded-lg p-3 shadow-md w-[150px] md:w-[220px] bg-white border hover:shadow-lg transition">
      <div className="w-full h-[130px] md:h-[180px] border mb-3 flex items-center justify-center">
        <ProductImage subcategory={categoryDetails.subcategory} />
      </div>

      <h3 className="font-semibold truncate">{basicInfo.productName}</h3>
      <p className="text-sm">Price: ${basicInfo.price}</p>
      <p className="text-sm">Category: {categoryDetails.category}</p>
      {specifications?.color && <p className="text-sm">Color: {specifications.color}</p>}

      <div className="mt-3 flex gap-2">
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
