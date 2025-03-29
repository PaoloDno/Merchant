import React from "react";

const ProfileImage = ({ isAdmin, isVerify }) => {
  const profileImage = `//folder/${isAdmin}-${isVerify}.jpg`;

  return (
    <img 
      src={profileImage} 
      alt={'profile-avatar-'} 
      className="w-full h-full sm:rounded-full md:rounded-lg object-cover mx-auto"
    />
  );
};


export default ProductImage;