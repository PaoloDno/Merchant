import React from "react"


const ProductHomeSearchBar = ({onSearchChange}) => {
  const [query, setQuery] = useState({
    productName: "",
    description: "",
    minPrice: 0,
    maxPrice: 0,
    inStock: true,
    sort: "",
    category: "",
    subcategory: "",
  });
  
  const [isFocused, setIsFocused] = useState({
    productName: false,
    description: false
  });
  
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
    const {name, value} = e.target;
    if (validate(value)){
      setQuery((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = () => {
    if (!validate(query.firstname) || !validate(query.lastname)) return;
    onSearchChange(query);
  }
  
  return (
    <div className="w-full h-full">
      //search
      <input 
        className={`bg-transparent placeholder-slate-500 focus:outline-none transition-all duration-300 text-skin-primary p-2
          ${isFocused.firstname ? "border-2 rounded-lg border-skin-primary" : "border-b-2 border-skin-secondary"}`}
        type="text"
        name="firstname"
        value={query.firstname}
        onChange={handleChange}
        onFocus={() => setIsFocused((prev) => ({ ...prev, firstname: true }))}
        onBlur={() => setIsFocused((prev) => ({ ...prev, firstname: false }))}
        placeholder="First name..."
      />

      //newproducts button
      //randomproduct button
      //search 
        //basic info name description
        //minPrice
        //inStock
        //sort
        //categoryName
        //subCategory
      //
      <button
        onClick={handleSearch}
      >

      </button>
    </div>
  )
};

export default ProductHomeSearchBar