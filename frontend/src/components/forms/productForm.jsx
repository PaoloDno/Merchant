import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { createProduct } from "../../redux/actions/productThunks";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("productFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          basicInfo: {
            productName: "",
            description: "",
            price: "",
            stock: "",
          },
          categoryDetails: {
            category: "",
            subCategory: "",
            features: "",
          },
          specifications: {
            color: "",
            material: "",
            size: "",
          },
        };
  });

  const [errors, setErrors] = useState({
    basicInfo: {},
    categoryDetails: {},
    specifications: {},
  });

  const [isLoading, setIsLoading] = useState(false);

  const rules = {
    productName: {
      regex: /^[^<>\/\?@!]{3,12}$/,
      error: "Must be 3-12 characters, no special characters.",
    },
    price: {
      regex: /^\d+(\.\d{1,2})?$/,
      error: "Must be a valid number.",
    },
    stock: {
      regex: /^\d+$/,
      error: "Must be a whole number.",
    },
    category: {
      regex: /^[^<>\/\?@!]{3,12}$/,
      error: "Must be 3-12 characters, no special characters.",
    },
  };

  const validateField = (field, value) => {
    const rule = rules[field];
    return rule && !rule.regex.test(value) ? rule.error : value ? "" : "This field is required.";
  };

  const validateStep = () => {
    const currentSection = step === 1 ? "basicInfo" : step === 2 ? "categoryDetails" : "specifications";
    const fields = formData[currentSection];
    const stepErrors = {};

    for (const field in fields) {
      const error = validateField(field, fields[field]);
      if (error) stepErrors[field] = error;
    }

    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({ ...prev, [currentSection]: stepErrors }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsLoading(true);
      try {
        await dispatch(createProduct(formData));
        navigate("/success");
      } catch (error) {
        console.error("Submission failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: "",
      },
    }));
  };

  useEffect(() => {
    localStorage.setItem("productFormData", JSON.stringify(formData));
  }, [formData]);

  const renderInput = (label, section, field, requirement, type = "text") => {
    const value = formData[section][field];
    const error = errors[section]?.[field];

    return (
      <div className="relative flex flex-1 group flex-col text-white font-medium text-style4a
        md:text-style3 p-1 md:p-4 bg-skin-primary rounded-lg bg-opacity-10 md:mb-3 space-y-4 w-full mb-4">
        <label className="inline-blockblock text-left font-semibold text-style4b md:text-style4b p-1">{label}</label>
        <div className="relative group container box-border my-4">
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(section, field, e.target.value)}
          placeholder={`${label}`}
          autoComplete={`${label}`}
          className={`w-full p-2 md:p-4 border  rounded placeholder-gray-600 text-gray-900 bg-gray-100 bg-opacity-80 focus:ring-2 box-border
            ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "focus:ring-blue-500 focus:outline-none"
            }`}
        />
        {requirement && (
          <div
            className="absolute hidden left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full
            opacity-0 group-hover:opacity-100 transition-opacity group-hover:flex text-style4a w-full p-2
            duration-400 bg-blue-500 text-white rounded-md flex-nowrap z-10">
            <IoMdInformationCircleOutline className="mr-2" /> {requirement}
          </div>
        )}
        </div>
        {error && (
        <p className="text-slate-300 md:text-gray-200 bg-red-600 bg-opacity-40 md:bg-opacity-20 mt-1 px-2 text-style4 md:text-style3">
          {error}
        </p>
      )}
      </div>
    );
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div>
          <h2 className="text-lg font-bold mb-4">Basic Information</h2>
          {renderInput("Product Name", "basicInfo", "productName", "3-12 characters, no special characters.")}
          {renderInput("Description", "basicInfo", "description", "Provide a brief description.")}
          {renderInput("Price", "basicInfo", "price", "Enter a valid price.", "number")}
          {renderInput("Stock", "basicInfo", "stock", "Enter stock quantity.", "number")}
        </div>
      );
    }
    if (step === 2) {
      return (
        <div>
          <h2 className="text-lg font-bold mb-4">Category Details</h2>
          {renderInput("Category", "categoryDetails", "category", "3-12 characters, no special characters.")}
          {renderInput("Subcategory", "categoryDetails", "subCategory", "Specify the subcategory.")}
          {renderInput("Features", "categoryDetails", "features", "List the product features.")}
        </div>
      );
    }
    return (
      <div>
        <h2 className="text-lg font-bold mb-4">Specifications</h2>
        {renderInput("Color", "specifications", "color", "Specify the color.")}
        {renderInput("Material", "specifications", "material", "Specify the material.")}
        {renderInput("Size", "specifications", "size", "Specify the size.")}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-800 bg-opacity-50 text-white min-w-full rounded-lg
     shadow-lg max-w-lg mx-auto">
      <form onSubmit={handleSubmit} >
        {renderStep()}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 bg-skin-secondary text-skin-primary rounded hover:bg-gray-600"
            >
              <FaAngleLeft className="inline mr-2" /> Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-skin-secondary text-skin-primary rounded hover:bg-gray-600"
            >
              Next <FaAngleRight className="inline ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded ${
                isLoading ? "bg-gray-300" : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
