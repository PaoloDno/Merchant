import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import landingImg from "../../assets/b.jpg";
import { getUserByIdAction } from "../../redux/actions/authThunks";
import StoreBanner from '../../components/images/storeBanner';
import StoreImage from '../../components/images/storeImage';

const ViewProfilePage = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [user, setUser ] = useState(null);
  const [address, setAddress] = useState(null);
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const profileResult = await dispatch(getUserByIdAction(profileId));
        if (isMounted && profileResult.payload) {
          const userProfile = profileResult.payload.profile;
          console.log(userProfile);
          const { firstname, lastname, phoneNumber, profileImage  } = userProfile;
          setProfile({firstname, lastname, phoneNumber, profileImage});
          setAddress(userProfile.addressId);
          setUser(userProfile.userId);

          setError("");
          const storeFromProfile = userProfile?.stores;
          if (storeFromProfile) {
            setStore(storeFromProfile);
          }
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load profile data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [profileId, dispatch]);

  const formatAddress = (address) => {
    if (typeof address !== "object" || !address) return "Not Provided";
    const { street, city, zipCode, country } = address;
    return [street, city, zipCode, country].filter(Boolean).join(", ");
  };

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
            {/* --- SECTION 1: Profile Info & Address --- */}
            <div className="bg-white bg-opacity-60 p-4 rounded-lg mb-6 shadow-md">
              <h2 className="text-xl font-semibold mb-2">User Profile</h2>
              <p><strong>Name:</strong> {profile?.firstname} {profile?.lastname}</p>
              <p><strong>Username:</strong> {user?.username}</p>
              <p><strong>Phone:</strong> {profile?.phoneNumber || "N/A"}</p>
              <p><strong>Address:</strong> {formatAddress(address)}</p>
            </div>

            {/* --- SECTION 2: Store Info --- */}
            {store && (
              <>
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-full h-48 object-cover rounded-lg overflow-hidden">
                    <StoreBanner storeBanner={store.storeBanner} />
                  </div>
                  <div className="w-24 h-24 rounded-full overflow-hidden mt-[-3rem] border-4 border-white shadow-lg">
                    <StoreImage storeLogo={store.StoreImage} />
                  </div>
                  <h2 className="text-2xl font-bold mt-4">{store.storeName}</h2>
                  <p className="text-gray-700">{store.storeDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white bg-opacity-60 rounded-lg p-4 shadow-md">
                    <h3 className="font-semibold text-lg mb-2">Contact</h3>
                    <p>Email: {store.contactEmail}</p>
                    <p>Phone: {store.contactPhone || "N/A"}</p>
                    <p>Address: {formatAddress(store.address)}</p>
                  </div>

                  <div className="bg-white bg-opacity-60 rounded-lg p-4 shadow-md">
                    <h3 className="font-semibold text-lg mb-2">Store Metrics</h3>
                    <p>Total Sales: {store.totalSales}</p>
                    <p>Revenue: ${store.revenue}</p>
                    <p>Rating: {store.rating} / 5</p>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to={`/ViewStore/${store._id}`}
                    className="inline-block px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                  >
                    Visit Store
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewProfilePage;
