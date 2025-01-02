import React from "react";
import ProductForm from "../components/forms/productForm";
import { useNavigate } from "react-router-dom";
import landingImg from "../assets/b.jpg";

const AddProductPage = () => {
  const navigate = useNavigate();

  const commonCardStyle =
    "flex flex-col items-center w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg p-8";

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full max-w-6xl px-4 md:px-6 py-4 md:py-6">
        {/* Welcome Section */}
        <div className={`${commonCardStyle} transition-transform transform hover:scale-105 duration-300`}>
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Go back to the store
          </h2>
          <p className="text-lg text-gray-200 text-center mb-4">
            We are happy you are here! Explore our store for amazing products.
          </p>
          <button
            className="text-lg font-semibold text-white bg-blue-500 px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            onClick={() => navigate("/home")}
          >
            View Our Store
          </button>
        </div>

        <div className={commonCardStyle}>
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Add a Product
            <ProductForm />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
