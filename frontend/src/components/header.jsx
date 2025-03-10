import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VscSearch, VscAccount, VscMenu } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { RiPaintFill } from "react-icons/ri";
import SearchBarPopUp from "./nav/searchBar";
import CartPopUp from "./nav/cartPopUp";
import ThemePopUp from "./nav/themePopUp";
import UserPopUp from "./nav/userPopUp";

const navButtons = [
  { name: "Home", path: "/home" },
  { name: "Product", path: "/product" },
  { name: "About", path: "/about" },
];

const Header = () => {
  const [activePopUp, setActivePopUp] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePopup = (popupName) => {
    setActivePopUp(popupName === activePopUp ? null : popupName);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActivePopUp(null);
  };

  const closePopups = () => {
    setIsMobileMenuOpen(false);
    setActivePopUp(null);
  };

  const renderPopUp = () => {
    switch (activePopUp) {
      case "search":
        return <SearchBarPopUp />;
      case "cart":
        return <CartPopUp />;
      case "theme":
        return <ThemePopUp />;
      case "user":
        return <UserPopUp />;
      default:
        return null;
    }
  };

  return (
    <div className="min-w-full h-[62px] p-2 lg:px-3 flex flex-row container z-50
    items-center justify-between bg-skin-primary text-skin-primary relative text-style3 box-border px-4">
      
      {/* Mobile Menu Button */}
      <div className="flex items-center lg:hidden">
        <button
          className="p-2 transition-all duration-200 hover:text-skin-secondary"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <FaXmark size={24} /> : <VscMenu size={24} />}
        </button>
      </div>

      {/* Logo and Merchant */}
      <div className="flex flex-1 items-center">
        <Link to="/" onClick={closePopups} className="font-bold text-2xl text-skin-button-primary p-2">
          LOGO
        </Link>
        <span className="hidden lg:block font-semibold hover:text-skin-high">MERCHANT</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-6 mx-4">
        {navButtons.map((button) => (
          <Link
            key={button.name}
            to={button.path}
            onClick={closePopups}
            className="px-3 py-2 rounded-lg  hover:bg-skin-button-secondary hover:text-skin-secondary "
          >
            {button.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-2/3 min-w-fit bg-slate-100 shadow-md z-40 lg:hidden min-h-screen pb-16 transition-all duration-200 p-2">

          <button onClick={closePopups} className="text-style2 m-3 text-black p-2 transition-all duration-500">
            <FaXmark size={24} />
          </button>
          {navButtons.map((button) => (
            <Link
              key={button.name}
              to={button.path}
              onClick={closePopups}
              className="block w-fit text-left px-4 my-4 text-black underline underline-offset-3 hover:bg-skin-high hover:text-skin-high transition-all duration-500"
            >
              {button.name}
            </Link>
          ))}
        </div>
      )}

      {/* Right Icons: Search, Cart, Theme, Account */}
      <div className="flex items-center text-style3 md:text-style3a md:ml-10 space-x-6 mx-2">
        <button onClick={() => handlePopup("search")} aria-label="Search">
          <VscSearch className="hover:text-skin-secondary transition-all duration-500" />
        </button>
        <button onClick={() => handlePopup("cart")} aria-label="Cart">
          <FiShoppingCart className="hover:text-skin-secondary transition-all duration-500" />
        </button>
        <button onClick={() => handlePopup("theme")} aria-label="Theme">
          <RiPaintFill className="hover:text-skin-secondary transition-all duration-500" />
        </button>
        <button onClick={() => handlePopup("user")} aria-label="User">
          <VscAccount className="hover:text-skin-secondary transition-all duration-500" />
        </button>
      </div>

      {/* Pop-up for Search, Cart, Theme, and User */}
      <div
        className={`${
          activePopUp ? "absolute" : "hidden"
        } h-[95vh] w-3/4 lg:w-2/5 z-30 bg-white bg-opacity-80 p-2 mx-2 top-0 right-0 box-border rounded-2xl transition-all`}
      >
      <div className="flex flex-row relative w-full mr-2">
        <button onClick={closePopups} className="text-style3 w-5 h-5 mx-2 p-3 box-content bg-skin-button-primary 
        bg-opacity-90 focus:animate-opacityAnimation rounded-full text-skin-button">
          <FaXmark />
        </button>
        <div className="flex space-x-2 md:space-x-4 justify-evenly mb-1 md:mb-4 w-3/4 box-border text-style3a md:text-style3b">
          <button
            onClick={() => handlePopup("search")}
            aria-label="Search"
            className="relative w-10 h-10 m-2 hover:bg-skin-primary hover:bg-opacity-50 text-black hover:rounded-full hover:text-skin-primary"
          >
            <VscSearch className="absolute inset-0 m-auto p-1" />
          </button>
          <button
            onClick={() => handlePopup("cart")}
            aria-label="Cart"
            className="relative w-10 h-10 m-2 hover:bg-skin-primary hover:bg-opacity-50 text-black hover:rounded-full hover:text-skin-primary"
          >
            <FiShoppingCart className="absolute inset-0 m-auto p-1" />
          </button>
          <button
            onClick={() => handlePopup("theme")}
            aria-label="Theme"
            className="relative w-10 h-10 m-2 hover:bg-skin-primary hover:bg-opacity-50 text-black hover:rounded-full hover:text-skin-primary"
          >
            <RiPaintFill className="absolute inset-0 m-auto p-1" />
          </button>
          <button
            onClick={() => handlePopup("user")}
            aria-label="User"
            className="relative w-10 h-10 m-2 hover:bg-skin-primary hover:bg-opacity-50 text-black hover:rounded-full hover:text-skin-primary"
          >
            <VscAccount className="absolute inset-0 m-auto p-1" />
          </button>
        </div>
        </div>

        {renderPopUp()}
      </div>

      {/* Overlay for Popup and Menu */}
      {(activePopUp || isMobileMenuOpen) && (
        <div className="fixed inset-0 z-20 h-full w-full">
          <div
            className="fixed inset-0 w-full h-full bg-gradient-to-bl from-slate-200 to-slate-900 opacity-20"
            onClick={closePopups}
          ></div>
          <div
            className="fixed inset-0 w-full h-full bg-black bg-opacity-30"
            onClick={closePopups}
          >
          <FaXmark className="fixed text-style2 md:text-style1 inset-0 text-skin-primary top-10 left-10 md:top-20 md:left-20 opacity-70" /></div>
          </div>
      )}
    </div>
  );
};

export default Header;
