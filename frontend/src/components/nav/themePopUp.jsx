import React from "react";
import { RiPaintFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { nextTheme, setTheme } from "../../redux/reducers/themeSlice";
import { useState, useEffect } from "react";

const ThemePopUp = () => {
  const themes = ["default", "coffee", "dark", "monochrome", "dark2"];

  const currentTheme = useSelector((state) => state.theme.currentTheme); 
  const dispatch = useDispatch();
 
  const [current, setCurrent] = useState((currentTheme));

  useEffect(() => {
    setCurrent(currentTheme);
  }, [currentTheme]);

  return (
    <div
      className={`animate-opacityAnimation flex flex-col items-center
       justify-between w-full h-[75vh] bg-skin-primmary box-border
       text-skin-primary py-2 px-2 rounded-b-lg rounded-t-xl mb-4 text-style4a md:text-style3`}
    >
      <div className="flex flex-col w-full bg-white text-black h-full p-2 rounded-md">
      <h2 className="text-style4 md:text-style3 font-semibold my-4 w-full flex flex-row items-center space-x-2">
        <RiPaintFill className="text-style3a md:text-style3b" />
        <span className="text-style4a md:text-style3a">Search Bar</span>
      </h2>

        <button className="flex flex-row box-content p-2 bg-skin-button-primary text-skin-button border-2 border-skin-primary
          justify-center space-x-3 rounded-md m-2" 
          onClick={() => {dispatch(nextTheme())}}
          >
          <RiPaintFill /> <span>{ current.charAt(0).toUpperCase() + current.slice(1)}</span>{}
        </button>

        <div className="flex flex-col w-full flex-nowrap space-y-1 overflow-hidden overflow-y-scroll">
          {themes.map((theme, index) => (
            <div key={index} className="flex box-border items-center justify-between space-x-2 space-y-4 bg-white text-black border-2 border-skin-primary p-4 rounded-xl w-full overflow-hidden">
              <div className="flex flex-col box-content space-y-2">
                <h2 className="text-style4a box-content md:text-style3a font-medium w-full"> {theme.charAt(0).toUpperCase() + theme.slice(1)} </h2>
                <div className={`flex flex-row theme-${theme} w-full`}>
                  <div className="bg-skin-primary h-4 w-4 z-4 rounded-full border border-black"></div>
                  <div className="bg-skin-secondary h-4 w-4 z-3 -ml-2 rounded-full border border-black"></div>
                  <div className="bg-skin-high h-4 w-4 rounded-full z-2 -ml-2 border border-black"></div>
                  <div className="bg-skin-button-primary h-4 w-4 z-1 -ml-2 rounded-full border border-black"></div>
                </div>
              </div>
              <button 
                onClick={() => dispatch(setTheme(theme))}
                className="bg-skin-button-primary text-skin-button px-4 py-2 rounded-md font-semibold hover:bg-skin-secondary-hover focus:animate-opacityAnimation"
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center items-center my-5">
          <div className="w-2 h-2 theme-coffee bg-skin-primary"></div>
          <div className="w-2 h-2 theme-dark bg-skin-primary"></div>
          <div className="w-2 h-2 theme-monochrome bg-skin-primary"></div>
          <div className="w-2 h-2 theme-default bg-skin-primary"></div>
          <div className="w-2 h-2 theme-dark2 bg-skin-primary"></div>
        </div>

      </div>
    </div>
  );
};

export default ThemePopUp;
