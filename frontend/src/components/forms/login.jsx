import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginAction } from "../../redux/actions/authThunks";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [userCreds, setUserCreds] = useState({ username: "", password: "" });

  //input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch login action (replace `loginAction` with your actual action)
    dispatch(loginAction(userCreds));
  };

  return (
    <div className="container flex flex-col w-full">
      {isAuthenticated ? (
        //already log-in
        <div className="text-high flex flex-col justify-center">
          <h1 className="text-style3 lg:text-style3b font-medium mb-2">
            You're already logged in
          </h1>
          <p>
            <span
              className="text-skin-high cursor-pointer underline"
              onClick={() => navigate("/home")}
            >
              Continue
            </span>
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full bg-skin-high bg-opacity-10 p-5 mt-6 rounded-lg"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userCreds.username}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userCreds.password}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-skin-button-primary rounded-md hover:bg-skin-high hover:text-skin-primary transition duration-300"
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="mt-4 underline hover:text-skin-high"
          >
            Sign up instead?
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
