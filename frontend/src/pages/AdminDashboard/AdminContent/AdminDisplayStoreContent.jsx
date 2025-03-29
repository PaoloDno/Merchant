import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetStores } from "../../../redux/actions/adminThunks";
import StoreCards from "../../../components/cards/StoreCards";
import PaginationComponent from "../../../components/pagination/Pagination";
import SearchBar from "../../../components/search/admin/AdminSearchBar";

const DisplayStoreAdmin = () => {
  const dispatch = useDispatch();
  const { stores, pagination } = useSelector((state) => state.admin);
  const totalPages = pagination?.totalPages || 1;

  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    storeName: "",
    hot: false,
    isNew: false,
    rating: null,
    isVerified: false,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(adminGetStores(filters))
      .finally(() => setLoading(false)); // Stop loading when request completes
  }, [dispatch, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "storeName" ? 1 : prev.page, // Reset page when searching
    }));
  };

  return (
    <div className="p-4 md:p-8 flex flex-col justify-between h-full w-full">
      {/* Search Bar & Filters */}
      <div className="flex flex-col w-full p-4 md:p-6">
        <SearchBar onSearchChange={(value) => updateFilter("storeName", value)} />
        
        {/* Filtering Options */}
        <div className="flex flex-row space-x-3 mt-2">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={filters.hot} 
              onChange={() => updateFilter("hot", !filters.hot)} 
            />
            <span className="ml-2">Hot</span>
          </label>

          <label className="flex items-center">
            <input 
              type="checkbox"  
              checked={filters.isNew} 
              onChange={() => updateFilter("isNew", !filters.isNew)} 
            />
            <span className="ml-2">New</span>
          </label>

          <label className="flex items-center">
            <input 
              type="checkbox" 
              checked={filters.isVerified} 
              onChange={() => updateFilter("isVerified", !filters.isVerified)} 
            />
            <span className="ml-2">Verified</span>
          </label>

          {/* Sort Options */}
          <select 
            value={filters.sortOrder} 
            onChange={(e) => updateFilter("sortOrder", e.target.value)}
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>
        </div>
      </div>

      {/* Stores Grid */}
      {loading ? (
        <p className="text-center py-4">Loading stores...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {stores && stores.length > 0 ? (
            stores.map((store) => (
              <StoreCards key={store._id} store={store} onViewstore={() => {}} />
            ))
          ) : (
            <p className="col-span-full text-center">No stores found.</p>
          )}
        </div>
      )}

      {/* Pagination Component */}
      <div className="mt-4 flex justify-center w-full items-center">
        <PaginationComponent 
          currentPage={filters.page} 
          totalPages={totalPages} 
          onPageChange={(newPage) => updateFilter("page", newPage)} 
        />
      </div>
    </div>
  );
};

export default DisplayStoreAdmin;
