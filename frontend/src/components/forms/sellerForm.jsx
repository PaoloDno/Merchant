import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createStoreAction } from "../../redux/actions/storeThunks";
import PreviewCreateStoreImages from "../images/StoreCreateImagePreview";


const SellerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    storeLogo: "",
    storeBanner: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateField = (field, value) => {
    switch (field) {
      case "storeName":
        return value.trim().length >= 3 ? "" : "Store name must be at least 3 characters.";
      case "storeDescription":
        return value.trim().length >= 10 ? "" : "Description must be at least 10 characters.";
      case "contactEmail":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email format.";
      case "contactPhone":
        return /^\d{10,15}$/.test(value) ? "" : "Phone number must be 10-15 digits.";
      case "address":
        return value.trim().length > 5 ? "" : "Address must be at least 5 characters.";
      case "storeLogo":
        return value ? "" : "Please select a store logo.";
      case "storeBanner":
        return value ? "" : "Please select a store banner.";
      default:
        return "";
    }
  };


  const validateStep = () => {
    const stepErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) stepErrors[field] = error;
    });
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      await dispatch(createStoreAction(formData));
      navigate("/home");
    } catch (error) {
      console.error("Submission failed", error);
    }
    setIsLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const renderInput = (label, field) => (
    <div className="mb-4 flex flex-col">
      <label className="block text-white font-semibold">{label}</label>
      <input
        type="text"
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full p-2 border rounded text-black ${errors[field] ? "border-red-500" : "border-gray-300"}`}
      />
      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
    </div>
  );

  const renderSelect = (label, field, options) => (
    <div className="mb-4 flex-col">
      <label className="block text-white font-semibold">{label}</label>
      <select
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full p-2 border rounded text-black ${errors[field] ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="p-6 bg-gray-800 text-white w-full mx-auto rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Image Preview Section */}
      <div className="md:col-span-1">
        <PreviewCreateStoreImages 
          storeLogo={formData.storeLogo} 
          storeBanner={formData.storeBanner} 
        />
      </div>

      {/* Form Section */}
      <form 
        onSubmit={handleSubmit} 
        className="md:col-span-2 flex flex-col"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-2">
          {renderInput("Store Name", "storeName")}
          {renderInput("Store Description", "storeDescription")}
          {renderInput("Contact Email", "contactEmail")}
          {renderInput("Contact Phone", "contactPhone")}
          {renderInput("Address", "address")}
          {renderSelect("Store Logo", "storeLogo", ["macas", "cafe", "mart"])}
          {renderSelect("Store Banner", "storeBanner", ["beri", "ikea", "japan", "mart"])}
        </div>
        <div className="mt-6 text-right">
          <button type="submit" className="px-4 py-2 bg-green-500 rounded">
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default SellerForm;
