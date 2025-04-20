import React, { useState, useEffect, useCallback } from "react";
import ProductRow from "../../pages/ProductPages/ProductsRowSection";
import ProductHomeSearchBar from "../../components/search/product/ProductHomeSearchBar";
import PaginationComponent from "../../components/pagination/Pagination";
import ProductGrid from "./ProductGrid";
import { useDispatch } from "react-redux";

import {
  getHotProductsActions,
  getRandomProductsActions,
  getNewProductsActions,
  searchProductActions,
} from "../../redux/actions/getProductThunks";

const HomeProductPage = () => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("initialize");
  const [searchProducts, setSearchProducts] = useState([]);
  const [page, setPage] = useState({
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSearchProduct = useCallback(
    async (currentPage = 1) => {
      setLoading(true);
      try {
        const result = await dispatch(searchProductActions(currentPage));
        if (result?.payload?.products) {
          console.log(result?.payload.pagination.totalPages);
          setSearchProducts(result.payload.products);
          setPage((prev) => ({
            ...prev,
            totalPages: result.payload.pagination.totalPages,
          }));
          setContent("search");
        }
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Optional: only fetch on mount if you want initial search
  useEffect(() => {
    // fetchSearchProduct(); // Uncomment this if you want search results on mount
  }, [fetchSearchProduct]);

  const handlePageChange = (newPage) => {
    setPage((prev) => ({ ...prev, page: newPage }));
    fetchSearchProduct(newPage);
  };

  const renderContent = () => {
    switch (content) {
      case "initialize":
        return (
          <>
            <ProductRow
              title="Maybe this is a product for you"
              fetchAction={getRandomProductsActions}
              rowKey="random1"
            />
            <ProductRow
              title="Let products surprise you"
              fetchAction={getRandomProductsActions}
              rowKey="random2"
            />
            <ProductRow
              title="New Products"
              fetchAction={getNewProductsActions}
              rowKey="new"
            />
            <ProductRow
              title="Hot Products"
              fetchAction={getHotProductsActions}
              rowKey="hot"
            />
          </>
        );
      case "search":
        return (
          <>
            {loading ? (
              <p className="text-center py-4 text-style4">Loading products...</p>
            ) : error ? (
              <p className="text-center py-4 text-red-500">{error}</p>
            ) : (
              <div className="flex min-h-screen rounded-lg bg-gray-700 bg-opacity-500
              justify-center items-center">
              <ProductGrid products={searchProducts} />
              </div>
            )}
            <div className="mt-2 p-2 pb-12 flex justify-center w-full items-center">
              <PaginationComponent
                currentPage={page.page || 1}
                totalPages={page.totalPages || 1}
                onPageChange={handlePageChange}
              />
            </div>
            <ProductRow
              title="Maybe this is a product for you"
              fetchAction={getRandomProductsActions}
              rowKey="random1"
            />
            <ProductRow
              title="Let products surprise you"
              fetchAction={getRandomProductsActions}
              rowKey="random2"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen min-h-full overflow-x-hidden">
      <div className="absolute inset-0 w-full h-full bg-cover bg-skin-fill-1 bg-opacity-30 py-10 z-0" />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

      <div className="z-20 sticky top-0 w-full bg-skin-fill-1 bg-opacity-95 px-4 md:px-6 py-2 shadow-md">
        <div className="max-w-6xl mx-auto">
          <ProductHomeSearchBar
            onSearchChange={(queryPage = 1) => {
              setPage((prev) => ({ ...prev, page: queryPage }));
              fetchSearchProduct(queryPage);
            }}
          />
        </div>
      </div>

      <div className="relative items-center justify-center z-10 w-full overflow-x-hidden min-h-screen pt-4 px-4 md:px-6 max-w-6xl mx-auto pb-10 space-y-12">
        {renderContent()}
      </div>
    </div>
  );
};

export default HomeProductPage;
