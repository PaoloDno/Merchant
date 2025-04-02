import React from "react";
import landingImg from "../../assets/b.jpg";

const HomeProductPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-x-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col md:flex-row 
      items-center justify-center gap-6 md:gap-8 w-full max-w-6xl 
      px-4 md:px-6 py-4 md:py-6">

        <div className="">
        //search bar
        </div>

      </div>
    </div>
  );
};

export default HomeProductPage;
