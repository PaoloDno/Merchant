import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";

import { FaPen as Pencil } from "react-icons/fa";

import {
  updateProfileAction,
  updateAddressAction,
} from "../../../redux/actions/authThunks";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.auth.profile);
  const userAddress = useSelector((state) => state.auth.address);

  const [formData, setFormData] = useState({
    profile: {
      firstname: "",
      lastname: "",
      phoneNumber: "",
      profileImage: "",
    },
    address: {
      street: "",
      city: "",
      zipCode: "",
      country: "",
      landmark: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;
  const NUM_ONLY_REGEX1 = /^[0-9]{8,13}$/;
  const NUM_ONLY_REGEX2 = /^[0-9]{3,6}$/;

  const validateField = (section, field, value) => {
    switch (field) {
      case "firstname":
      case "lastname":
      case "street":
      case "city":
      case "country":
      case "landmark":
        return CLEAN_TEXT_REGEX.test(value)
          ? ""
          : "No special characters allowed";

      case "phoneNumber":
        return NUM_ONLY_REGEX1.test(value)
          ? ""
          : "Numbers Only & 8-13 characters";
      case "zipCode":
        return NUM_ONLY_REGEX2.test(value)
          ? ""
          : "Numbers Only & 3-6 characters";

      default:
        return "";
    }
  };

  const validate = (sectionName) => {
    const section = formData[sectionName];
    let testErrors = {};

    Object.keys(section).forEach((field) => {
      const value = section[field];
      const error = validateField(sectionName, field, value);

      if (error) {
        if (!testErrors[sectionName]) testErrors[sectionName] = {};
        testErrors[sectionName][field] = error;
      }
    });

    setErrors((prevErrors) => ({ ...prevErrors, ...testErrors }));

    return Object.keys(testErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileIsValid = validate("profile");
    const addressIsValid = validate("address");

    if (profileIsValid && addressIsValid) {
      console.log("Form is valid! Submitting...");
      // Perform submission logic here
    } else {
      console.log("Form has errors.", errors);
    }
  };


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (userProfile) {
          setFormData(prev => ({
            ...prev,
            profile: {
              firstname: userProfile.firstname || "",
              lastname: userProfile.lastname || "",
              phoneNumber: userProfile.phoneNumber || "",
              profileImage: userProfile.profileImage || "",
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfileData(); // Call the async function
  }, [userProfile]);
  
  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        if (userAddress) {
          setFormData(prev => ({
            ...prev,
            address: userAddress,
          }));
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
      }
    };
  
    fetchAddressData(); // Call the async function
  }, [userAddress]);

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
        ...prev[section], // Preserve existing errors within the section
        [field]: "", // Clear the error for the specific field
      },
    }));
  };

  const renderInput = (section, label, field, type) => {
    return (
      <div className="flex flex-col group w-full h-full">
        <label className="block font-semibold transition-all duration-300 group-focus-within:font-bold">
          {label}
        </label>
        <input
          type={type}
          value={formData[section][field]}
          onChange={(e) => handleChange(section, field, e.target.value)}
          className="w-full border-b border-black bg-transparent p-1 focus:border-skin-primary focus:ring-2 focus:ring-white focus:outline-none font-bold transition-all duration-300"
        />
        {errors[section] && errors[section][field] && (
          <p className="text-red-600 p-2 bg-slate-200 text-sm">
            <IoMdInformationCircleOutline />
            {errors[section][field]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex w-full h-full p-4 bg-skin-primary bg-opacity-10 pb-5">
      {isEditing ? (
        <form
          className="space-y-8 bg-opacity-10 min-h-[80vh] w-full h-full
        bg-skin-primary p-3"
          onSubmit={handleSubmit}
        >
          <div className="w-full my-2 bg-skin-secondary bg-opacity-40 p-3 rounded-lg pb-6">
            <h3 className="text-style3 flex flex-row md:text-style3a font-bold my-4"><VscAccount className="mx-2" />Profile</h3>

            {renderInput("profile", "First Name", "firstname", "text")}
            {renderInput("profile", "Last Name", "lastname", "text")}
            {renderInput("profile", "Phone Number", "phoneNumber", "text")}
          </div>
          <div className="w-full my-2 bg-skin-secondary bg-opacity-40 p-3 rounded-lg pb-6">
          <h3 className="text-style3 flex flex-row md:text-style3a font-bold my-4"><CiLocationOn className="mx-2" />Address</h3>
            {renderInput("address", "Street", "street", "text")}
            {renderInput("address", "City", "city", "text")}
            {renderInput("address", "Zip Code", "zipCode", "text")}
            {renderInput("address", "Country", "country", "text")}
            {renderInput("address", "Landmark", "landmark", "text")}
          </div>
          <div className="flex flex-row space-x-2">
          <button
            type="submit"
            className="block p-2 px-6 bg-skin-button-secondary text-skin-secondary
            rounded-md md:w-1/6 justify-center items-center"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="block p-2 px-6 bg-skin-button-secondary  text-skin-secondary
            rounded-md md:w-1/6 justify-center items-center"
          >
            Cancel
          </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col w-full h-full bg-skin-primary bg-opacity-10 text-skin-primary
         p-2 py-4 space-y-4">
          <div className="w-full bg-skin-secondary bg-opacity-40 space-y-4 p-3 pb-6 rounded-lg">
            <h2 className="text-style3a md:text-style3a my-2">Profile</h2>
            <hr className="border-t border-skin-primary my-4" />
            <p>First Name: {formData.profile.firstname}</p>
            <p>Last Name: {formData.profile.lastname}</p>
            <p>Phone Number: {formData.profile.phoneNumber}</p>
          </div>
          <div className="w-full bg-skin-secondary bg-opacity-40 space-y-4 p-3 pb-6 rounded-lg">
            <h2 className="text-style3a md:text-style3a my-2">Address</h2>
            <hr className="border-t border-skin-primary my-4" />
            <p>Street: {formData.address.street}</p>
            <p>City: {formData.address.city}</p>
            <p>Zip Code: {formData.address.zipCode}</p>
            <p>Country: {formData.address.country}</p>
            <p>Landmark: {formData.address.landmark}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex flex-row p-2 px-6 bg-skin-button-secondary
            rounded-md text-skin-secondary md:w-1/6 justify-center items-center mb-4"
          >
            <Pencil className="mr-2"/> Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
