import React from "react";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeUser } from '../../redux/actions/initializeUser';
import { useSelector } from "react-redux";

const ThemeWrapper = ({ children }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]); //just add here;

  return (
    <div className={`theme-${currentTheme} font-Afacad`}>
      {children}
    </div>
  );
};

export default ThemeWrapper;