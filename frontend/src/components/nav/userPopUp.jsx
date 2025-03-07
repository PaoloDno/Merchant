import React from "react";
import { VscAccount } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import {logoutAction} from '../../redux/actions/authThunks'

import { Link, useNavigate } from "react-router-dom"; // Ensure React Router is set up for navigation

const UserPopUp = () => {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/')
  }

  const profileLinks = isAuthenticated ? [
      ["Profile", "/profile"],
  ] : [
      ["Login", "/login"],
      ["Signup", "/signup"],
  ];


  return (
    <div
    className={`animate-opacityAnimation flex flex-col items-center
     justify-between w-full h-[75vh] bg-skin-primmary box-border
     text-skin-primary py-2 px-2 rounded-b-lg rounded-t-xl mb-4 text-style4a md:text-style3`}
  >
    <div className="flex flex-col w-full bg-white text-black h-full p-2 rounded-md">
    <h2 className="text-style4 md:text-style3 font-semibold my-4 w-full flex flex-row items-center space-x-2">
      <VscAccount className="text-style3a md:text-style3b" />
      <span className="text-style4a md:text-style3a">Search Bar</span>
    </h2>

      <div className="flex flex-col w-full space-y-4">
        {profileLinks.map(([label, path], index) => (
          <Link 
            to={path} 
            key={index} 
            className="bg-slate-950 text-white text-style4a md:text-style3 px-4 py-4 rounded-md text-center font-semibold hover:bg-skin-secondary-hover"
          >
            {label}
          </Link>
        ))}

        {/* Logout Button */}
        {isAuthenticated && (
          <button 
            onClick={handleLogout} 
            className="bg-skin-secondary text-skin-primary px-4 py-4 rounded-md text-center font-semibold hover:bg-skin-secondary-hover"
          >
            Logout
          </button>
        )}

      </div>
      
      </div>
    </div>
  );
};

export default UserPopUp;
