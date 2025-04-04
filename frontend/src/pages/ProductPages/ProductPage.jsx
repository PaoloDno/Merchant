import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import ProductCards from "../../components/cards/ProductCards";
import PaginationComponent from "../../components/pagination/Pagination";
import ProductHomeSearchBar from "../../components/search/product/ProductHomeSearchBar";
import landingImg from "../../assets/b.jpg";

const ProductPage = () => {
  const dispatch = useDispatch();
  const {products, pagination} = useSelector((state) => state.product);
  const { totalPages } = pagination || {totalPages: 1};

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    productName,
    description,
    category,
    subcategory,
    bestSelling,
    minPrice,
    maxPrice,
    inStock,
    sortBy: "createdAt",
    sortOrder: "desc"
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(""); // Clear previous errors
        // Simulated API call
        const response = await fetch(`/api/products?page=${filters.page}`);
        const data = await response.json();

        if (!response.ok)
          throw new Error(data.message || "Failed to fetch products");

        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters.page]); // Runs when `filters.page` changes

  const updateFilters = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full max-w-6xl px-4 md:px-6 py-4 md:py-6">
        {loading ? (
          <p className="text-white text-lg">Loading products...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">

              <ProductHomeSearchBar
                onSearchChange={(value) => updateFilters(...value)}
              />
              {products.map((product) => (
                <ProductCards
                  key={product._id}
                  product={product}
                  onAddToCart={() => {}}
                  onViewProduct={() => {}}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-white">No products found.</p>
        )}

        {/* Pagination Component */}
        <div className="mt-4 flex justify-center w-full items-center">
          <PaginationComponent
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={(newPage) => updateFilters("page", newPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
