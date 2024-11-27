import React from "react";

const ProductListPage = ({ hotProducts, randomProducts, onSearch }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Search Products</h1>
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Hot Right Now */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Hot Right Now</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {hotProducts && hotProducts.length > 0 ? (
            hotProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full">No hot products found.</p>
          )}
        </div>
      </div>

      {/* Random Finds */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Random Finds</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {randomProducts && randomProducts.length > 0 ? (
            randomProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full">No random finds available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
