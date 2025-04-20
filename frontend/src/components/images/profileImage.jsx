import React from "react";
import profileImage1 from "./profileImages/icon7.png";
import profileImage2 from "./profileImages/icon8.png";
import profileImage3 from "./profileImages/icons9.png";
import profileImage4 from "./profileImages/icons10.png";
import profileImage5 from "./profileImages/icons11.png";
import profileImage6 from "./profileImages/icons12.png";

const ProfileImage = ({ profileImage }) => {
  let profileSrc;

  switch (profileImage) {
    case "avatar1":
      profileSrc = profileImage1;
      break;
    case "avatar2":
      profileSrc = profileImage2;
      break;
    case "avatar3":
      profileSrc = profileImage3;
      break;
    case "avatar4":
      profileSrc = profileImage4;
      break;
    case "avatar5":
      profileSrc = profileImage5;
      break;
    case "avatar6":
      profileSrc = profileImage6;
      break;
    default:
      profileSrc = profileImage1;
  }

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
