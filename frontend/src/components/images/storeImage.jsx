import React from "react";

import img1 from "./storeImages/macas.jpg";
import img2 from "./storeImages/cafe.jpg";
import img3 from "./storeImages/mart.jpg";

const StoreImage = ({ storeLogo }) => {
  let storeImage;

  switch (storeLogo) {
    case "macas":
      storeImage = img1;
      break;
    case "cafe":
      storeImage = img2;
      break;
    case "mart":
      storeImage = img3;
      break;
    default:
      storeImage = img1;
  }

  return (
    <img
      src={storeImage}
      alt={storeLogo}
      className="h-full w-full sm:rounded-full md:rounded-lg object-cover mx-auto"
    />
  );
};

export default StoreImage;
