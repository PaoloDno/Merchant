import React from "react";
import { RiPaintFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/reducers/themeSlice";

const ThemePopUp = ({ onThemeChange }) => {
  const themes = ["default", "dark", "monochrome"];

  const currentTheme = useSelector((state) => state.theme.currentTheme); 
  const dispatch = useDispatch();
 

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

        <button>
          <RiPaintFill /> <span>{currentTheme}</span>{}
        </button>

        <div className="flex flex-col w-full space-y-2">
          {themes.map((theme, index) => (
            <div key={index} className="flex items-center justify-between space-x-2 space-y-4 bg-skin-secondary p-4 rounded-xl w-full">
              <h2 className="text-style4a font-medium">{theme.charAt(0).toUpperCase() + theme.slice(1)}</h2>
              <div className={`flex flex-row theme-${theme}`}>
                <div className="bg-skin-primary h-6 w-6 z-4 rounded-full border border-black"></div>
                <div className="bg-skin-secondary h-6 w-6 z-3 -ml-3 rounded-full border border-black"></div>
                <div className="bg-skin-high h-6 w-6 rounded-full z-2 -ml-2 border border-black"></div>
                <div className="bg-skin-button-primary h-6 w-6 z-1 -ml-2 rounded-full border border-black"></div>
              </div>
              <button 
                onClick={() => dispatch(setTheme(theme))}
                className="bg-skin-button-primary text-skin-button px-4 py-2 rounded-md font-semibold hover:bg-skin-secondary-hover"
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
