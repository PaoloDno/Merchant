import React from "react"
import { useSelector } from "react-redux";

const ThemeWrapper = ({ children }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  return (
    <div className={`theme-${currentTheme} font-Afacad`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;