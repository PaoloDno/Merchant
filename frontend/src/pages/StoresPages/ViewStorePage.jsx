import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import landingImg from "../../assets/b.jpg";
import { viewStoreAction } from "../../redux/actions/storeThunks";
import { getProductsByStoreAction } from "../../redux/actions/productThunks";

import ProductGrid from '../ProductPages/ProductGrid';

const ViewStorePage = () => {
  const { storeId } = useParams();
  const dispatch = useDispatch();

  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch store info and products
  useEffect(() => {
    let isMounted = true;

    const fetchStoreAndProducts = async () => {
      setLoading(true);
      try {
        // Fetch store
        const storeResult = await dispatch(viewStoreAction(storeId));
        if (isMounted && storeResult.payload) {
          setStore(storeResult.payload);
          setError("");
        } else {
          setError("Store not found.");
        }
        console.log("store", storeResult);

        // Fetch store's products
        const productsResult = await dispatch(getProductsByStoreAction(storeId));
        console.log("product", productsResult);
        if (isMounted && getProductsByStoreAction.fulfilled.match(productsResult)) {
          setProducts(productsResult.payload.products);
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch store or products.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStoreAndProducts();

    return () => {
      isMounted = false;
    };
  }, [storeId, dispatch]);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-x-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-6xl px-4 py-6 md:px-6 bg-slate-300 text-black rounded-lg">
        {loading ? (
          <p className="text-black text-xl">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-xl">{error}</p>
        ) : (
          <>
            {/* Store Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={`/uploads/${store.storeBanner}`}
                alt="Banner"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src={`/uploads/${store.storeLogo}`}
                alt="Logo"
                className="w-24 h-24 rounded-full mt-[-3rem] border-4 border-white shadow-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{store.storeName}</h2>
              <p className="text-gray-700">{store.storeDescription}</p>
            </div>

            {/* Store Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white bg-opacity-60 rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-lg mb-2">Contact</h3>
                <p>Email: {store.contactEmail}</p>
                <p>Phone: {store.contactPhone || "N/A"}</p>
                <p className="mt-2">Address: {store.address}</p>
              </div>

              <div className="bg-white bg-opacity-60 rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-lg mb-2">Store Metrics</h3>
                <p>Total Sales: {store.totalSales}</p>
                <p>Revenue: ${store.revenue}</p>
                <p>Rating: {store.rating} / 5</p>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white bg-opacity-60 rounded-lg p-4 shadow-md">
              <h3 className="font-bold text-xl mb-2">Products</h3>
              <ProductGrid products={products} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewStorePage;
