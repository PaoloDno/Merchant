import React from "react";
import landingImg from "../assets/b.jpg";
import { Link } from "react-router-dom";
import Carousel from "../components/home/carousel";

const sideNavs = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/product" },
  { name: "Contact", path: "/" },
];

const carouselImages = [
  'https://via.placeholder.com/800x400?text=Slide+1',
  'https://via.placeholder.com/800x400?text=Slide+2',
  'https://via.placeholder.com/800x400?text=Slide+3',
];

const HomePage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full min-w-screen overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Main Layout */}
      <div className="relative container flex flex-row items-start justify-center gap-8 max-w-6xl px-6 py-10 z-20">
        {/* Navigation Sidebar */}
        <nav
          id="sidebar"
          className="hidden md:flex flex-col items-start bg-black bg-opacity-60 border border-gray-700 p-4 text-white w-1/5 h-screen space-y-7"
        >
          <h2 className="text-lg font-bold mb-4">Navigations</h2>
          {sideNavs.map((button) => (
            <Link
              className="block text-style3 hover:text-skin-button cursor-pointer"
              key={button.name}
              to={button.path}
            >
              {button.name}
            </Link>
          ))}
        </nav>

        {/* Main Content Section */}
        <section className="flex-1 w-full md:w-3/5 bg-black bg-opacity-80 p-6 text-white space-y-6 min-h-screen">
          <h1 className="text-4xl md:text-6xl font-bold font-Londrina">Merchant</h1>

          {/* Carousel */}
          <div className="bg-gray-800 p-2 rounded-md shadow-md">
            <h3 className="text-xl font-semibold">Featured Products</h3>
            <p>Carousel content goes here...</p>
            <Carousel images={carouselImages} />
          </div>

          {/* Display Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-md text-center">Row 1</div>
            <div className="bg-gray-700 p-4 rounded-md text-center">Row 2</div>
            <div className="bg-gray-700 p-4 rounded-md text-center">Row 3</div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside
          id="right-sidebar"
          className="hidden md:flex w-1/5 flex-col items-center bg-black bg-opacity-60 border border-gray-700 text-white p-4"
        >
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
