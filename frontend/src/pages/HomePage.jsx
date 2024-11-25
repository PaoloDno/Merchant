import React from "react";
import landingImg from "../assets/b.jpg";

const HomePage = () => {
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
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 w-full max-w-6xl px-6 py-12">
        
        {/* Left Ear: Navigation */}
        <nav id="earbar" className="flex flex-col items-center text-white">
          <h2 className="text-xl font-bold mb-4">Navigations</h2>
          <ul className="space-y-2">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </nav>

        {/* Main Content */}
        <section className="flex-1 text-white space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">Main Content</h1>

          {/* Carousel */}
          <div className="bg-gray-800 p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">Carousel</h3>
            <p>Carousel content goes here...</p>
          </div>

          {/* Display Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-md text-center">Row 1</div>
            <div className="bg-gray-700 p-4 rounded-md text-center">Row 2</div>
            <div className="bg-gray-700 p-4 rounded-md text-center">Row 3</div>
          </div>
        </section>

        {/* Right Ear: Great Deals */}
        <aside id="left-ear" className="flex flex-col items-center text-white">
          <h2 className="text-xl font-bold mb-4">Great Deals</h2>
          <ul className="space-y-2">
            <li>Deal 1</li>
            <li>Deal 2</li>
            <li>Deal 3</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
