import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetReviews } from "../../../redux/actions/adminThunks"
import ReviewCards from "../../../components/cards/reviewCards";
import PaginationComponent from "../../../components/pagination/Pagination";

const DisplayreviewAdmin = () => {
  const dispatch = useDispatch();

  const { reviews, pagination } = useSelector((state) => state.admin);
  const { currentPage, totalPages } = pagination;
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(1);

  useEffect(() => {
    dispatch(adminGetReviews({page}));
  }, [dispatch, page]);

  return (
    <div className="p-4 md:p-8 flex flex-col justify-between h-full w-full">
      {/* Grid layout for reviews */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCards key={review._id} review={review} onAddToCart={() => {}} onViewreview={() => {}} />
          ))
        ) : (
          <p className="col-span-full text-center">No reviews found.</p>
        )}
      </div>
      
      {/* Pagination Component */}
      <div className="mt-4 flex justify-center w-full items-center">
        <PaginationComponent 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={setPage} 
        />
      </div>
    </div>
  );
};

export default DisplayreviewAdmin;
