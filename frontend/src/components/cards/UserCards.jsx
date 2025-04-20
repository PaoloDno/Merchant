import React from "react";
import { FaUserShield, FaUserCheck, FaBan } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileImage from "../images/profileImage";

const UserCards = ({ profile }) => {
  if (!profile) return null;

  const {
    _id: profileId,
    lastname = "Unknown",
    firstname = "Unknown",
    phoneNumber = "N/A",
    profileImage,
    stores = [],
    userId,
  } = profile;

  // Defensive check: userId may be a string or an object
  const isUserObject = typeof userId === "object" && userId !== null;

  const {
    isAdmin = false,
    username = "Unknown",
    isBanned = false,
    isVerified = false,
  } = isUserObject ? userId : {};

  const badgeStyle = (active, color) => {
    const colorMap = {
      green: "text-green-600",
      blue: "text-blue-600",
      red: "text-red-600",
    };
    return `text-lg ${active ? colorMap[color] : "text-gray-400"}`;
  };

  // Skip rendering if userId isn't a valid object
  if (!isUserObject) return null;

  return (
    <div className="flex flex-col border rounded-lg p-3 shadow-md w-[110px] md:w-[220px] h-[260px] md:h-[330px] justify-between md:m-4 bg-white hover:shadow-lg transition-transform hover:scale-105">
      <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] mx-auto md:mb-2 rounded-full overflow-hidden border">
        <ProfileImage profileImage={profileImage} alt={`${username}'s profile image`} />
      </div>

      <h1
        className="text-black font-bold text-center text-style4a md:text-style3 truncate"
        title={username}
      >
        {username}
      </h1>

      <p
        className="text-center text-gray-700 text-style4 md:text-style3 flex flex-wrap gap-1 justify-center truncate"
        title={`${firstname} ${lastname}`}
      >
        <span>{firstname}</span>
        <span>{lastname}</span>
      </p>

      <p
        className="text-style4 text-gray-700 truncate"
        title={`Phone: ${phoneNumber}`}
      >
        #: {phoneNumber}
      </p>

      <p className="text-style4 text-gray-700">Stores: {stores.length}</p>

      <div className="flex justify-center gap-3 mt-2" aria-label="User status badges">
        <FaUserShield
          className={badgeStyle(isAdmin, "green")}
          title={isAdmin ? "Admin User" : "Not Admin"}
          aria-label={isAdmin ? "Admin User" : "Not Admin"}
        />
        <FaUserCheck
          className={badgeStyle(isVerified, "blue")}
          title={isVerified ? "Verified Account" : "Not Verified"}
          aria-label={isVerified ? "Verified Account" : "Not Verified"}
        />
        <FaBan
          className={badgeStyle(isBanned, "red")}
          title={isBanned ? "Banned User" : "Active User"}
          aria-label={isBanned ? "Banned User" : "Active User"}
        />
      </div>

      {profileId && (
        <Link
          to={`/viewProfile/${profileId}`}
          className="flex justify-center items-center mt-3 h-[25px] bg-gray-500 text-style4 md:text-style4a text-white px-3 py-1 rounded hover:bg-gray-600 w-full"
          title="View full user profile"
          aria-label={`View profile of ${username}`}
        >
          View Profile
        </Link>
      )}
    </div>
  );
};

export default UserCards;
