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
    <div className="flex flex-col md:flex-row items-center gap-3">
      {/* Firstname Input */}
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

      {/* Lastname Input */}
      <input
        className={`bg-transparent placeholder-slate-500 focus:outline-none transition-all duration-300 text-skin-primary p-2
          ${isFocused.lastname ? "border-2 rounded-lg border-skin-primary" : "border-b-2 border-skin-secondary"}`}
        type="text"
        name="lastname"
        value={query.lastname}
        onChange={handleChange}
        onFocus={() => setIsFocused((prev) => ({ ...prev, lastname: true }))}
        onBlur={() => setIsFocused((prev) => ({ ...prev, lastname: false }))}
        placeholder="Last name..."
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <VscSearch />
        Search
      </button>
    </div>
  );
}
