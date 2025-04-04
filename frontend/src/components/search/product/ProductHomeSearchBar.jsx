import React, { useState } from "react";

const ProductHomeSearchBar = ({ onSearchChange }) => {
  const [query, setQuery] = useState({
    productName: "",
    description: "",
    minPrice: 0,
    maxPrice: 0,
    inStock: true,
    sort: "desc",
    category: "",
    subcategory: "",
  });

  const [isFocused, setIsFocused] = useState({
    productName: false,
    description: false,
  });

  const [error, setError] = useState("");

  const validate = (value) => {
    const CLEAN_TEXT = /^[^&<>"']*$/;
    if (!CLEAN_TEXT.test(value)) {
      setError("Invalid characters detected.");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (validate(value)) {
      setQuery((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = () => {
    if (!validate(query.productName) || !validate(query.description)) return;
    console.log( query );
    onSearchChange(...query);
  };

  return (
    <div className="flex flex-col bg-black bg-opacity-55 min-w-full container p-3 px-5 space-y-4 text-style4a">
      {/* Product Name */}
      <div className="flex flex-row w-full space-x-4 ml-auto justify-right items-center bg-yellow-200">
        <input
          className={` placeholder-slate-500 focus:outline-none transition-all duration-300 p-2
          ${
            isFocused.productName
              ? "border-2 rounded-lg border-skin-primary bg-skin-primary text-skin-primary"
              : "border-b-2 border-skin-secondary bg-transparent"
          }`}
          type="text"
          name="productName"
          value={query.productName}
          onChange={handleChange}
          onFocus={() =>
            setIsFocused((prev) => ({ ...prev, productName: true }))
          }
          onBlur={() =>
            setIsFocused((prev) => ({ ...prev, productName: false }))
          }
          placeholder="Product name..."
        />

        {/* Description */}
        <input
          className={`bg-transparent placeholder-slate-500 focus:outline-none transition-all duration-300 text-skin-primary p-2
          ${
            isFocused.description
              ? "border-2 rounded-lg border-skin-primary"
              : "border-b-2 border-skin-secondary"
          }`}
          type="text"
          name="description"
          value={query.description}
          onChange={handleChange}
          onFocus={() =>
            setIsFocused((prev) => ({ ...prev, description: true }))
          }
          onBlur={() =>
            setIsFocused((prev) => ({ ...prev, description: false }))
          }
          placeholder="Description..."
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Search
        </button>
      </div>
      <div>
        {/* Price Range */}
        <input
          type="number"
          name="minPrice"
          value={query.minPrice}
          onChange={handleChange}
          placeholder="Min Price"
          className="p-2"
        />
        <input
          type="number"
          name="maxPrice"
          value={query.maxPrice}
          onChange={handleChange}
          placeholder="Max Price"
          className="p-2"
        />

        {/* In Stock Toggle */}
        <label>
          In Stock
          <input
            type="checkbox"
            name="inStock"
            checked={query.inStock}
            onChange={() =>
              setQuery((prev) => ({ ...prev, inStock: !prev.inStock }))
            }
          />
        </label>
      </div>
      <div>
        {/* Sorting */}
        <select
          name="sort"
          value={query.sort}
          onChange={handleChange}
          className="p-2"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        {/* Category and Subcategory */}
        <select
          name="category"
          value={query.category}
          onChange={handleChange}
          className="p-2"
        >
          <option value="">Select Category</option>
          {/* Populate options dynamically from your categories */}
        </select>
        <select
          name="subcategory"
          value={query.subcategory}
          onChange={handleChange}
          className="p-2"
          disabled={!query.category}
        >
          <option value="">Select Subcategory</option>
          {/* Populate options dynamically based on selected category */}
        </select>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ProductHomeSearchBar;
