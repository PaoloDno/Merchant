import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { VscAccount } from "react-icons/vsc";
import { displayUserAction } from "../../../redux/actions/authThunks";
import { setUser } from "../../../redux/reducers/authSlice";

const UserInitializer = ({ handlePopup }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");

    const fetchUser = async () => {
      if (token) {
        setLoading(true);
        try {
          const result = await dispatch(displayUserAction());

          if (isMounted && result?.payload?.user) {
            dispatch(setUser(result.payload.user)); // Update with backend-verified user
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          if (isMounted) setLoading(false);
        }
      }
    };

    fetchUser();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <button
      onClick={() => handlePopup("user")}
      aria-label="User"
      className="flex justify-center items-center rounded-[0.375rem] hover:bg-skin-fill-3 
        hover:text-skin-secondary box-content aspect-square w-10 transition-all duration-300 
        ease-in-out hover:rounded-full hover:scale-110 text-red-500"
    >
      <VscAccount />
    </button>
  );
};

export default UserInitializer;
