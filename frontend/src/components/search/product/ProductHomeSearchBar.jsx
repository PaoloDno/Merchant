import React, { useState, useEffect } from "react";
import { VscSearch } from "react-icons/vsc";
import { RxDoubleArrowUp } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx"; // import hamburger icon

const ProductHomeSearchBar = ({ onSearchChange }) => {
  const [query, setQuery] = useState({
    productName: "",
    description: "",
    minPrice: 0,
    maxPrice: 100000,
    inStock: true,
    sort: "desc",
    category: "",
    subcategory: "",
  });

  const [toggle, setToggle] = useState(false);

  const categories = {
    Food: [
      { value: "fastfood", label: "Fastfood" },
      { value: "vegetables", label: "Vegetables" },
      { value: "pasta", label: "Pasta" },
    ],
    Drinks: [
      { value: "softdrinks", label: "Softdrinks" },
      { value: "alcohol", label: "Alcohol" },
      { value: "coffee", label: "Coffee and Tea" },
    ],
    Electronics: [
      { value: "cellphone", label: "Cellphone" },
      { value: "console", label: "Console Game" },
      { value: "gadgets", label: "Gadgets" },
      { value: "laptop", label: "Lappy" },
    ],
    Fashion: [
      { value: "clothing", label: "Clothing" },
      { value: "footwear", label: "Footwear" },
      { value: "accessories", label: "Accessories" },
    ],
    Furniture: [
      { value: "tables", label: "Tables" },
      { value: "chairs", label: "Chairs" },
      { value: "beds", label: "Beds" },
    ],
  };

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
    onSearchChange(query);
  };

  useEffect(() => {
    setQuery((prev) => ({ ...prev, subcategory: "" }));
  }, [query.category]);

  const renderToggleButton = () => (
    <button
      onClick={() => setToggle(!toggle)}
      className="absolute top-2 right-4 p-2 rounded-full bg-skin-button-primary hover:bg-skin-button-hover text-white shadow-md border-2 border-white"
      title="Toggle Filters"
    >
      {toggle ? <RxDoubleArrowUp size={20} /> : <RxHamburgerMenu size={20} />}
    </button>
  );

  return (
    <div className="flex flex-col w-full bg-skin-fill-1 p-4 gap-4 rounded-xl relative items-start container">
      {/* Toggle Button */}
      {renderToggleButton()}

      {/* Top Search Inputs */}
      <div className="flex flex-row w-full items-center justify-center gap-2 bg-slate-200 bg-opacity-45 p-2 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 md:w-10/12">
          <input
            className={`placeholder-white p-2 px-4 transition-all  rounded-md duration-300 w-full text-style4 md:text-style4a
              ${
                isFocused.productName
                  ? "border-2 rounded-lg outline-offset-4 border-skin-primary bg-white text-black bg-opacity-75"
                  : "border-b-2 border-skin-secondary bg-skin-fill-1 text-skin-primary bg-opacity-25"
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
          <input
            className={`placeholder-white p-2 px-4 transition-all duration-300 w-full text-style4 md:text-style4a
              ${
                isFocused.description
                  ? "border-2 rounded-lg outline-offset-4 border-skin-primary bg-white text-black bg-opacity-75"
                  : "border-b-2 border-skin-secondary bg-skin-fill-1 text-skin-primary bg-opacity-25"
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
        </div>
        <div className="flex items-center w-2/10 md:w-auto">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-4 py-2 bg-skin-button-primary text-skin-primary border-2 border-white rounded-lg hover:bg-black hover:text-white"
          >
            <VscSearch />
            <span className="hidden md:block">Search</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      {toggle && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full bg-slate-200 bg-opacity-20 p-4 rounded-lg transition-all duration-300 ease-in-out">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-skin-primary text-style4">Minimum Price</label>
            <input
              type="number"
              name="minPrice"
              value={query.minPrice}
              onChange={handleChange}
              placeholder="Min"
              className="p-1 rounded border w-full bg-white text-black"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-skin-primary text-style4">Maximum Price</label>
            <input
              type="number"
              name="maxPrice"
              value={query.maxPrice}
              onChange={handleChange}
              placeholder="Max"
              className="p-1 rounded border w-full bg-white text-black"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-skin-primary text-style4">Sort Order</label>
            <select
              name="sort"
              value={query.sort}
              onChange={handleChange}
              className="p-1 rounded border w-full bg-white text-black"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-skin-primary text-style4">Category</label>
            <select
              name="category"
              value={query.category}
              onChange={handleChange}
              className="p-1 rounded border w-full bg-white text-black"
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-skin-primary text-style4">Subcategory</label>
            <select
              name="subcategory"
              value={query.subcategory}
              onChange={handleChange}
              disabled={!query.category}
              className="p-1 rounded border w-full bg-white text-black"
            >
              <option value="">Select Subcategory</option>
              {query.category &&
                categories[query.category]?.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-skin-primary text-style4">Availability</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="inStock"
                checked={query.inStock}
                onChange={() =>
                  setQuery((prev) => ({ ...prev, inStock: !prev.inStock }))
                }
              />
              <span className="text-skin-primary">In Stock</span>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="absolute bottom-1 left-4 text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
};

export default ProductHomeSearchBar;
