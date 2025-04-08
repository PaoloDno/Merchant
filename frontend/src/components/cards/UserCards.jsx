import React from "react";
import { FaUserShield, FaUserCheck, FaBan } from "react-icons/fa";
import ProfileImage from "../images/profileImage";

const UserCards = ({ profile, onViewprofile }) => {
  const { lastname, firstname, phoneNumber, stores, userId } = profile;
  const { isAdmin = false, username = "Unknown", isBanned = false, isVerified = false } = userId || {};

  const badgeStyle = (active, color) =>
    `text-lg ${active ? `text-${color}-600` : "text-gray-400"}`;

  return (
    <div className="border rounded-lg p-3 shadow-md w-[150px] md:w-[220px] bg-white hover:shadow-lg transition">
      <div className="w-[80px] h-[80px] mx-auto mb-2 rounded-full overflow-hidden border">
        <ProfileImage isAdmin={isAdmin} />
      </div>

      <h1 className="font-bold text-center">{username}</h1>
      <p className="text-center text-sm text-gray-700">
        {firstname} {lastname}
      </p>

      <p className="text-sm">Phone: {phoneNumber}</p>
      <p className="text-sm">Stores: {stores?.length || 0}</p>

      <div className="flex justify-center gap-3 mt-2">
        <FaUserShield className={badgeStyle(isAdmin, "green")} title="Admin" />
        <FaUserCheck className={badgeStyle(isVerified, "blue")} title="Verified" />
        <FaBan className={badgeStyle(isBanned, "red")} title="Banned" />
      </div>

      <button
        className="mt-3 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 w-full"
        onClick={() => onViewprofile(profile)}
      >
        View Profile
      </button>
    </div>
  );
};

export default UserCards;
