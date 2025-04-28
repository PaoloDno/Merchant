import React, { useState, useEffect} from "react";
import {  } from "../../redux/actions/authThunks";

const InitializeUser = ({ handlePopup }) => {
  return (
    <button
          onClick={() => handlePopup("user")}
          aria-label="User"
          className="flex justify-center items-center rounded-[0.375rem] hover:bg-skin-fill-3 
          hover:text-skin-secondary box-content aspect-square w-10 transition-all duration-300 
          ease-in-out hover:rounded-full hover:scale-110"
        >
          <VscAccount />
    </button>
  )
};

export default InitializeUser;
