import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { createSeller } from "../../redux/actions/sellerThunks";

const SellerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
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

  const handleNext = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      await dispatch(createSeller(formData));
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
    <div className="mb-4">
      <label className="block text-white font-semibold">{label}</label>
      <input
        type="text"
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full p-2 border rounded ${errors[field] ? "border-red-500" : "border-gray-300"}`}
      />
      {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="p-6 bg-gray-800 text-white max-w-lg mx-auto rounded-lg">
      <form onSubmit={handleSubmit}>
        {renderInput("Store Name", "storeName")}
        {renderInput("Store Description", "storeDescription")}
        {renderInput("Contact Email", "contactEmail")}
        {renderInput("Contact Phone", "contactPhone")}
        {renderInput("Address", "address")}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button type="button" onClick={handleBack} className="px-4 py-2 bg-gray-600 rounded">
              <FaAngleLeft className="inline mr-2" /> Back
            </button>
          )}
          {step < 2 ? (
            <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-500 rounded">
              Next <FaAngleRight className="inline ml-2" />
            </button>
          ) : (
            <button type="submit" className="px-4 py-2 bg-green-500 rounded">
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SellerForm;
