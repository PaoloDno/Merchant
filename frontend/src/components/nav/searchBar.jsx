import React, { useState } from "react";
import { VscSearch } from "react-icons/vsc";

const SearchBarPopUp = ({ isOpened }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`animate-opacityAnimation transform-origin-left flex flex-col items-end
       justify-between w-full h-[70vh] bg-skin-button-primary box-border
       text-skin-primary py-2 px-2 rounded-b-lg rounded-t-xl mb-4`}
    >
      <div className="flex flex-col w-full">
      <h2 className="text-style4 md:text-style3 font-semibold mb-4 w-full flex items-center space-x-2">
        <VscSearch className="text-style3" />
        <span>Search Bar</span>
      </h2>
      {/* Search Bar Section */}
      <div className="bg-skin-button-secondary rounded-lg p-6 w-full ">
        

        <div className="flex items-center space-x-3 mb-4">
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search input"
            className={`w-full bg-transparent text-skin-button placeholder-slate-300 focus:outline-none transition-all duration-300 ${
              isFocused ? "border-b-2 border-gray-500" : "border-b border-gray-300"
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
            className="text-skin-high rounded-lg hover:text-skin-high"
            aria-label="Search button"
          >
            <VscSearch size={20} />
          </button>
        </div>

        {/* Suggestions with Animation */}
        <div
          className={`${
            showSuggestions ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          } transition-all duration-500 ease-in-out`}
        >
          {showSuggestions && (
            <div className="mt-4 bg-gray-600 rounded-md p-4 shadow-lg">
              <p className="text-gray-400 text-sm">Suggested Searches:</p>
              <ul className="mt-2 space-y-1 text-gray-300">
                <li className="hover:text-white cursor-pointer">Electronics</li>
                <li className="hover:text-white cursor-pointer">Fashion</li>
                <li className="hover:text-white cursor-pointer">Home Decor</li>
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
