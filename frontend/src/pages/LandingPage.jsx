import React from "react"

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <span className="flex justify-center items-center min-h-screen">
        <span className="flex justify-center items-center
          bg-black text-skin-primary text-4xl
          min-w-96 min-h-screen
        ">
          Welcome Message
        </span> 
        <span className="flex justify-center items-center
        bg-fuchsia-300 text-skin-secondary text-4xl
          min-w-96 min-h-screen">
            Log-in and Log-out
        </span>
         
      </span>
    </div>
  )
};

export default LandingPage;
