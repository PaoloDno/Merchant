import { useState } from "react";
import { VscSearch } from "react-icons/vsc";

export default function AdminSearchBar({ onSearchChange, placeholdText }) {
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
    <div className="flex flex-row w-full h-[70px] bg-skin-fill-1 md:px-4 p-2 overflow-hidden container items-center justify-between rounded-xl">
      <input
        className={`bg-transparent placeholder-white  p-2 px-4 focus:outline-none transition-all duration-300  w-full md:w-1/2 text-style4 md:text-style4a
           ${isFocused
             ? "border-2 rounded-lg p-2 outline-offset-4 border-skin-primary bg-white text-black"
             : "border-b-2 p-2 border-skin-secondary bg-transparent text-slate-200"
           }`}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholdText}
      />
      {error && <p className="text-red-600">{error}</p>}
      
      <button
        onClick={handleSearch}
        className="flex items-center gap-1 px-4 py-2 bg-skin-button-primary text-skin-primary border-2 border-white rounded-lg hover:bg-black hover:text-white mx-1"
      >
        <VscSearch /><span className="hidden md:block mx-2 ">Search</span>
      </button>
    </div>
  );
}
