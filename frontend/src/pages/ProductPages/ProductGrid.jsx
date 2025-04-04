import React from "react";
import ProductCard from "../../components/cards/ProductCards";

const ProductGrid = ({ products }) => {
  if (!products?.length) {
    return (
      <p className="text-center text-gray-500 mt-4">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
