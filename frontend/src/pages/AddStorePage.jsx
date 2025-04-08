import React from "react";
import SellerForm from "../components/forms/sellerForm"
import landingImg from "../assets/b.jpg";

const AddStorePage = () => {

  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-screen w-full px-4 md:px-6 py-4 md:py-6">
        {/* Add Product Section */}
        <div className="flex flex-col items-center w-full max-w-screen bg-white bg-opacity-20 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Add a Store
          </h2>
          <SellerForm />
        </div>
      </div>
    </div>
  );
};

export default AddStorePage;
