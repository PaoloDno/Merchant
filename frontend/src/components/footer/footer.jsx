import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const navButtons = [
  { name: "Home", path: "/home" },
  { name: "Product", path: "/product" },
  { name: "About", path: "/about" },
];

const Footer = () => {
  const { isAuthenticated, username } = useSelector((state) => state.auth);

  return (
    <footer className="min-w-full p-2 lg:px-3 flex flex-col container z-20 bg-skin-primary text-skin-primary py-10 bg-opacity-90 text-style3 box-border">
      <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 flex-wrap justify-evenly items-center mb-10">

        {/* Company Info */}
        <div className="w-full md:w-1/3 flex flex-col mb-6 ml-2">
          <h2 className="text-style2">Merchant</h2>
          <p className="text-style3">Demo e-commerce store</p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/3 mb-6 ml-2">
          <h3 className="text-style2">Quick Links</h3>
          <ul className="space-y-2">
            {navButtons.map((link) => (
              <li key={link.name} className="hover:underline hover:bg-white hover:bg-opacity-10 text-style3 w-1/2">
                <Link 
                className="ml-2 hover:text-black"
                to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Profile Links */}
      <div className="w-full md:w-1/3 mb-6 ml-2">
        <h3 className="text-style2">Profile Links</h3>
        <div className="flex flex-col text-style3 space-y-1">
          {isAuthenticated ? (
            <>
              <span>Welcome, {username}</span>
              <Link
                to="/profile"
                className="hover:underline block w-fit px-4 py-1 box-border text-skin-primary bg-skin-button-secondary rounded-2xl hover:bg-skin-secondary hover:text-skin-secondary bg-opacity-60 text-center my-4"
              >
                Go to Profile
              </Link>
              <span>to manage your account</span>
            </>
          ) : (
            <>
              <span>Click here to</span>
              <Link
                to="/login"
                className="hover:underline block w-fit px-4 py-1 box-border text-skin-primary bg-skin-button-secondary rounded-2xl hover:bg-skin-secondary hover:text-skin-secondary bg-opacity-60 text-center my-4"
              >
                Log-in / Sign-up
              </Link>
              <span>for personalized links</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-row justify-center items-center my-5">
        <div className="w-2 h-2 theme-coffee bg-skin-primary"></div>
        <div className="w-2 h-2 theme-dark bg-skin-primary"></div>
        <div className="w-2 h-2 theme-monochrome bg-skin-primary"></div>
      </div>

      <div className="text-center text-style3 mt-8 text-skin-secondary">
        &copy; 2024 Merchant. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
