import React from "react";
import cafe from "../images/storeImages/cafe.jpg";
import macas from "../images/storeImages/macas.jpg";
import mart from "../images/storeImages/mart.jpg";

import beri from "../images/storeBannerImages/beriBanner.jpg";
import ikea from "../images/storeBannerImages/ikeaBanner.jpg";
import japan from "../images/storeBannerImages/japanBanner.jpg";
import martBanner from "../images/storeBannerImages/martBanner.jpg";

const logoMap = {
  cafe,
  macas,
  mart,
};

const bannerMap = {
  beri,
  ikea,
  japan,
  mart: martBanner,
};

const PreviewCreateStoreImages = ({
  storeLogo,
  storeBanner,
  storeName = "Your Store",
}) => {
  const logoKey = storeLogo && logoMap[storeLogo] ? storeLogo : "cafe";
  const bannerKey =
    storeBanner && bannerMap[storeBanner] ? storeBanner : "japan";

  return (
    <div className="w-full md:w-[400px] bg-gray-700 p-4 rounded-lg shadow-md text-white space-y-4">
      {/* Banner + Logo + Store Name */}
      <div className="relative w-full">
        <img
          src={bannerMap[bannerKey]}
          alt="Store Banner"
          className="w-full h-24 object-cover rounded"
        />

        {/* Gradient + Text Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-slate-600 to-transparent rounded-b" />

        {/* Logo + Name Overlay */}
        <div className="absolute bottom-0 left-2 flex items-center">
          <img
            src={logoMap[logoKey]}
            alt="Store Logo"
            className="w-16 h-16 object-cover rounded-full border-2 border-white"
          />
          <h2 className="ml-3 text-lg font-bold">{storeName}</h2>
        </div>
      </div>

      {/* Store Description Section */}
      <div className="bg-gray-600 h-10 w-full p-2 rounded-md">
        <p className="font-semibold text-white">Store Description Section</p>
      </div>

      {/* Small Preview Cards */}
      <div>
        <p className="font-semibold mb-2">Preview Products</p>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-600 rounded-lg p-2 text-center text-sm"
            >
              <div className="w-full h-12 bg-gray-500 rounded mb-1" />
              <p>Item {idx + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewCreateStoreImages;
