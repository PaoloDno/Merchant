import React from "react";
import LoginForm2 from "../components/forms/signInForm";
import backgroundVideo from "./../assets/a.mp4";

const LoginPage = () => {
  return (
    <div className="relative flex items-center justify-center
    min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        aria-label="Background Video"
      ></video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-800 backdrop-blur-sm   bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full max-w-6xl px-6">
        {/* Login Form */}
        <div className="flex flex-col w-full max-w-md bg-gray-800 bg-opacity-50 rounded-lg shadow-lg p-8 ">
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Welcome Back
          </h2>
          <LoginForm2 />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
