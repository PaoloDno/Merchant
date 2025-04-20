import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminGetStores } from "../../../redux/actions/adminThunks";
import StoreCards from "../../../components/cards/StoreCards";
import PaginationComponent from "../../../components/pagination/Pagination";
import AdminSearchBar from "../../../components/search/admin/AdminSearchBar";

const DisplayStoreAdmin = () => {
  const dispatch = useDispatch();

  const [stores, setStores] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1 });
  const [loading, setLoading] = useState(false);
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

  // Shared fetch logic
  const fetchStores = async (customFilters) => {
    try {
      setLoading(true);
      const result = await dispatch(adminGetStores(customFilters));
      if (result?.payload) {
        setStores(result.payload.stores || []);
        setPagination(result.payload.pagination || { totalPages: 1 });
      }
    } catch (error) {
      console.error("Failed to fetch stores:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStores(filters);
  }, []);

  const handleSearch = (value) => {
    const newFilters = {
      ...filters,
      storeName: value,
      page: 1,
    };
    setFilters(newFilters);
    fetchStores(newFilters);
  };

  const handlePageChange = (newPage) => {
    const updatedFilters = {
      ...filters,
      page: newPage,
    };
    setFilters(updatedFilters);
    fetchStores(updatedFilters);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col justify-between h-full w-full">
      {/* Search Bar & Filters */}
      <div className="flex flex-col w-full p-1 md:py-2 bg-gray-400 rounded-xl">
        <AdminSearchBar
          placeholdText="Search For Store Name"
          onSearchChange={handleSearch}
        />
      </div>

      {/* Stores */}
      {loading ? (
        <p className="text-center py-4">Loading stores...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {stores?.length > 0 ? (
            stores.map((store) => (
              <StoreCards key={store._id} store={store} onViewstore={() => {}} />
            ))
          ) : (
            <p className="col-span-full text-center">No stores found.</p>
          )}
        </div>
      )}

      <div className="mt-4 flex justify-center w-full items-center">
        <PaginationComponent
          currentPage={filters.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DisplayStoreAdmin;
