import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setStore } from "../../../redux/reducers/storeSlice";
import { getMyStoresAction, viewStoreAction } from "../../../redux/actions/storeThunks";

const EditStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedStore = useSelector((state) => state.store.store);
  const userStores = useSelector((state) => state.store.stores);

  const [stores, setStores] = useState([]);
  const [selected, setSelected] = useState(selectedStore || null); // Initialize from Redux but control locally

  useEffect(() => {
    if (userStores.length > 0) {
      setStores(userStores);
    }
  }, [userStores]);

  const handleStoreSelection = (store) => {
    setSelected(store); // Maintain selection independently
    dispatch(setStore(store));
    dispatch(viewStoreAction(store._id));
  };

  return (
    <div className="flex flex-col p-4 rounded-lg w-full h-full pb-8">
      <h2 className="text-lg font-bold mb-4">Your Stores</h2>

      {/* Store List */}
      {stores.length > 0 ? (
        <ul className="flex flex-col">
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
      ) : (
        <p>No stores found. Create one below.</p>
      )}

      {/* Selected Store Details (only shown after selection) */}
      {selected && (
        <div className="mt-5 p-2 bg-skin-primary rounded-xl">
          <div className="flex flex-row justify-between px-3 text-style3a space-x-2">
            <h3 className="font-bold text-style4a md:text-style3a">Store Details</h3>
            <button
              className="bg-skin-button-primary text-skin-primary p-2 rounded-lg text-style4a md:text-style3"
              onClick={() => navigate(`/MyStore/${selected._id}`)}
            >
              Enter Store
            </button>
          </div>

          <div className="mt-4">
            {selected.storeLogo && (
              <img src={selected.storeLogo} alt="Store Logo" className="w-20 h-20 rounded-full mb-2 bg-black" />
            )}
            <h1 className="text-xl font-bold">{selected.storeName}</h1>
            <p>{selected.storeDescription}</p>

            <div className="mt-4">
              <h2 className="font-bold">Contact Information</h2>
              <p>Email: {selected.contactEmail}</p>
              <p>Phone: {selected.contactPhone}</p>
              <p>Address: {selected.address}</p>
            </div>

            <div className="mt-4">
              <h2 className="font-bold">Store Details</h2>
              <p>Total Sales: {selected.totalSales}</p>
              <p>Revenue: ${selected.revenue}</p>
              <p>Rating: {selected.rating}</p>
              <p>Verified: {selected.isVerified ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Store Button */}
      <div className="my-5 pb-10">
        <button
          className="bg-skin-button-primary text-skin-primary bg-opacity-90 px-4 py-2 rounded"
          onClick={() => navigate("/store")}>
          CREATE STORE
        </button>
      </div>
    </div>
  );
};

export default EditStore;
