import React from "react";

const ShoppingCartPage = ({ user, items, totalAmount }) => {
  return (
    <div className="min-h-screen flex flex-col gap-6 p-6 bg-gray-100">
      {/* User Details */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">User Details</h2>
        <p className="text-gray-600">Name: {user?.name || "Guest"}</p>
        <p className="text-gray-600">Email: {user?.email || "Not Provided"}</p>
      </div>

      {/* Amount Summary */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Amount Summary</h2>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Items:</span>
          <span className="font-semibold">{items?.length || 0}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-semibold">${totalAmount?.toFixed(2) || "0.00"}</span>
        </div>
      </div>

      {/* Items in Cart */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Items in Cart</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-sm bg-gray-50 flex flex-col gap-2"
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 col-span-full">No items in your cart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
