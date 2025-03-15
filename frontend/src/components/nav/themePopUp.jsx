import React from "react";
import { RiPaintFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { nextTheme, setTheme } from "../../redux/reducers/themeSlice";
import { useState, useEffect } from "react";

const ThemePopUp = ({closePopups}) => {
  const themes = ["default", "coffee", "dark", "sakura", "dark2"];

  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(currentTheme);

  useEffect(() => {
    setCurrent(currentTheme);
  }, [currentTheme]);

  const handleThemeButton = (theme) => {
    dispatch(setTheme(theme));
    closePopups();
  };

  //closePopups

  return (
    <div
      className={`animate-opacityAnimation flex flex-col items-center
      justify-center w-full h-[90vh] box-border border border-2px 
      border-skin-primary p-2
      pb-4 px-3 rounded-b-lg rounded-t-xl
      mb-4 text-style4a md:text-style3`}
    >
      <div
        className="flex flex-col w-full bg-skin-fill-3 text-skin-secondary
       h-full px-5 rounded-md relative space-y-2"
      >
        <h2
           className="text-style4a md:text-style3a font-semibold my-4 w-full
         flex flex-row items-center space-x-2"
        >
          <span className="flex flex-row items-center w-full">
            <RiPaintFill className="text-style3a md:text-style3b mr-[1rem]" />
            Themes
          </span>
        </h2>

        <button
          className="flex flex-row bg-skin-fill-1 text-style4a text-skin-primary px-4 py-4 rounded-md text-center
              font-semibold hover:bg-skin-secondary hover:scale-y-110 justify-center"
          onClick={() => {
            dispatch(nextTheme());
          }}
        >
          <span>{current.charAt(0).toUpperCase() + current.slice(1)}</span>
          {}
        </button>

        <div className="flex flex-col w-full flex-nowrap overflow-hidden overflow-y-scroll space-y-5">
          {themes.map((theme, index) => (
            <div
              key={index}
              className=" flex flex-row bg-skin-fill-1 text-skin-primary px-4 py-4 rounded-md text-center
              font-semibold hover:bg-skin-secondary justify-between mx-2"
            >
              <div className="flex flex-col box-content space-y-2 relative">
                <h2 className="text-style4 box-content md:text-style4a mx-2">
                  {" "}
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}{" "}
                </h2>
                <div className={`flex flex-row theme-${theme} w-full`}>
                  <div className="bg-skin-fill-1 h-4 w-4 z-4 rounded-full border border-black"></div>
                  <div className="bg-skin-fill-2 h-4 w-4 z-3 -ml-2 rounded-full border border-black"></div>
                  <div className="bg-skin-fill-3 h-4 w-4 rounded-full z-2 -ml-2 border border-black"></div>
                  <div className="bg-skin-high h-4 w-4 z-1 -ml-2 rounded-full border border-black"></div>
                </div>
              </div>
              <button
                onClick={() => handleThemeButton(theme)}
                className={`theme-${theme} text-style4a md:text-style3 bg-skin-button-secondary text-skin-secondary px-8 py-1 rounded-sm font-semibold
                 hover:bg-skin-fill-3 focus:animate-opacityAnimation`}
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-center items-center my-5">
          <div className="w-2 h-2 theme-coffee bg-skin-high"></div>
          <div className="w-2 h-2 theme-dark bg-skin-high"></div>
          <div className="w-2 h-2 theme-sakura bg-skin-high"></div>
          <div className="w-2 h-2 theme-default bg-skin-high"></div>
          <div className="w-2 h-2 theme-dark2 bg-skin-high"></div>
        </div>
      </div>
    </div>
  );
};

export default ThemePopUp;
