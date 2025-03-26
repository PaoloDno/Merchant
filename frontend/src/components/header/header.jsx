import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VscSearch, VscAccount, VscMenu } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { FaXmark } from "react-icons/fa6";
import { RiPaintFill } from "react-icons/ri";
import SearchBarPopUp from "../nav/searchBar";
import CartPopUp from "../nav/cartPopUp";
import ThemePopUp from "../nav/themePopUp";
import UserPopUp from "../nav/userPopUp";

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
      return <SearchBarPopUp closePopups={closePopups} />;
    case "cart":
      return <CartPopUp closePopups={closePopups} />;
    case "theme":
      return <ThemePopUp closePopups={closePopups} />;
    case "user":
      return <UserPopUp closePopups={closePopups} />;
    default:
      return null;
    }
  };

  return (
    <div
      className="min-w-full h-[3.5rem] p-2 lg:px-2 flex flex-row container z-50
    align-center justify-center bg-skin-primary text-skin-primary relative 
    text-style3 box-border"
    >
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
        <Link
          to="/"
          onClick={closePopups}
          className="font-bold text-2xl text-skin-primary p-2"
        >
          LOGO
        </Link>
        <span className="hidden lg:block font-semibold hover:text-skin-primary">
          MERCHANT
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-6 mx-4">
        {navButtons.map((button) => (
          <Link
            key={button.name}
            to={button.path}
            onClick={closePopups}
            className="px-3 py-1 rounded-md hover:scale-110  hover:bg-skin-fill-3 hover:text-skin-secondary transition duration-400 delay-400 ease-in"
          >
            {button.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-2/3 min-w-fit bg-skin-fill-3 shadow-md z-40 lg:hidden min-h-screen pb-5 transition-all duration-200 p-2">
          <button
            onClick={closePopups}
            className="text-style2 m-3 text-skin-secondary p-2 transition-all duration-500"
          >
            <FaXmark size={24} />
          </button>
          {navButtons.map((button) => (
            <Link
              key={button.name}
              to={button.path}
              onClick={closePopups}
              className="block w-fit text-left px-4 my-4 text-skin-secondary  underline underline-offset-3 transition-all duration-500"
            >
              {button.name}
            </Link>
          ))}
        </div>
      )}

      {/* Right Icons: Search, Cart, Theme, Account */}
      <div className="flex items-center justify-evenly text-style3 md:text-style3a md:ml-[5rem] space-x-2 md:space-x-6 mx-1 md:mr-3">
        <button
          onClick={() => handlePopup("search")}
          aria-label="Search"
          className="flex justify-center items-center rounded-[0.375rem] hover:bg-skin-fill-3 
          hover:text-skin-secondary box-content aspect-square w-10 transition-all duration-300
           ease-in-out hover:rounded-full hover:scale-110"
        >
          <VscSearch />
        </button>
        <button
          onClick={() => handlePopup("cart")}
          aria-label="Cart"
          className="flex justify-center items-center rounded-[0.375rem] hover:bg-skin-fill-3 
          hover:text-skin-secondary box-content aspect-square w-10 transition-all duration-300
          ease-in-out hover:rounded-full hover:scale-110"
        >
          <FiShoppingCart />
        </button>
        <button
          onClick={() => handlePopup("theme")}
          aria-label="Theme"
          className="flex justify-center items-center rounded-[0.375rem] hover:bg-skin-fill-3
          hover:text-skin-secondary box-content aspect-square w-10 transition-all duration-300
          ease-in-out hover:rounded-full hover:scale-110"
        >
          <RiPaintFill />
        </button>
        <button
          onClick={() => handlePopup("user")}
          aria-label="User"
          className="flex justify-center items-center rounded-[0.375rem] hover:bg-skin-fill-3 
          hover:text-skin-secondary box-content aspect-square w-10 transition-all duration-300 
          ease-in-out hover:rounded-full hover:scale-110"
        >
          <VscAccount />
        </button>
      </div>

      {/* Pop-up for Search, Cart, Theme, and User */}
      <div
        className={`
        ${activePopUp ? "fixed" : "hidden"} flex flex-col
        top-0 right-0 z-30 h-[98vh] w-5/6 lg:w-2/5 bg-opacity-90
        bg-slate-100 p-[0.5rem] pr-[0.25rem] box-border rounded-sm
        transition-transform transform
        ${ activePopUp ? "translate-x-0" : "translate-x-full" }
      `}
      >
        <div className="flex items-center justify-between m-1 flex-row">
          <div className="flex flex-row">
            <button
              onClick={closePopups}
              aria-label="Close Popup"
              className="w-[2rem] h-[2rem] bg-black text-white 
              hover:bg-skin-button-primary 
              hover:text-skin-primary rounded-full
              hover:bg-opacity-80 transition focus:outline-none 
              box-content p-[0.5rem]"
            >
              <FaXmark className="w-full h-full" />
            </button>
          </div>
          <div className="flex flex-row w-full justify-evenly mr-2 space-x-2">
            {[
              {
                icon: VscSearch,
                label: "Search",
                action: () => handlePopup("search"),
              },
              {
                icon: FiShoppingCart,
                label: "Cart",
                action: () => handlePopup("cart"),
              },
              {
                icon: RiPaintFill,
                label: "Theme",
                action: () => handlePopup("theme"),
              },
              {
                icon: VscAccount,
                label: "User",
                action: () => handlePopup("user"),
              },
            ].map(({ icon: Icon, label, action }, index) => (
              <button
                key={index}
                onClick={action}
                aria-label={label}
                className="relative w-[1rem] h-[1rem] md:w-[1.5rem] md:h-[1.5rem]
                hover:bg-skin-button-secondary hover:bg-opacity-90 hover:text-skin-secondary border-black
                rounded-full transition-colors box-content p-2 bg-black text-white 
                bg-opacity-70"
              >
                <Icon className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>
        {renderPopUp()}
      </div>

      {/* Overlay for Popup and Menu */}
      {(activePopUp || isMobileMenuOpen) && (
        <div className="fixed inset-0 z-20 h-full w-full">
          <div
            className="fixed inset-0 w-full h-full bg-gradient-to-bl from-slate-200 to-slate-900 opacity-60"
            onClick={closePopups}
          ></div>
          <div
            className="fixed inset-0 w-full h-full bg-black bg-opacity-75"
            onClick={closePopups}
          >
            <FaXmark className="fixed text-style2 md:text-style1 inset-0 text-white top-10 left-10 md:top-20 md:left-20 opacity-50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
