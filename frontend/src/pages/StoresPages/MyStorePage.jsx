import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { viewStoreAction } from "../../redux/actions/storeThunks";
import landingImg from "../../assets/b.jpg";

const MyStorePage = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStore = async () => {
      if (!storeId) {
        setError("Store ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const resultAction = await dispatch(viewStoreAction(storeId));

        if (resultAction.payload) {
          setStore(resultAction.payload);
        } else {
          setError("Store not found.");
        }
      } catch (error) {
        setError("Failed to fetch store. Please try again.");
      }
      setLoading(false);
    };

    fetchStore();
  }, [dispatch, storeId]);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-x-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full max-w-6xl px-4 md:px-6 py-4 md:py-6">
        {loading ? (
          <p className="text-white text-lg">Loading store details...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">{error}</p>
        ) : store ? (
          <>
            {/* Store Profile & Settings */}
            <div className="flex flex-col w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-white">Store Profile</h2>
              <p className="text-white">{store.storeName}</p>
              <p className="text-white">{store.storeDescription}</p>
            </div>

            {/* Store Products */}
            <div className="flex flex-col w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-white">Store Products</h2>
              {store.products && store.products.length > 0 ? (
                <ul className="text-white">
                  {store.products.map((product) => (
                    <li key={product._id} className="border-b border-gray-300 py-1">
                      {product.name} - ${product.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">No products available.</p>
              )}
              <button
                onClick={() => navigate(`/addProduct/${storeId}`)}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
              >
                Add New Product
              </button>
            </div>

            {/* Store Stats & Reviews */}
            <div className="flex flex-col w-full max-w-md bg-white bg-opacity-20 rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-bold text-white">Store Stats</h2>
              <p className="text-white">Total Sales: {store.totalSales || 0}</p>
              <p className="text-white">Revenue: ${store.revenue || 0}</p>
              <p className="text-white">Rating: {store.rating || "N/A"}</p>
            </div>
          </>
        ) : (
          <p className="text-white">Store not found.</p>
        )}
      </div>
    </div>
  );
};

export default MyStorePage;
