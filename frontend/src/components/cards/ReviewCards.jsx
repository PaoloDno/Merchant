import React from "react";

const ReviewCards = ({ review, onViewreview }) => {
  const { username, rating, comment } = review;

  return (
    <div className="border rounded-lg p-4 shadow-md w-25 md:w-54 text-skin-primary">
      <h3 className="text-style4a font-bold">{username}</h3>
      <p className="text-style4">{rating}</p>
      <p className="font-semibold">{comment}</p>
      
      <div className="mt-3 flex space-x-2">
        <button 
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" 
          onClick={() => onViewreview(review)}
        >
          View review
        </button>
      </div>
    </div>
  );
};

export default ReviewCards;

