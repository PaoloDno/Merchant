import React from "react";
import { useParams } from "react-router-dom";
import landingImg from "../../assets/b.jpg";

// Ensure the correct component name
import ProductForm from "../../components/forms/ProductForm";

const CreateMyProductPage = () => {
  const { storeId } = useParams();
  console.log(storeId);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-x-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full max-w-6xl px-4 md:px-6 py-4 md:py-6">
        <ProductForm storeId={storeId} />
      </div>
    </div>
  );
};

export default CreateMyProductPage;
