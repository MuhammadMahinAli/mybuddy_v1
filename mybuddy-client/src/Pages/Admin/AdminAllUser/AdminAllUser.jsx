import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineReload } from "react-icons/ai";
import Loading from "../../Loading/Loading";
import {
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaCodepen,
  FaDev,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const AdminAllUser = () => {
  const [users, setUsers] = useState([]);
  const [uniqueId, setUniqueId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch users with pagination or uniqueId filter
  const fetchUsers = async (page = 1, uniqueIdFilter = "") => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/member/getAllMember`,
        {
          params: {
            page,
            limit: 6,
            uniqueId: uniqueIdFilter,
          },
        }
      );
      const data = response.data.data;

      setUsers(data.users || []);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);

      // Set isFiltered to true if uniqueIdFilter is applied, else false
      setIsFiltered(!!uniqueIdFilter);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message ===
          "No project matched with the provided uniqueId."
      ) {
        setUsers([]); // No match found 01768320134
      }
    }
    setLoading(false); // Set loading to false when data is fetched 01620702021
  };

  // Initial fetch of users
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Handle uniqueId filter
  const handleFilter = () => {
    fetchUsers(1, uniqueId);
  };

  // Reset to original paginated view
  const handleReset = () => {
    setUniqueId("");
    setIsFiltered(false);
    fetchUsers(1); // Fetch initial 6 users
  };

  console.log("dd", users);

  return (
    <div>
      <div>
        <div className="w-full lg:w-8/12 flex justify-center items-center relative  xl:w-7/12 2xl:w-6/12 3xl:w-7/12 my-4">
          <input
            type="text"
            placeholder="Search"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className="w-full h-9 md:h-10 lg:h-12 outline-none rounded-lg py-3 bg-[#e4ecf7] shadow-[-2px_-3px_9px_rgba(255,_255,_255,_0.88)_inset,_2px_3px_14px_#c7d3e1_inset] px-3 box-border border-solid border-gray-100"
          />
          {isFiltered ? (
            <AiOutlineReload
              title="Reset"
              onClick={handleReset}
              className="text-2xl absolute right-3 cursor-pointer"
            />
          ) : (
            <IoIosSearch
              onClick={handleFilter}
              className="text-2xl absolute right-3 cursor-pointer"
            />
          )}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length > 0 ? (
              users.map((p, i) => (
                <div key={i}>
                  <div className="my-10 bg-white rounded-2xl shadow-lg p-6  text-center relative">
                    {/* Profile Image */}
                    <div className="relative md:w-24 h-16 w-16 md:h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-500 -mt-16">
                      <img
                        src={
                          p.profilePic
                            ? p.profilePic
                            : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                        } // Replace this URL with the actual image URL
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name and Role */}
                    <h2 className="text-2xl font-semibold mt-4">
                      {p.name.firstName} {p.name.lastName}
                    </h2>
                    <p className="text-blue-600 font-medium">{p.role}</p>
                    <p className="text-gray-600 font-medium">{p.email}</p>
                    {/* Bio */}
                    <p className="text-gray-600 mt-2">
                      {p.about
                        ? p.about.slice(0, 30) + "..."
                        : `Nothing to show about ${p.name.firstName} ${p.name.lastName}`}
                    </p>

                    <p className="text-gray-600 mt-2 text-sm">
                      <span>User ID:</span> {p.uniqueId ? p.uniqueId : `ID`}
                    </p>

                    {/* Email Button */}
                    {/* <button className=" text-gray-700 border-2 shadow-lg hover:bg-gray-100 py-2 px-4 rounded-xl mt-4">
                     View Profile
                    </button> */}
                    <Link to={`/user/profile/${p?._id}`}>
                      <button className="bg-blue-700 text-white py-2 px-4 rounded-lg mt-4">
                        View Profile
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center pt-10">
                {`No user matched with the provided uniqueId. `}
                <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={handleReset}
                >
                  Refresh
                </span>
              </p>
            )}
          </div>
        )}

        {isFiltered && loading === false && (
          <div className="py-3 pagination flex items-center justify-center lg:mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
            >
              <FaRegArrowAltCircleLeft className="text-2xl" />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg mx-2"
            >
              <FaRegArrowAltCircleRight className="text-2xl" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllUser;
