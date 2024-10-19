import React from "react"
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  return (
    <div className="flex lg:items-center lg:justify-between text-20px h-[42px] w-screen bg-skin-secondary">
      <div className="min-w-0 flex-1 flex flex-row items-center justify-start">
        <div className="p-2">
          <Link to="/">
            LOGO
          </Link>
        </div>
        <div className="min-w-0 text-sm text-35px">
            MERCHANT
        </div>
      </div>
      <nav className="min-w-0 flex-1 flex items-center justify-center">

        <Link to="/home">
          <button className="flex items-center px-3 py-2 hover:bg-skin-button-primary
          hover:text-slate-100 text-gray-600 hover:rounded-xl transition-all duration-250 ease-in-out">
            Home
          </button>
        </Link>
        <Link to="/product">
          <button className="flex items-center px-3 py-2 hover:bg-skin-button-primary
          hover:text-slate-100 text-gray-600 hover:rounded-xl transition-all duration-250 ease-in-out">
            Product
          </button>
        </Link>
        <Link to="/about">
          <button className="flex items-center px-3 py-2 hover:bg-skin-button-primary
          hover:text-slate-100 text-gray-600 hover:rounded-xl transition-all duration-250 ease-in-out">
            About
          </button>
        </Link>
        
      </nav>
      <div className="flex flex-1 items-center justify-end pr-5">
        <button className="flex items-center justify-center text-lg px-5">
          Search
        </button>
        <button className="flex items-center justify-center text-lg px-5">
          Cart
        </button>
        <button className="flex items-center justify-center text-lg px-5">
          User
        </button>
      </div>
    </div>
  )
};

export default Header;
