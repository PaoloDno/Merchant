import React, { useState, useEffect } from "react";
import { displayUserAction } from "../../redux/actions/authThunks";

import { useDispatch, useSelector } from "react-redux";

import { VscAccount } from "react-icons/vsc";
import { FaBoxes } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
import { BsCart4, BsClockHistory } from "react-icons/bs";

import ProfileContent from "../ProfilePages/ProfileContent/DisplayProfile";
import AdminStoreContent from "./AdminContent/AdminDisplayStoreContent";
import AdminProductContent from "./AdminContent/AdminDisplayProductContent";
import AdminCategories from "./AdminContent/AdminDisplayCategoryContent";
import AdminOrders from "./AdminContent/AdminDisplayOrderContent";
import AdminReviews from "./AdminContent/AdminDisplayReviewsContent";
import AdminUsers from "./AdminContent/AdminDisplayUser";

import ProfileImage from "../../components/images/profileImage";

const AdminDisplayPage = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent />;
      case "users":
        return <AdminUsers />;
      case "products":
        return <AdminProductContent />;
      case "stores":
        return <AdminStoreContent />;
      case "categories":
        return <AdminCategories />;
      case "reviws":
        return <AdminReviews />;
      case "order":
        return <AdminOrders />;

      default:
        return null;
    }
  };

  const { user } = useSelector((state) => state.auth);

  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userProfile = await dispatch(displayUserAction());
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
      className="flex min-h-screen w-full items-start justify-evenly
    text-skin-primary space-x-3 p-4 bg-white relative"
    >
      <div className="flex flex-row space-x-2 container min-w-full bg-gray-600 bg-opacity-50 justify-around p-3 rounded-2xl">
        {/* Sidebar */}
        <div
          className="flex flex-col w-1/10 md:w-1/5 min-h-[85vh] p-2 md:p-5 bg-slate-200
        md:rounded-l-3xl shadow-xl bg-opacity-90 items-center relative"
        >
          <span className="flex flex-col md:flex-row items-center md:items-start w-full p-4 bg-white shadow-sm border rounded-md space-y-4 md:space-y-0 md:space-x-4 mb-3">
            {/* Profile Picture */}
            <div className="w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] rounded-full overflow-hidden border-2
             bg-gray-200 flex items-center justify-center border-skin-secondary">
              <ProfileImage isAdmin={user?.isAdmin} />
            </div>

            {/* User Info */}
            <div className="flex flex-col justify-center text-center md:text-left">
              <span className="text-style4 md:text-style3a font-semibold text-black">
                {user?.username || "Username"}
              </span>
              {/* Optional role or other info */}
              <span className="text-sm text-gray-500">
                {user?.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </span>

          <div className="flex flex-col w-full gap-3">
            {[
              { tab: "profile", icon: <VscAccount /> },
              { tab: "users", icon: <VscAccount /> },
              { tab: "stores", icon: <FaBoxes /> },
              { tab: "products", icon: <FaBoxes /> },
              { tab: "categories", icon: <BsCart4 /> },
              { tab: "reviews", icon: <BsClockHistory /> },
              { tab: "order", icon: <VscAccount /> },
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
          className="flex flex-col w-3/4 min-h-[85vh] h-[85vh] bg-gray-200 bg-opacity-70 
       rounded-l-2xl shadow-xl overflow-x-hidden overflow-y-scroll"
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDisplayPage;
