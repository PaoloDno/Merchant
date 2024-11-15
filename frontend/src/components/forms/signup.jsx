import React, { useState } from "react";

const SignUpForm = () => {
  const [step, setStep] = useState(1); // Track the form step
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit all data if the final step is completed
    setIsCompleted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white bg-opacity-10 p-5 mt-6 rounded-lg">
      {!isCompleted ? (
        <>
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
              />
              <button
                type="button"
                onClick={handleNext}
                className="w-full p-2 bg-skin-button-primary rounded-md hover:bg-skin-high hover:text-skin-primary transition duration-300"
              >
                Next: Address Info
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Address Information</h2>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/3 p-2 bg-skin-button-secondary rounded-md hover:bg-skin-high hover:text-skin-primary transition duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/3 p-2 bg-skin-button-primary rounded-md hover:bg-skin-high hover:text-skin-primary transition duration-300"
                >
                  Complete Sign Up
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-green-600 mt-4">Sign-up completed successfully! Thank you for registering.</p>
      )}
    </form>
  );
};

export default SignUpForm;
