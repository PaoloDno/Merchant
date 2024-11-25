import React from "react";
import SignUpForm2 from "../components/forms/signupForm";
import backgroundVideo from "../assets/a.mp4";
import { useNavigate } from "react-router-dom";


const SignUpPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full py-10 overflow-x-hidden">
      {/* Background Video */}
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        className="hidden bg-gray-800 md:flex md:absolute top-0 left-0 w-full h-full object-cover"
        aria-label="Background Video"
      ></video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full min-w-sm h-full bg-black md:bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 min-w-sm w-full max-w-6xl px-6 rounded-lg">
        {/* Sign-Up Form */}
        <div className="flex flex-col w-full max-w-screen-sm bg-slate-100 bg-opacity-20 rounded-lg shadow-lg 
        md:p-8 p-1 transition-transform transform my-2 duration-300">

          <div className="absolute backdrop-blur-xl w-full h-full inset-0 -z-10 rounded-xl"></div>

          <h2 className="text-style4a md:text-3xl font-semibold text-white text-center my-2 md:mb-6">
            Create an Account
          </h2>
          <SignUpForm2 />
        </div>

        {/* Login Prompt */}
        <div className="flex flex-col justify-center items-center text-center bg-white bg-opacity-20 backdrop-blur-xl rounded-lg shadow-lg 
        p-8 transition-transform transform hover:scale-x-105 duration-300">
          <p className="text-style2 font-medium text-gray-200 mb-4">
            Already have an account?
          </p>
          <button
            className="text-primary text-lg font-medium px-6 py-2 rounded-full bg-skin-primary md:bg-skin-button-primary bg-opacity-30 hover:bg-skin-high transition duration-300"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
