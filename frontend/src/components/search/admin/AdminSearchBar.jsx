import { useState } from "react";
import { VscSearch } from "react-icons/vsc";

export default function AdminSearchBar({ onSearchChange }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  const validate = (value) => {
    const CLEAN_TEXT = /^[^&<>"']*$/;
    const check = CLEAN_TEXT.test(value);
    if (!check) {
      setError("Invalid Query");
      return false;
    }
    setError(""); // Clear error if valid
    return true;
  };

  const handleSearch = () => {
    if (!validate(query)) return;
    onSearchChange(query);
  };

  return (
    <div className="flex flex-col items-start">
      <input
        className={`bg-transparent placeholder-slate-500 focus:outline-none transition-all duration-300 text-skin-primary
           ${isFocused
             ? "border-2 rounded-lg p-2 outline-offset-4 border-skin-primary"
             : "border-b-2 border-skin-secondary"
           }`}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Product name..."
      />
      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <VscSearch /> Search
      </button>
    </div>
  );
}
