import React from "react";
import LoginForm from "../components/forms/login";
import { useNavigate } from "react-router-dom";
import landingImg from "./../assets/isetan.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container flex flex-col justify-center items-center min-h-screen bg-skin-primary px-5 py-12 text-skin-primary text-style3">
      
      <div className="flex flex-col md:flex-row-reverse w-full max-w-7xl items-center bg-skin-button-primary rounded-lg shadow-lg p-6 md:p-8 space-y-8 md:space-y-0 md:space-x-8">
        
        {/* Sign-in Section */}
        <div className="flex flex-col items-center sm:w-full sm:max-w-sm p-6 bg-skin-button-secondary bg-opacity-50 text-skin-button rounded-md shadow-md min-h-[400px] md:min-h-[500px]">
          <span className="text-style3b font-bold">LOGO</span>
          <h2 className="mt-4 text-style3b font-semibold text-center">
            Sign in to your Account
          </h2>
          <LoginForm />
        </div>
        
        {/* Welcome Section */}
        <div className="relative flex flex-col justify-center items-center md:w-3/4 w-full min-h-[400px] md:min-h-[500px] bg-cover bg-center text-center text-style3 md:text-style2 rounded-md overflow-hidden">
          <img
            alt="landing page image"
            src={landingImg}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black to-skin-start opacity-70"></div>
          <div className="relative z-10 flex flex-col items-center bg-skin-button-primary bg-opacity-90 p-8 md:p-10 rounded-md shadow-md hover:bg-opacity-100 transition-opacity duration-300 ease-in">
            <p className="mb-4 text-lg">We Are Happy You Are Here</p>
            <button
              className="text-lg font-semibold text-skin-primary bg-skin-primary px-4 py-2 rounded-md hover:bg-skin-secondary transition-colors duration-300"
              aria-label="View our Store"
              onClick={() => navigate('/home')}
            >
              View Our Store
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default LandingPage;
