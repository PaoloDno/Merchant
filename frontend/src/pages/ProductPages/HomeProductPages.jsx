import React, { useEffect, useState } from "react";
import ProductCards from "../../components/cards/ProductCards";
import PaginationComponent from "../../components/pagination/Pagination";
import ProductHomeSearchBar from "../../components/search/product/ProductHomeSearchBar";
import landingImg from "../../assets/b.jpg";

import { useDispatch, useSelector } from "react-redux";
import { getNewProductsActions, searchProductActions } from "../../redux/actions/getProductThunks";

const ProductPage = () => {
  const dispatch = useDispatch();

  // Get product data from Redux state
  const { products = [], loading, error, pagination } = useSelector((state) => state.product);

  // Local state for managing displayed products
  const [fetchProducts, setFetchedProducts] = useState([]);

  // Filters state
  const [filters, setFilters] = useState({ page: 1 });

  // Fetch initial products
  useEffect(() => {
    dispatch(getNewProductsActions(filters.page));
  }, [dispatch]);

  // Search with delay (debounce-like effect)
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(searchProductActions(filters));
    }, 1000); // 1 second delay to avoid excessive API calls

    return () => clearTimeout(timeout); // Cleanup timeout on filter change
  }, [filters, dispatch]);

  // Update fetched products when Redux `products` change
  useEffect(() => {
    if (products && products.length !== fetchProducts.length) {
      setFetchedProducts(products);
    }
  }, [products]);

  // Update filters for search, sorting, etc.
  const updateFilters = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>

      {/* Search Bar */}
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 md:gap-8 w-full max-w-6xl px-4 md:px-6 py-4 md:py-6">
        <ProductHomeSearchBar onSearchChange={(filter) => updateFilters(filter.key, filter.value)} />


        {loading ? (
          <p className="text-white text-lg">Loading products...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : Array.isArray(fetchProducts) && fetchProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {fetchProducts.map((product) => (
              <ProductCards key={product._id} product={product} onAddToCart={() => {}} onViewProduct={() => {}} />
            ))}
          </div>
        ) : (
          <p className="text-white">No products found.</p>
        )}

        {/* Pagination Component */}
        {pagination?.totalPages > 1 && (
          <div className="mt-4 flex justify-center w-full items-center">
            <PaginationComponent
              currentPage={filters.page}
              totalPages={pagination.totalPages}
              onPageChange={(newPage) => updateFilters("page", newPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
