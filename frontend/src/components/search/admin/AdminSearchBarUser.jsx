import { useState } from "react";
import { VscSearch } from "react-icons/vsc";

export default function AdminSearchBarUser({ onSearchChange }) {
  const [query, setQuery] = useState({
    firstname: "",
    lastname: "",
  });
  const [isFocused, setIsFocused] = useState({
    firstname: false,
    lastname: false,
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
    if (!validate(query.firstname) || !validate(query.lastname)) return;
    onSearchChange(query);
  };

  return (
    <div className="flex flex-row w-full h-auto bg-skin-fill-1 p-2 md:px-4 items-center justify-between rounded-xl relative gap-4 flex-wrap">
      {/* Input Container using Grid */}
      <div className="grid grid-cols-1 md;grid-cols-2 gap-4 w-3/5 md:w-4/5 p-1">
        {/* Firstname Input */}
        <input
          className={`bg-transparent placeholder-white p-2 px-4 focus:outline-none transition-all duration-300 w-full text-style4 md:text-style4a
            ${
              isFocused.firstname
                ? "border-2 rounded-lg outline-offset-4 border-skin-primary bg-white text-black"
                : "border-b-2 border-skin-secondary bg-transparent text-slate-200"
            }`}
          type="text"
          name="firstname"
          value={query.firstname}
          onChange={handleChange}
          onFocus={() => setIsFocused((prev) => ({ ...prev, firstname: true }))}
          onBlur={() => setIsFocused((prev) => ({ ...prev, firstname: false }))}
          placeholder="First name..."
        />

        {/* Lastname Input */}
        <input
          className={`bg-transparent placeholder-white p-2 px-4 focus:outline-none transition-all duration-300 w-full text-style4 md:text-style4a
            ${
              isFocused.lastname
                ? "border-2 rounded-lg outline-offset-4 border-skin-primary bg-white text-black"
                : "border-b-2 border-skin-secondary bg-transparent text-slate-200"
            }`}
          type="text"
          name="lastname"
          value={query.lastname}
          onChange={handleChange}
          onFocus={() => setIsFocused((prev) => ({ ...prev, lastname: true }))}
          onBlur={() => setIsFocused((prev) => ({ ...prev, lastname: false }))}
          placeholder="Last name..."
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="absolute bottom-0 left-2 text-red-600 text-sm">{error}</p>
      )}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="flex items-center gap-1 px-4 py-2 bg-skin-button-primary text-skin-primary border-2 border-white rounded-lg hover:bg-black hover:text-white"
      >
        <VscSearch />
        <span className="hidden md:block">Search</span>
      </button>
    </div>
  );
}
