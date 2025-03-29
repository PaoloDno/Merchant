import React from "react";

const StoreImage = ({ storeLogo }) => {
  const storeImage = `//folder/${storeLogo}.jpg`;

  return (
    <img 
      src={storeImage} 
      alt={storeLogo} 
      className="w-full h-full sm:rounded-full md:rounded-lg object-cover mx-auto"
    />
  );
};


export default StoreImage;