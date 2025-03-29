import React from "react";

const UserCards = ({ profile, onViewprofile }) => {
  const { lastname, firstname, phoneNumber } = profile;

  return (
    <div className="border rounded-lg p-4 shadow-md w-25 md:w-54 text-skin-primary">
      <h3 className="text-style4a font-bold">{lastname}</h3>
      <p className="text-style4">{firstname}</p>
      <p className="font-semibold">No: ${phoneNumber}</p>
      
      <div className="mt-3 flex space-x-2">
        <button 
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" 
          onClick={() => onViewprofile(profile)}
        >
          View profile
        </button>
      </div>
    </div>
  );
};

export default UserCards;

