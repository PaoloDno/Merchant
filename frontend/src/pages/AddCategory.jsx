import React from "react";
import CategoryForm from "../components/forms/categoryForm";
import landingImg from "../assets/b.jpg";

const AddCategoryPage = () => {
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
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4 md:px-6 py-4 md:py-6">
        {/* Add Product Section */}
        <div className={commonCardStyle}>
          <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Add a Product
          </h2>
          <CategoryForm />
        </div>
      </div>
    </div>
  );
};

export default AddCategoryPage;
