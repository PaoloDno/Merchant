import React from "react";
import { RiPaintFill } from "react-icons/ri";

const ThemePopUp = ({ onThemeChange }) => {
  const themes = ["base", "dark", "monochrome"];

  return (
    <div
      className={`animate-opacityAnimation transform-origin-left flex flex-col items-end
       justify-between w-full h-[70vh] bg-skin-button-primary box-border
       text-skin-primary py-2 px-2 rounded-b-lg rounded-t-xl mb-4`}
    >
      <div className="flex flex-col w-full">
        <h2 className="text-style4 md:text-style3 font-semibold mb-4 w-full flex items-center space-x-2">
          <RiPaintFill className="text-style3" />
          <span>Theme Palette</span>
        </h2>

        <div className="flex flex-col w-full space-y-2">
          {themes.map((theme, index) => (
            <div key={index} className="flex items-center justify-between space-x-2 space-y-4 bg-skin-secondary p-4 rounded-xl w-full">
              <h2 className="text-style3a font-medium">{theme.charAt(0).toUpperCase() + theme.slice(1)}</h2>
              <button 
                onClick={() => onThemeChange(theme)}
                className="bg-skin-secondary text-skin-primary px-4 py-2 rounded-md font-semibold hover:bg-skin-secondary-hover"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemePopUp;
