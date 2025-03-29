import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/authThunks";

import { Link, useNavigate } from "react-router-dom"; // Ensure React Router is set up for navigation

const UserPopUp = ({ closePopups }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isAdmin } = useSelector((state) => state.auth);
  const [User, setUser] = useState(user || {});
  const navigate = useNavigate();

  console.log(isAdmin);

  const profileLinks = isAuthenticated
    ? [
        ["Profile", "/profile"],
        ["Cart", "/"],
        ["Deliveries", "/"],
        ["Store", "/"],
      ]
    : [
        ["Login", "/login"],
        ["Signup", "/signup"],
      ];

  const handleLogout = () => {
    dispatch(logoutAction());
    closePopups();
    navigate("/");
  };

  return (
    <div
      className={`animate-opacityAnimation flex flex-col items-center
      justify-center w-full h-[90vh] box-border border border-2px border-skin-primary p-2
      pb-4 px-3 rounded-b-lg rounded-t-xl
      mb-4 text-style4a md:text-style3`}
    >
      <div
        className="flex flex-col w-full bg-skin-fill-3 text-skin-secondary
       h-full px-5 rounded-md relative"
      >
        <h2
          className="text-style4 md:text-style3 font-semibold my-4 w-full
         flex flex-row items-center space-x-2"
        >
          <span className="text-style4a md:text-style3a w-full h-full">
            {!User.username ? (
              <div className="flex flex-col justify-center items-center w-full">
                <VscAccount className="text-style2 md:text-style1 m-[2rem] mt-[4rem]" />
                User not logged in
              </div>
            ) : (
              <span className="flex flex-row items-center">
                <VscAccount className="text-style3a md:text-style3b mr-[1rem]" />
                {User.username}
              </span>
            )}
          </span>
        </h2>

        <div className="flex flex-col w-full space-y-5 my-2 justify-center">
          
          {isAdmin  && (
            <Link
              to='/admin'
              className="bg-skin-high text-skin-primary px-4 py-4 rounded-md text-center
              font-semibold hover:bg-skin-secondary hover:scale-y-110"
            >
              Admin Dashboard
            </Link>
          )}

          {profileLinks.map(([label, path], index) => (
            <Link
              to={path}
              key={index}
              onClick={closePopups}
              className="bg-skin-primary text-skin-primary text-style4a md:text-style3 p-3 box-content 
              rounded-md text-center font-semibold hover:bg-skin-secondary items-center hover:scale-y-110"
            >
              {label}
            </Link>
          ))}

          {/* Logout Button */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-skin-fill-1 text-skin-primary px-4 py-4 rounded-md text-center
              font-semibold hover:bg-skin-secondary hover:scale-y-110"
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
