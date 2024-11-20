import React from "react";
import LoginForm2 from "../components/forms/signInForm";
import { useNavigate } from "react-router-dom";
import landingImg from "../assets/b.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-x-hidden">
      {/* Background Image */}
      <img
        src={landingImg}
        alt="Landing Page Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute w-full h-full inset-0 bg-black bg-opacity-40"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl px-6 py-6">
        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg p-8 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Welcome to Our Store
          </h2>
          <p className="text-lg text-gray-200 text-center mb-4">
            We are happy you are here! Explore our store for amazing products.
          </p>
          <button
            className="text-lg font-semibold text-skin-button bg-skin-button-secondary px-6 py-2 rounded-full hover:bg-skin-button-primary transition duration-300"
            onClick={() => navigate("/home")}
          >
            View Our Store
          </button>
          
          <div className="absolute inset-0 w-full h-full -z-10 backdrop-blur-sm"></div>
        </div>

        {/* Sign-in Section */}
        <div className="flex flex-col items-center w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Sign In to Your Account
          </h2>
          <LoginForm2 />
          <div className="absolute inset-0 w-full h-full -z-10 backdrop-blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
