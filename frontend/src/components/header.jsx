import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VscSearch, VscAccount, VscMenu } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import SearchBarPopUp from "./nav/searchBar";
import CartPopUp from "./nav/cartPopUp";
import { FaXmark } from "react-icons/fa6";

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

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setActivePopUp(false);
  };

  return (
    <header className="flex flex-wrap container lg:items-center lg:justify-between text-style3 h-[62px] min-w-full bg-skin-button-primary text-skin-secondary relative p-1 box-border">
      {/* Mobile Menu Button */}
      <div className="flex items-center lg:hidden">
        <button
          className="flex items-center px-3 py-2 transition-all duration-200 hover:text-skin-button-secondary"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <VscMenu className="text-2xl" />
        </button>
      </div>

      {/* Left Section: Logo and Merchant */}
      <div className="min-w-0 flex-1 flex flex-row items-center justify-start">
        <div className="p-2">
          <Link to="/" onClick={closeMenu} className="font-bold text-2xl text-skin-button-primary p-2">
            LOGO
          </Link>
        </div>
        <div className="min-w-0 text-style3 hover:text-skin-high hidden lg:block font-semibold">
          MERCHANT
        </div>
      </div>

      {/* Center Navigation */}
      <nav className="min-w-0 flex items-center justify-center lg:relative">
        <div className="hidden lg:flex items-center space-x-6">
          {navButtons.map((button) => (
            <Link key={button.name} to={button.path} onClick={closeMenu}>
              <button className="flex items-center px-3 py-2 text-skin-button 
                hover:bg-skin-button-secondary hover:text-skin-secondary 
                rounded-lg transition-all duration-300 ease-in-out 
                focus:outline-none focus:ring-2 focus:ring-skin-button-secondary"
              >
                {button.name}
              </button>
            </Link>
          ))}
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-2/3 min-w-fit bg-skin-primary shadow-md z-20 lg:hidden min-h-screen pb-16 transition-all duration-200">
            <div className="flex items-center lg:hidden">
              <button className="flex items-center px-3 py-2" onClick={toggleMobileMenu} aria-label="Menu">
                <VscMenu />
              </button>
            </div>
            {navButtons.map((button) => (
              <Link key={button.name} to={button.path} onClick={closeMenu}>
                <button className="block w-full text-left px-4 py-4 text-skin-primary hover:bg-skin-button-primary hover:text-skin-high">
                  {button.name}
                </button>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Right section: Search, Cart, User */}
      <div className="flex items-center justify-end pr-5 space-x-4">
        <button
          className="flex group items-center justify-center text-style3 px-5 transition-all duration-200 text-skin-secondary hover:text-skin-high"
          onClick={() => handlePopup("search")}
          aria-label="Search"
        >
          <VscSearch size={24} />
          <span className="hidden lg:inline px-2">Search</span>
        </button>

        <button
          className="flex items-center justify-center text-style3 px-5 transition-all duration-200 text-skin-secondary hover:text-skin-high"
          onClick={() => handlePopup("cart")}
          aria-label="Cart"
        >
          <FiShoppingCart className="text-2xl" />
          <span className="hidden lg:inline px-2">Cart</span>
        </button>
        {activePopUp === "cart" && (
          <div className="absolute top-[42px] right-0 bg-white p-4 shadow-md z-20 w-72">
            <p>Your cart is empty.</p>
          </div>
        )}

        <button
          className="flex items-center justify-center text-style3 px-5 transition-all duration-200 text-skin-secondary hover:text-skin-high"
          aria-label="User Account"
        >
          <VscAccount className="text-2xl" />
          <span className="hidden lg:inline px-2">User</span>
        </button>

      </div>

      {/* Search Popup with Slide-in Animation */}
        <div className={`${activePopUp === 'search' ? 'absolute h-[95vh] w-3/4 lg:w-1/4 mt-2' : 'hidden w-0' } z-20 bg-skin-secondary bg-opacity-80 p-2 
        overflow-hidden top-0 right-0 box-border rounded-2xl transition-all duration-2500 justify-center justify-items-end items-end`}>
          <div className="flex bg-skin-button-primary text-style2 h-[fit] border-b-1 border-opacity-60 border-b-skin-primary mb-1 rounded-t-lg animate-expandWidth transform-origin-right" >
            <button className="box-border text-style2 w-fit h-fit border-skin-primary border-2 rounded-md m-2" onClick={closeMenu} >
            <FaXmark size={24} />
            </button>
          </div>
          <SearchBarPopUp isOpened={activePopUp === "search"} />
        </div>
        <div className={`${activePopUp === 'cart' ? 'absolute h-[95vh] w-3/4 lg:w-1/4 mt-2' : 'hidden w-0' } z-20 bg-skin-secondary bg-opacity-80 p-2 
        overflow-hidden top-0 right-0 box-border rounded-2xl transition-all duration-2500 justify-center justify-items-end items-end`}>
          <div className="flex bg-skin-button-primary text-style2 h-[fit] border-b-1 border-opacity-60 border-b-skin-primary mb-1 rounded-t-lg animate-expandWidth transform-origin-right" >
            <button className="box-border text-style2 w-fit h-fit border-skin-primary border-2 rounded-md m-2" onClick={closeMenu} >
            <FaXmark size={24} />
            </button>
          </div>
          <CartPopUp isOpened={activePopUp === "cart"} />
        </div>
      {/* Overlay for Popup and Menu */}
      {(activePopUp || isMobileMenuOpen) && (
        <div className="fixed inset-0 bg-gradient-to-bl to-slate-900 from-skin-start opacity-80 z-10" onClick={closeMenu}>
          <FaXmark className="absolute left-0 top-0 text-style2 md:text-style1 m-5 animate-expandSpin"/>
        </div>
      )}
    </header>
  );
};

export default Header;
