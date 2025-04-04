import React from "react";
import profileA from "./profileImages/icon8.png";
import profileB from "./profileImages/icon7.png";

const ProfileImage = ({ profile }) => {
  const profileSrc = profile === "admin" ? profileB : profileA;

  return (
    <img
      src={profileSrc}
      alt="profile-avatar"
      className="w-full h-full sm:rounded-full md:rounded-lg object-cover mx-auto flex justify-center items-center"
    />
  );
};

export default ProfileImage;
