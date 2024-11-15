import React from "react"

const LoginForm = (props) => {
  return (
    <form className="w-full bg-white 0 bg-opacity-10 p-5 mt-6 rounded-lg">
       <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-4 rounded-md placeholder:text-skin-secondary text-skin-high bg-skin-button-primary bg-opacity-60 hover:bg-skin-secondary hover:bg-opacity-85 transition duration-200"
      />
      <button
        className="w-full p-2 bg-skin-button-primary rounded-md hover:bg-skin-high hover:text-skin-primary transition duration-300"
      >
        Log In
      </button>
      <button className="mt-4 underline hover:text-skin-high" aria-label="Sign up instead?">
              Sign up instead?
      </button>
    </form>
  )
};

export default LoginForm;
