import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetProducts } from "../../../redux/actions/adminThunks";
import ProductCards from "../../../components/cards/ProductCards";
import PaginationComponent from "../../../components/pagination/Pagination";
import AdminSearchBar from "../../../components/search/admin/AdminSearchBar";

const DisplayProductAdmin = () => {
  const dispatch = useDispatch();
  const { products, pagination } = useSelector((state) => state.admin);
  const { totalPages } = pagination || { totalPages: 1 };
  
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    page: 1,
    productName: "",
    category: "",
    subcategory: "",
    hot: false,
    bestSelling: false,
    isNew: false,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    setLoading(true);
    dispatch(adminGetProducts(filters)).finally(() => setLoading(false));
  }, [dispatch, filters.productName]);

  // Update filters dynamically
  const updateFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "productName" ? 1 : prev.page, // Reset page on search
    }));
  };

  return (
    <div className="p-4 md:p-8 flex flex-col justify-between h-full w-full">
      {/* Search Bar */}
      <div className="flex flex-col w-full p-4 md:p-6">
        <AdminSearchBar onSearchChange={(value) => updateFilters("productName", value)} />

        {/* Filter Options */}
        <div className="flex flex-wrap space-x-3 mt-4">
          <select value={filters.category} onChange={(e) => updateFilters("category", e.target.value)}>
            <option value="">All Categories</option>
            <option value="Food">Foods</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
          </select>

          <select value={filters.subcategory} onChange={(e) => updateFilters("subcategory", e.target.value)}>
            <option value="">All Subcategories</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fiction">Fiction</option>
            <option value="pasta">Pasta</option>
          </select>

          {/* Checkboxes for filtering */}
          <div className="flex space-x-2 items-center">
            <label>
              <input type="checkbox" checked={filters.hot} onChange={() => updateFilters("hot", !filters.hot)} /> Hot
            </label>
            <label>
              <input type="checkbox" checked={filters.bestSelling} onChange={() => updateFilters("bestSelling", !filters.bestSelling)} /> Best Selling
            </label>
            <label>
              <input type="checkbox" checked={filters.isNew} onChange={() => updateFilters("isNew", !filters.isNew)} /> New
            </label>
          </div>
        </div>

        {/* Sorting Options */}
        <div className="mt-3 flex space-x-3">
          <select value={filters.sortBy} onChange={(e) => updateFilters("sortBy", e.target.value)}>
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>

          <select value={filters.sortOrder} onChange={(e) => updateFilters("sortOrder", e.target.value)}>
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center py-4">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCards key={product._id} product={product} onAddToCart={() => {}} onViewProduct={() => {}} />
            ))
          ) : (
            <p className="col-span-full text-center">No products found.</p>
          )}
        </div>
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
  );
};

export default DisplayProductAdmin;
