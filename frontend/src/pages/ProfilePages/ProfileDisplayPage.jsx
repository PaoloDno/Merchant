import React, { useState, useEffect } from "react";
import { displayUserAction } from "../../redux/actions/authThunks";

import { useDispatch, useSelector } from "react-redux";

import { VscAccount } from "react-icons/vsc";
import { FaBoxes } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { BsCart4, BsClockHistory } from "react-icons/bs";

import ProfileContent from "./ProfileContent/DisplayProfile";
import StoreContent from "./ProfileContent/DisplayStore";

const ProfileDisplayPage = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent />;
      case "store":
        return <StoreContent />;
      case "products":
        return <div>Products Content</div>;
      case "cart":
        return <div>Cart Content</div>;
      case "history":
        return <div>Order History Content</div>;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userProfile = await dispatch(displayUserAction());
        console.log(userProfile);
        if (userProfile) {
          console.log("yes");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUser(); // Call the async function
  }, [dispatch]);

  return (
    <div
      className="flex flex-row min-h-[90vh] h-[90vh] w-full items-center justify-center
    text-skin-primary space-x-3 my-4 md:m-4"
    >
      {/* Sidebar */}
      <div
        className="flex flex-col w-[4rem] md:w-1/5 min-h-[85vh] p-2 md:p-5 bg-skin-primary
       rounded-2xl md:rounded-r-2xl shadow-xl bg-opacity-65 items-center"
      >
        <div
          className="flex items-center justify-center w-[2rem] h-[2rem] md:w-[6rem] md:h-[6rem] rounded-full md:rounded-none
         bg-black mb-4 mx-auto"
        ></div>
        <span className="hidden md:flex text-style3 md:text-style3a font-bold mb-6">
          Username
        </span>

        <div className="flex flex-col w-full gap-3">
          {[
            { tab: "profile", icon: <VscAccount /> },
            { tab: "store", icon: <FaBoxes /> },
            { tab: "cart", icon: <BsCart4 /> },
            { tab: "history", icon: <BsClockHistory /> },
          ].map(({ tab, icon }) => (
            <button
              key={tab}
              className={`flex p-2 w-full items-center justify-center md:justify-start rounded-lg 
                ${
                  activeTab === tab
                    ? "bg-skin-fill-2 text-white"
                    : "bg-white text-black"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              <div className="hidden md:block mx-2">{icon}</div>
              <span className="hidden md:block ml-2">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
              <div className="md:hidden">{icon}</div>
            </button>
          ))}
        </div>
        <button
          className="mt-4 flex flex-row p-2 w-full items-center justify-center rounded-lg
         bg-skin-fill-3 text-skin-secondary hover:bg-skin-fill-1 hover:text-skin-primary"
        >
          <RxExit className="mr-2" />{" "}
          <span className="hidden md:flex">LOG OUT</span>
        </button>
      </div>

      {/* Main Content */}
      <div
        className="flex flex-col w-3/4 min-h-[85vh] h-[85vh] bg-skin-primary
       bg-opacity-80 rounded-l-2xl shadow-xl overflow-x-hidden overflow-y-scroll"
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileDisplayPage;
