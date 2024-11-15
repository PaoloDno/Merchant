import React from "react";
import LoginForm from "../components/forms/login";


const LandingPage = () => {
  return (
    <div className="container flex flex-1 justify-center items-center min-h-[90vh] min-w-full bg-skin-primary px-5 md:px-8 py-12 text-skin-primary text-style3">
      
      <div className="flex flex-col-reverse md:flex-row w-full items-center px-4 md:px-6 py-8 space-x-4 bg-skin-button-primary min-h-[70vh] justify-between md:justify-center rounded-lg shadow-lg min-w-full">
        
        {/* Sign-in Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm p-6 bg-skin-button-secondary w-full bg-opacity-50 text-skin-button rounded-md">
          <span className="text-style3b font-bold">LOGO</span>
          <h2 className="mt-4 text-style3b font-semibold">Sign in to your Account</h2>
          <LoginForm />
        </div>
        
        {/* Welcome Section */}
        <div
          className="flex flex-col justify-center items-center md:w-3/4 w-full h-[60vh] bg-cover bg-center text-white text-center text-4xl p-8 rounded-md"
          style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}
        >
          <p className="mb-4">We Are Happy You Are Here</p>
          <button
            className="text-lg bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            aria-label="View our Store"
          >
            View our Store
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default LandingPage;
