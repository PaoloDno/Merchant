import React from "react";
import profileA from "./profileImages/icon8.png"; // default user
import profileB from "./profileImages/icon7.png"; // admin user

const ProfileImage = ({ isAdmin }) => {
  const profileSrc = isAdmin ? profileB : profileA;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        src={profileSrc}
        alt="profile-avatar"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
};

export default ProfileImage;
