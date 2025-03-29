import React from "react";

const OrderCards = ({ order, onViewOrder }) => {
  const { username, items, totalAmount, paymentStatus, orderStatus } = order;

  return (
    <div className="border rounded-lg p-4 shadow-md w-64 text-skin-primary">
      <h3 className="text-lg font-bold">{username}</h3>
      <p className="text-sm">Total Items: {items.length}</p>
      <p className="text-sm">Total Amount: ${totalAmount}</p>
      <p className="text-sm">Payment: {paymentStatus}</p>
      <p className="text-sm">Status: {orderStatus}</p>

      <div className="mt-3 flex space-x-2">
        <button
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          onClick={() => onViewOrder(order)}
        >
          View Order
        </button>
      </div>
    </div>
  );
};

export default OrderCards;
