import React from "react"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ThemeWrapper = ({children}) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const [theme, setTheme] = useState(currentTheme);
  // useEffect to update theme whenever currentTheme changes
  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  return (
    <div className={`theme-${theme} font-Afacad`}>
      {children}
    </div>
  )
};

export default ThemeWrapper;