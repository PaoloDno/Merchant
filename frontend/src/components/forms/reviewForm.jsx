import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewAction } from "../../redux/actions/reviewThunks";

const CreateReviewForm = ({ productId }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hover, setHover] = useState(1);
  const [open, setOpen] = useState(true); // Assuming it should be true by default

  const validate = (value) => {
    const CLEANTEXT = /^[^&<>"']*$/;
    if (!value.trim()) {
      setError("The comment section can't be empty");
      return false;
    }
    if (!CLEANTEXT.test(value)) {
      setError("Invalid text: do not include special characters (& < > \" ')");
      return false;
    }
    setError(null); // Clear error if valid
    return true;
  };

  const handleSubmit = async () => {
    if (!validate(comment)) return;

    try {
      setLoading(true);
      await dispatch(createReviewAction(productId, { rating, comment }));
      setOpen(false);
      setComment("");
      setRating(1);
    
    } catch (err) {
      setError("Failed to submit review.");
    
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setComment("");
    setRating(1);
    setError(null);
  };

  const renderStarRating = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(rating)}
            className={`text-2xl ${
              star <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (!open) return null;

  return (
    <div className="p-3 border rounded-md shadow-sm bg-white w-full mx-auto">
      <h2 className="text-style4 font-semibold mb-2">Write a Review</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 border rounded-md mb-2"
      />

      <div className="mb-4">{renderStarRating()}</div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateReviewForm;
