import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createCategoryActions, createSubCategoryActions} from "../../redux/actions/categoryThunks";



const CategoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("category"); // Can be "category" or "subcategory"

  const validate = () => {
    const CLEAN_TEXT = /^[^&<>"'/]*$/;
    const testErrors = {};
    Object.keys(categoryData).forEach(field => {
      const error = CLEAN_TEXT.test(categoryData[field]) ? "" : "No special characters allowed";
      if (error) testErrors[field] = error; 
    });
    setErrors(testErrors);
    return Object.keys(testErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      if (mode === "category") {
        // Dispatch category action
        const resultAction = await dispatch(createCategoryActions(categoryData));
        if (createCategoryActions.fulfilled.match(resultAction)) console.log("Success:", resultAction);

      } else if (mode === "subcategory") {
        // Dispatch subcategory action
        const resultAction = await dispatch(createSubCategoryActions(categoryData));
        if (createSubCategoryActions.fulfilled.match(resultAction)) console.log("Success:", resultAction);

      }
      setCategoryData({
        name: "",
        description: ""
      })
      // Redirect to a desired page after submission
      navigate("/cat");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    
      // Start loading
      setIsLoading(true);
    
      // Set a timeout to stop loading after 3 seconds
      let timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    
      // Clean up the timeout when the component is unmounted or the effect re-runs
      return () => clearTimeout(timeoutId);
  };

  const handleChange = (field, value) => {
    setCategoryData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const renderInput = (label, field) => {
    return (
      <div className="mb-4">
        <label className="block text-white font-semibold">{label}</label>
        <input
          type="text"
          value={categoryData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          className={`w-full p-2 border rounded text-black ${errors[field] ? "border-red-500" : "border-gray-300"}`}
        />
        {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-800 text-white max-w-lg mx-auto rounded-lg">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 rounded ${mode === "category" ? "bg-blue-500" : "bg-gray-500"}`}
          onClick={() => setMode("category")}
        >
          Category
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "subcategory" ? "bg-blue-500" : "bg-gray-500"}`}
          onClick={() => setMode("subcategory")}
        >
          Subcategory
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {renderInput("Name", "name")}
        {renderInput("Description", "description")}
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : `Create ${mode === "category" ? "Category" : "Subcategory"}`}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
