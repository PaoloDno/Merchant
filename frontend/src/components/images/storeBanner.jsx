import React from "react";

import img1 from "./storeBannerImages/beriBanner.jpg";
import img2 from "./storeBannerImages/ikeaBanner.jpg";
import img3 from "./storeBannerImages/japanBanner.jpg";
import img4 from "./storeBannerImages/martBanner.jpg";

const StoreBanner = ({ storeBanner }) => {
  let storeBannerImage;

  switch (storeBanner) {
    case "beri":
      storeBannerImage = img1;
      break;
    case "ikea":
      storeBannerImage = img2;
      break;
    case "japan":
      storeBannerImage = img3;
      break;
    case "mart":
      storeBannerImage = img4;
      break;
    default:
      storeBannerImage = img1;
  };

  return (
    <img
      src={storeBannerImage}
      alt={storeBanner}
      className="w-full h-full flex justify-center object-cover mx-auto"
    />
  );
};

export default StoreBanner;
