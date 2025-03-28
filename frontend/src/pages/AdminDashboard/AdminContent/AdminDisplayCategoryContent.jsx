import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminGetCategories, adminGetSubCategories } from "../../../redux/actions/adminThunks";
import PaginationComponent from "../../../components/pagination/Pagination";

const AdminDisplayCategory = () => {
  const dispatch = useDispatch();
  const { categories, subcategories, pagination } = useSelector((state) => state.admin);
  const totalPages = pagination?.totalPages || 1;

  const [filters, setFilters] = useState({
    page: 1,
    mode: "category",
    loading: false,
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, loading: true }));
    
    const fetchData = async () => {
      if (filters.mode === "category") {
        await dispatch(adminGetCategories(filters.page));
      } else {
        await dispatch(adminGetSubCategories(filters.page));
      }
      setFilters((prev) => ({ ...prev, loading: false }));
    };

    fetchData();
  }, [dispatch, filters.page, filters.mode]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "mode" ? 1 : prev.page, // Reset page when switching modes
    }));
  };

  const CategoryCards = ({ name, description }) => (
    <div className="border rounded-lg p-4 shadow-md w-25 md:w-54 text-skin-primary">
      <h3 className="text-style4a font-bold">{name}</h3>
      <p className="text-style4">{description}</p>
    </div>
  );

  const data = filters.mode === "category" ? categories : subcategories;

  return (
    <div className="p-4 md:p-8 flex flex-col justify-between h-full w-full">
      {/* Toggle Mode Button */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => updateFilter("mode", filters.mode === "category" ? "subcategory" : "category")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Switch to {filters.mode === "category" ? "Subcategories" : "Categories"}
        </button>
        <Link to="/cat" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Create Categories
        </Link>
      </div>

      {/* Display Categories or Subcategories */}
      {filters.loading ? (
        <p className="text-center py-4">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {data?.length > 0 ? (
            data.map((datum) => (
              <CategoryCards key={datum._id} name={datum.name} description={datum.description} />
            ))
          ) : (
            <p className="col-span-full text-center">No {filters.mode === "category" ? "Categories" : "Subcategories"} found</p>
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

export default AdminDisplayCategory;
