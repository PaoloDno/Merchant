import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminGetProducts } from "../../../redux/actions/adminThunks";
import ProductCards from "../../../components/cards/ProductCards";
import PaginationComponent from "../../../components/pagination/Pagination";
import AdminSearchBar from "../../../components/search/admin/AdminSearchBar";

const DisplayProductAdmin = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1 });
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

  const categories = [
    "Electronics",
    "Fashion",
    "Sports",
    "Food",
    "Furnitures",
    "Beauty Products",
  ];

  const subCategories = {
    Electronics: ["laptop", "cellphone", "headphone", "smartwatch", "console"],
    Fashion: ["maleclothes", "femaleclothes", "bag", "shoe"],
    Sports: ["bicycle", "gym", "camping"],
    Food: [
      "coffee",
      "coke",
      "cheese",
      "pasta",
      "vegetables",
      "fruits",
      "bread",
    ],
    Furnitures: ["furniture", "wall decor", "kitchen"],
    "Beauty Products": ["make up", "perfume"],
  };

  const fetchProducts = async (customFilters) => {
    try {
      setLoading(true);
      const result = await dispatch(adminGetProducts(customFilters));
      if (result?.payload) {
        setProducts(result.payload.products || []);
        setPagination(result.payload.pagination || { totalPages: 1 });
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if(isMounted) fetchProducts(filters);
    return () => isMounted = false;
  }, [filters]); // ✅ now refetches when filters (including page) changes

  useEffect(() => {
    let isMounted = true;
    if(isMounted) fetchProducts(filters);
    return () => isMounted = false;
  }, [])

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    if (key !== "page") {
      newFilters.page = 1; // Reset to first page when filters change
    }
    setFilters(newFilters);
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, productName: value, page: 1 });
  };

  const clearFilters = () => {
    setFilters({
      ...filters,
      page: 1,
      productName: "",
      category: "",
      subcategory: "",
      hot: false,
      bestSelling: false,
      isNew: false,
    });
  };

  return (
    <div className="p-4 pb-8 md:px-8 flex flex-col justify-between h-full w-full"> 
      {/* Search and Filters */}
      <div className="flex flex-col w-full p-1 md:py-2 bg-gray-400 rounded-xl">
        <AdminSearchBar
          onSearchChange={handleSearch}
          placeholdText={"Search for Product Name"}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 bg-skin-fill-3 bg-opacity-30 rounded-xl">
          <select
            value={filters.category}
            onChange={(e) => updateFilters("category", e.target.value)}
            className="flex items-center w-4/5 bg-skin-fill-1 p-1 px-2 m-2 text-style4 md:text-style4a"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={filters.subcategory}
            onChange={(e) => updateFilters("subcategory", e.target.value)}
            className="flex items-center w-4/5 bg-skin-fill-1 p-1 px-2 m-2 text-style4 md:text-style4a"
          >
            <option value="">All Subcategories</option>
            {(subCategories[filters.category] || []).map((subcat) => (
              <option key={subcat} value={subcat}>
                {subcat}
              </option>
            ))}
          </select>

          <label className="flex items-center w-4/5 bg-skin-fill-1 p-1 px-2 m-2 text-style4 md:text-style4a">
            <input
              type="checkbox"
              checked={filters.hot}
              onChange={() => updateFilters("hot", !filters.hot)}
            />
            Hot
          </label>
          <label className="flex items-center w-4/5 bg-skin-fill-1 p-1 px-2 m-2 text-style4 md:text-style4a">
            <input
              type="checkbox"
              checked={filters.bestSelling}
              onChange={() =>
                updateFilters("bestSelling", !filters.bestSelling)
              }
            />
            Best Selling
          </label>
          <label className="flex items-center w-4/5 bg-skin-fill-1 p-1 px-2 m-2 text-style4 md:text-style4a">
            <input
              type="checkbox"
              checked={filters.isNew}
              onChange={() => updateFilters("isNew", !filters.isNew)}
            />
            New
          </label>

          <button
            className="flex items-center w-4/5 bg-skin-fill-1 p-1 px-2 m-2 text-style4 md:text-style4a"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

          <select
            value={filters.sortBy}
            onChange={(e) => updateFilters("sortBy", e.target.value)}
            className="flex items-center w-4/5 bg-skin-fill-1 p-1 px-2 m-2 text-style4 md:text-style4a"
          >
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>

          <select
            value={filters.sortOrder}
            onChange={(e) => updateFilters("sortOrder", e.target.value)}
            className="flex items-center w-4/5 bg-skin-fill-1 p-1 px-2 m-2 text-style4 md:text-style4a"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-center py-4 text-style4">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full min-h-screen overflow-x-hidden overflow-y-auto">
          {products?.length > 0 ? (
            products.map((product) => (
              <ProductCards
                key={product._id}
                product={product}
                onAddToCart={() => {}}
                onViewProduct={() => {}}
              />
            ))
          ) : (
            <p className="flex w-full justify-center items-center col-span-full 
            h-1/2 text-center text-red-600 text-style3">No products found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-2 pb-12 flex justify-center w-full items-center">
        <PaginationComponent
          currentPage={filters.page}
          totalPages={pagination.totalPages}
          onPageChange={(newPage) => updateFilters("page", newPage)}
        />
      </div>
    </div>
  );
};

export default DisplayProductAdmin;
