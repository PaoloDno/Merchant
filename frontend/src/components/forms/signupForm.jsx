import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerAction } from "../../redux/actions/authThunks";

import { IoMdInformationCircleOutline } from "react-icons/io";

const SignUpForm2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Regex Patterns AI generated
  const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;

  // States
  const [step, setStep] = useState(1);
  //creentials to submit
  const [formData, setFormData] = useState({
    user: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    profile: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    address: {
      street: "",
      city: "",
      landmark: "",
      zipCode: "",
      country: "",
    },
  });
  //errors
  const [errors, setErrors] = useState({
    user: {},
    profile: {},
    address: {},
  });

  const { isLoading } = useSelector((state) => state.auth);

  // Handle Input Change for the "form data"
  const handleChange = (section, field, value) => {
    //spread operator
    setFormData((prev) => ({
      ...prev, //spread operaotr for previous state
      [section]: { //section
        ...prev[section], //spread operator again
        [field]: value, //cahnging the field to its new value
      },
    }));

    //i wonder if i should put the input information here too to set it when being change


    // Clear errors when the user starts typing
    setErrors((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: "",
      },
    }));
  };


  // Validation Logic
  const validateField = (section, field, value) => {
    //ternary operator
    switch (field) {
      case "username":
        return USER_REGEX.test(value) ? "" : "Username must be 3-23 characters, alphanumeric.";
      case "email":
        return EMAIL_REGEX.test(value) ? "" : "Invalid email format.";
      case "password":
        return PWD_REGEX.test(value) ? "" : "Password must be 8-24 characters, include uppercase, lowercase, number, and symbol.";
      case "confirmPassword":
        return value === formData.user.password ? "" : "Passwords do not match.";
      case "firstName":
        return CLEAN_TEXT_REGEX.test(value) && value ? "" : "No special characters allowed.";
      case "lastName":
        return CLEAN_TEXT_REGEX.test(value) && value ? "" : "No special characters allowed.";
      case "street":
        return CLEAN_TEXT_REGEX.test(value) && value ? "" : "No special characters allowed.";
      case "city":
        return CLEAN_TEXT_REGEX.test(value) && value ? "" : "No special characters allowed.";
      case "landmark":
        return CLEAN_TEXT_REGEX.test(value) && value ? "" : "No special characters allowed.";
      case "zipCode":
        return /^\d+$/.test(value) ? "" : "Zip Code must be numeric.";
      case "country":
        return value ? "" : "Country is required.";
      default:
        return "";
    }
  };

  const validateStep = () => {
    const { user, profile, address } = formData;

    let stepErrors = {};
    const fields =
      step === 1
        ? user
        : step === 2
        ? profile
        : step === 3
        ? address
        : {};

    for (const field in fields) {
      const error = validateField(
        step === 1 ? "user" : step === 2 ? "profile" : "address",
        field,
        fields[field]
      );
      if (error) {
        stepErrors[field] = error;
      }
    }

    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({
        ...prev,
        [step === 1 ? "user" : step === 2 ? "profile" : "address"]: stepErrors,
      }));
      return false;
    }
    return true;
  };

  //checks the inputs in the current data
  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const { user, profile, address } = formData;
      const resultAction = await dispatch(registerAction({ user, profile, address }));
      console.log(resultAction);

      if (register.fulfilled.match(resultAction)) {
        navigate("/profile");
      }
    }
  };

  //this is crazy its come from chatGPT but this is the shit! 
  const renderInput = (label, section, field, requirement = "No special characters allowed.", type = "text") => {
    const value = formData[section][field];
    const error = errors[section]?.[field];
  
    return (
      <div className="relative flex flex-1 group flex-col text-white font-medium text-style4a
        md:text-style3 p-1 md:p-4 bg-skin-primary rounded-lg bg-opacity-10 md:mb-3 space-y-4 w-full mb-4">
        <label className="inline-blockblock font-semibold text-style4a md:text-style4a p-1">{label}</label>
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
    const { user, profile, address } = formData;

    return (
      <div>
        {step === 1 && (
          <div className="flex flex-col p-2 min-w-full">
            <h2 className="text-style3 md:text-style3a font-semibold mb-4">User Information</h2>
            {renderInput("Username", "user", "username", "Username must be 3-23 characters, alphanumeric." )}
            {renderInput("Email", "user", "email", "In email format. e.g. carabao@carabao.com")}
            {renderInput("Password", "user", "password", "Password must be 8-24 characters, include uppercase, lowercase, number, and symbol.", "password")}
            {renderInput("Confirm Password", "user", "confirmPassword", "Passwrod should match", "password")}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col p-2 min-w-full">
            <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
            {renderInput("First Name", "profile", "firstName")}
            {renderInput("Last Name", "profile", "lastName")}
            {renderInput("Phone Number", "profile", "phoneNumber")}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col p-2 min-w-full">
            <h2 className="text-2xl font-semibold mb-4">Address Information</h2>
            {renderInput("Street", "address", "street")}
            {renderInput("City", "address", "city")}
            {renderInput("Landmark", "address", "landmark")}
            {renderInput("Zip Code", "address", "zipCode", "Zip Code must be numeric.")}
            {renderInput("Country", "address", "country")}
          </div>
        )}
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
              className="px-4 py-2 bg-skin-button-primary text-skin-primary rounded hover:bg-skin-secondary"
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

export default SignUpForm2;
