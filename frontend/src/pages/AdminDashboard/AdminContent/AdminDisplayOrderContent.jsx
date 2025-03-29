import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetOrders } from "../../../redux/actions/adminThunks"
import OrderCards from "../../../components/cards/orderCards";
import PaginationComponent from "../../../components/pagination/Pagination";

const DisplayorderAdmin = () => {
  const dispatch = useDispatch();
  const { orders, pagination } = useSelector((state) => state.admin);
  const { currentPage, totalPages } = pagination;
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(adminGetOrders({page}));
  }, [dispatch, page]);

  return (
    <div className="p-4 md:p-8 flex flex-col justify-between h-full w-full">
      {/* Grid layout for orders */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <OrderCards key={order._id} order={order} onAddToCart={() => {}} onVieworder={() => {}} />
          ))
        ) : (
          <p className="col-span-full text-center">No orders found.</p>
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

export default DisplayorderAdmin;
