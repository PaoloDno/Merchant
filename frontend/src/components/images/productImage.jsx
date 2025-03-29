import React from "react";

const ProductImage = ({ subcategory }) => {
  const productImage = `//folder/${subcategory}.jpg`;

  return (
    <img 
      src={productImage} 
      alt={subcategory} 
      className="w-16 h-16 sm:rounded-full md:rounded-lg object-cover mx-auto"
    />
  );
};


export default ProductImage;