import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setStore } from "../../../redux/reducers/storeSlice";

const EditStore = () => {
  const selectedStore = useSelector((state) => state.store.store);
  const userStores = useSelector((state) => state.store.stores);

  const dispatch = useDispatch();

  const [stores, setStores] = useState([]);
  const [data, setData] = useState({
    storeName: "",
    storeDescription: "",
    storeLogo: "",
    storeBanner: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    products: {},
    totalSales: null,
    revenue: null,
    rating: null,
    reviews: [],
    isVerified: false,
  });

  useEffect(() => {
    const fetchStoreData = () => {
      if (selectedStore) {
        setData({
          storeName: selectedStore.storeName || "",
          storeDescription: selectedStore.storeDescription || "",
          storeLogo: selectedStore.storeLogo || "",
          storeBanner: selectedStore.storeBanner || "",
          contactEmail: selectedStore.contactEmail || "",
          contactPhone: selectedStore.contactPhone || "",
          address: selectedStore.address || "",
          products: selectedStore.products || {},
          totalSales: selectedStore.totalSales || null,
          revenue: selectedStore.revenue || null,
          rating: selectedStore.rating || null,
          reviews: selectedStore.reviews || [],
          isVerified: selectedStore.isVerified || false,
        });
      }
    };
  
    fetchStoreData();
  }, [selectedStore, dispatch]);

  useEffect(() => {
    const fetchStoresData = () => {
      if (userStores) {
        setStores(userStores); // Set all user stores to the state
      }
    };

    fetchStoresData();
  }, [userStores]);

  const handleStoreSelection = (store) => {
    console.log(store);
    dispatch(setStore(store));
  setData({
    storeName: store.storeName || "",
    storeDescription: store.storeDescription || "",
    storeLogo: store.storeLogo || "",
    storeBanner: store.storeBanner || "",
    contactEmail: store.contactEmail || "",
    contactPhone: store.contactPhone || "",
    address: store.address || "",
    products: store.products || {},
    totalSales: store.totalSales || null,
    revenue: store.revenue || null,
    rating: store.rating || null,
    reviews: store.reviews || [],
    isVerified: store.isVerified || false,
  });
  };

  return (
    <div className="flex flex-col p-4 border border-gray-300 rounded-lg max-w-md mx-auto w-full h-full justify-between">
      {data.storeName && ( // Conditionally render the data section
        <div>
          <div className="mb-4">
            {data.storeLogo && (
              <img
                src={data.storeLogo}
                alt="Store Logo"
                className="w-20 h-20 rounded-full mb-2"
              />
            )}
            <h1 className="text-xl font-bold">{data.storeName}</h1>
            <p>{data.storeDescription}</p>
          </div>
  
          <div className="mb-4">
            <h2 className="font-bold">Contact Information</h2>
            <p>Email: {data.contactEmail}</p>
            <p>Phone: {data.contactPhone}</p>
            <p>Address: {data.address}</p>
          </div>
  
          <div className="mb-4">
            <h2 className="font-bold">Store Details</h2>
            <p>Total Sales: {data.totalSales}</p>
            <p>Revenue: ${data.revenue}</p>
            <p>Rating: {data.rating}</p>
            <p>Verified: {data.isVerified ? "Yes" : "No"}</p>
          </div>
        </div>
      )}
  
      <div>
        {stores.length > 1 && (
          <div className="mb-4">
            <h2 className="font-bold">Other Stores</h2>
            <ul>
              {stores.map((store) => (
                <li key={store._id} className="p-2 border-b border-gray-300 flex justify-between items-center">
                  <span>{store.storeName}</span>
                  <button
                    className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleStoreSelection(store)}
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditStore;
