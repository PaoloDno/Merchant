import React from "react";
import { Link } from "react-router-dom";

const navButtons = [
  { name: "Home", path: "/home" },
  { name: "Product", path: "/product" },
  { name: "About", path: "/about" },
];

const Footer = () => {
  return (
    <footer className="bg-skin-primary text-skin-primary py-10 bg-opacity-90">
      <div className="container mx-auto flex flex-wrap justify-between w-full mb-10">
        
        {/* Company Info */}
        <div className="w-full md:w-1/3 flex flex-col mb-6 ml-2">
          <h2 className="text-style2">Merchant</h2>
          <p className="text-skin-secondary text-style3">Demo e-commerce store</p>
        </div>
        
        {/* Quick Links */}
        <div className="w-full md:w-1/3 mb-6 ml-2">
          <h3 className="text-style2">Quick Links</h3>
          <ul className="space-y-2">
            {navButtons.map((link) => (
              <li key={link.name} className="hover:underline hover:bg-white hover:bg-opacity-10 text-style3 text-skin-secondary w-1/2 ">
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Profile Links */}
        <div className="w-full md:w-1/3 mb-6 ml-2"> 
          <h3 className="text-style2">Profile Links</h3>
          <div className="flex flex-col text-style3 space-y-1">
            <span>Click here to</span>
            <button className="hover:underline
            block w-fit px-4 py-1 box-border text-skin-secondary
            bg-skin-button-secondary rounded-2xl
            hover:bg-skin-secondary hover:text-skin-secondary 
            bg-opacity-60 text-center my-4
            ">Log-in / Sign-up</button>
            <span>for personalized links</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row justify-center items-center my-5">
          <div className="w-2 h-2 theme-coffee bg-skin-primary"></div>
          <div className="w-2 h-2 theme-dark bg-skin-primary"></div>
          <div className="w-2 h-2 theme-monochrome bg-skin-primary"></div>
      </div>

      {/* Copyright */}
      <div className="text-center text-style3 mt-8 text-skin-secondary">
        &copy; 2024 Merchant. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
