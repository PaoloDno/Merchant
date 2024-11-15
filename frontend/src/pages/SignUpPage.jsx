import React from "react"
import SignUpForm from "../components/forms/signup";

const SignUpPage = () => {
  return (
    <div className="container flex flex-1 justify-center items-center min-h-[80vh] min-w-full bg-skin-primary px-2 md:px-8 py-12 text-skin-primary text-style3">
      <div className="flex flex-col md:flex-row w-full md:w-2/3 h-4/5">
        <div className="w-1/3 h-full">
          <SignUpForm />
        </div>
        <div className="w-2/3 bg-white">

        </div>
      </div>
    </div>
  )
};

export default SignUpPage;