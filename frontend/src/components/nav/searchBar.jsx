import React, { useState } from "react";
import { VscSearch } from "react-icons/vsc";

const SearchBarPopUp = ({ closePopups }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`animate-opacityAnimation flex flex-col items-center
       justify-between w-full h-[75vh] bg-skin-primmary box-border
       text-skin-primary md:py-2 md:px-2 rounded-b-lg rounded-t-xl mb-4 text-style4a md:text-style3`}
    >
      <div className="flex flex-col w-full bg-white text-black h-full p-2 rounded-md">
      <h2 className="text-style4 md:text-style3 font-semibold my-4 w-full flex flex-row items-center space-x-2">
        <VscSearch className="text-style3a md:text-style3b" />
        <span className="text-style4a md:text-style3a">Search Products</span>
      </h2>

      {/* Search Bar Section */}
      <div className="rounded-lg p-2 md:p-6 w-full h-full bg-opacity-0 border border-skin-primary">
        <div className="flex items-center space-x-3 mb-4 bg-white rounded-xl p-2 md:p-4 pt-4">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search input"
            className={`w-full bg-transparent text-slate-950 placeholder-slate-800 focus:outline-none transition-all duration-300 ${
              isFocused ? "border-2 rounded-lg p-2 outline-offset-4 border-gray-950" : "border-b-2 border-gray-600"
            }`}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsFocused(false);
                setShowSuggestions(false);
              }, 200); // Adds delay to allow clicking on suggestions
            }}
          />
          <button
            className="bg-skin-button-primary rounded-full text-skin-button p-2"
            aria-label="Search button"
          >
            <VscSearch />
          </button>
        </div>

        {/* Suggestions with Animation */}
        <div
          className={`${
            showSuggestions ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          } transition-all duration-500 ease-in-out`}
        >
          {showSuggestions && (
            <div className="mt-4 bg-gray-300 rounded-md p-4 shadow-lg">
              <p className="text-slate-950 text-style4a">Suggested Searches:</p>
              <ul className="mt-2 space-y-1 text-black">
                <li className="hover:text-slate-600 cursor-pointer">Electronics</li>
                <li className="hover:text-slate-600 cursor-pointer">Fashion</li>
                <li className="hover:text-slate-600 cursor-pointer">Home Decor</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div> 
    </div>
  );
};

export default SearchBarPopUp;
