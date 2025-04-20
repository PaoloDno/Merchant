import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetProfiles } from "../../../redux/actions/adminThunks";
import UserCards from "../../../components/cards/userCards";
import PaginationComponent from "../../../components/pagination/Pagination";
import AdminSearchBarUser from "../../../components/search/admin/AdminSearchBarUser";

const DisplayUserAdmin = () => {
  const dispatch = useDispatch();
  const { profiles, pagination } = useSelector((state) => state.admin);
  const { currentPage, totalPages } = pagination || {
    currentPage: 1,
    totalPages: 1,
  };

  const [page, setPage] = useState(1);
  const [filter, setfilter] = useState({
    firstname: "",
    lastname: "",
  });

  const sanitize = (str) =>
    str.replace(/\s+/g, " ").trim(); // replaces multiple spaces with one, then trims


  useEffect(() => {
    const cleanedfirstname = sanitize(filter.firstname);
    const cleanedlastname = sanitize(filter.lastname);

    dispatch(
      adminGetProfiles({
        firstname: cleanedfirstname,
        lastname: cleanedlastname,
        page,
      })
    );
  }, [dispatch, page, filter.firstname, filter.lastname]);

  return (
    <div className="p-2 md:p-8 flex flex-col justify-between h-full w-full">
      {/* Search Bar */}
      <div className="flex mb-2 w-full p-1 md:py-2 bg-gray-400 rounded-xl">
      <AdminSearchBarUser onSearchChange={(value) => setfilter(value)} />
      </div>
      {/* Grid layout for profiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {profiles && profiles.length > 0 ? (
          profiles.map((profile) => (
            <UserCards
              key={profile._id}
              profile={profile}
              onViewprofile={() => {}}
            />
          ))
        ) : (
          <p className="col-span-full text-center">No profiles found.</p>
        )}
      </div>

      {/* Pagination Component */}
      <div className="mt-5 flex justify-center w-full items-center">
        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default DisplayUserAdmin;
