import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VscSearch, VscAccount, VscMenu } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";

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
    setActivePopUp(null);
  };

  return (
    <div className="flex lg:items-center lg:justify-between text-style3 h-[42px] w-screen bg-skin-secondary relative">
      {/* Mobile Menu Button */}
      <div className="flex items-center lg:hidden">
        <button
          className="flex items-center px-3 py-2"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          <VscMenu />
        </button>
      </div>

      {/* Left section: Logo and Merchant */}
      <div className="min-w-0 flex-1 flex flex-row items-center justify-start">
        <div className="p-2">
          <Link to="/" onClick={closeMenu}>LOGO</Link>
        </div>
        <div className="min-w-0 text-style3 hidden lg:block">MERCHANT</div>
      </div>

      {/* Center Navigation */}
      <nav className="min-w-0 flex items-center justify-center lg:relative">
        {/* Regular Links - hidden on mobile if menu is open */}
        <div className="hidden lg:flex items-center space-x-4">
          {navButtons.map((button) => (
            <Link key={button.name} to={button.path} onClick={closeMenu}>
              <button
                className="flex items-center px-3 py-2 hover:bg-skin-button-primary hover:text-skin-secondary text-skin-primary hover:rounded-xl transition-all duration-250 ease-in-out"
              >
                {button.name}
              </button>
            </Link>
          ))}
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-0 left-0 w-2/3 min-w-fit bg-skin-primary shadow-md z-20 lg:hidden min-h-screen pb-16">
            <div className="flex items-center lg:hidden">
              <button
                className="flex items-center px-3 py-2"
                onClick={toggleMobileMenu}
                aria-label="Menu"
              >
                <VscMenu />
              </button>
            </div>
            {navButtons.map((button) => (
              <Link key={button.name} to={button.path} onClick={closeMenu}>
                <button
                  className="block w-full text-left px-4 py-4 text-skin-primary hover:bg-skin-button-primary hover:text-white"
                >
                  {button.name}
                </button>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Right section: Search, Cart, User */}
      <div className="flex flex-1 items-center justify-end pr-5">
        <button
          className="flex items-center justify-center text-style3 px-5"
          onClick={() => handlePopup('search')}
          aria-label="Search"
        >
          <VscSearch />
          <span className="hidden lg:inline px-2">Search</span>
        </button>
        {activePopUp === 'search' && (
          <div className="absolute top-[42px] right-0 bg-white p-4 shadow-md z-20">
            <input type="text" placeholder="Search..." className="border p-2 w-full" />
          </div>
        )}

        <button
          className="flex items-center justify-center text-style3 px-5"
          onClick={() => handlePopup('cart')}
          aria-label="Cart"
        >
          <FiShoppingCart />
          <span className="hidden lg:inline px-2">Cart</span>
        </button>
        {activePopUp === 'cart' && (
          <div className="absolute top-[42px] right-0 bg-white p-4 shadow-md z-20">
            <p className="bg-white z-20">Your cart is empty.</p>
          </div>
        )}

        <button className="flex items-center justify-center text-style3 px-5" aria-label="User Account">
          <VscAccount />
          <span className="hidden lg:inline px-2">User</span>
        </button>
      </div>

      {/* Background Overlay (for popups and mobile menu) */}
      {(activePopUp || isMobileMenuOpen) && (
        <div
          className="fixed h-screen w-screen top-0 left-0 bg-black opacity-30 z-10"
          onClick={closeMenu}
        ></div>
      )}
    </div>
  );
};

export default Header;
