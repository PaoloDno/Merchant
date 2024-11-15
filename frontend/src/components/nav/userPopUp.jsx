import React from "react";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom"; // Ensure React Router is set up for navigation

const UserPopUp = ({ onLogout }) => {

  const profileLinks = [
    ["Profile", "/profile"],
    ["Login", "/login"],
    ["Signup", "/signup"],
  ];

  return (
    <div
      className={`animate-opacityAnimation transform-origin-left flex flex-col items-end
       justify-between w-full h-[70vh] bg-skin-button-primary box-border
       text-skin-primary py-2 px-2 rounded-b-lg rounded-t-xl mb-4`}
    >
      <div className="flex flex-col w-full">
        <h2 className="text-style4 md:text-style3 font-semibold mb-4 w-full flex items-center space-x-2">
          <VscAccount className="text-style3" />
          <span>User Profile</span>
        </h2>
      
      <div className="flex flex-col w-full space-y-2">
        {profileLinks.map(([label, path], index) => (
          <Link 
            to={path} 
            key={index} 
            className="bg-skin-secondary text-skin-primary px-4 py-2 rounded-md text-center font-semibold hover:bg-skin-secondary-hover"
          >
            {label}
          </Link>
        ))}

        {/* Logout Button */}
        <button 
          onClick={onLogout} 
          className="bg-skin-secondary text-skin-primary px-4 py-2 rounded-md text-center font-semibold hover:bg-skin-secondary-hover"
        >
          Logout
        </button>
      </div>
      
      </div>
    </div>
  );
};

export default UserPopUp;
