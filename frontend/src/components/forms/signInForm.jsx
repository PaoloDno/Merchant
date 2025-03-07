import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/actions/authThunks";

const sanitizeInput = (input) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  return input.replace(/[&<>"'/]/g, (match) => map[match]);
};

const LoginForm2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [userCreds, setUserCreds] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((prev) => ({ ...prev, [name]: value })); // Keeping user experience smooth
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedCreds = {
      username: sanitizeInput(userCreds.username),
      password: sanitizeInput(userCreds.password),
    };
  
    const resultAction = await dispatch(loginAction(sanitizedCreds));
  
    if (loginAction.fulfilled.match(resultAction)) {
      console.log('Login successful!');
      const timeoutId = setTimeout(() => {
        navigate('/home');
      }, 1500);
      return () => clearTimeout(timeoutId);
    } else {
      console.log('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {isAuthenticated ? (
        <div className="text-black text-center bg-gray-700- bg-opacity-20 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-2">You're already logged in</h1>
          <p>
            <span className="text-skin-high underline cursor-pointer" onClick={() => navigate("/home")}>
              Continue
            </span>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md bg-white bg-opacity-30 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-black text-center mb-6">Log In to Your Account</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="username"
            value={userCreds.username}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 rounded-md placeholder-gray-700 text-gray-900 bg-gray-100 bg-opacity-80 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={userCreds.password}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 rounded-md placeholder-gray-700 text-gray-900 bg-gray-100 bg-opacity-80 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button type="submit" disabled={isLoading} className="w-full py-2 text-skin-primary bg-skin-primary rounded-md hover:bg-skin-secondary transition duration-300">
            {isLoading ? "Logging In..." : "Log In"}
          </button>
          <button type="button" onClick={() => navigate("/signup")} className="mt-4 text-skin-primary underline hover:text-skin-high transition duration-300">
            Sign up instead?
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default LoginForm2;
