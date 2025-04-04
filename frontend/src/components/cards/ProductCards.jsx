import React from "react";
import ProductImage from "../images/productImage";
import { useNavigate } from "react-router-dom";

const ProductCards = ({ product, onAddToCart, onViewProduct }) => {
  const { basicInfo, categoryDetails, specifications } = product;
  const navigate = useNavigate();

  return (
    <div className="rounded-lg p-4 shadow-md w-25 md:w-54 container items-center bg-white text-black border border-skin-secondary">
      <div className="w-full h-1/2 border border-skin-primary mb-2">
      < ProductImage subcategory={categoryDetails.subcategory} />
      </div>
      <h3 className="text-style4a font-bold">{basicInfo.productName}</h3>
      <p className="text-style4">{basicInfo.description}</p>
      <p className="font-semibold">Price: ${basicInfo.price}</p>
      <p className="text-style4">Category: {categoryDetails.category}</p>
      {specifications?.color && <p className="text-style4">Color: {specifications.color}</p>}

      <div className="mt-3 flex space-x-2">
        <button 
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" 
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
        <button 
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" 
          onClick={() => product._id && navigate(`/viewProduct/${product._id}`)}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCards;

