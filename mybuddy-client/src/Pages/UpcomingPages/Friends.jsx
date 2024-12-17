// import { useSelector } from 'react-redux';

import { useContext } from "react";
import { AuthContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// const Friends = () => {
//     const theme = useSelector((state) => state.theme.theme);
//     return (
//       <div
//         className={`${
//           theme !== "light" &&
//           "p-[1px] m-5 bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px]"
//         }`}
//       >
//         <div
//           className={`${
//             theme === "light"
//               ? "bg-white  m-5"
//               : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
//           } shadow-[-1px_0px_56px_-6px_rgba(134,134,134,0.25)] rounded-[10px] grid h-screen place-content-center`}
//         >
//           <h1
//             className={`${
//               theme === "light" ? "text-gray-600" : "text-white"
//             } uppercase tracking-widest  xl:text-3xl`}
//           >
//             COMING SOON
//           </h1>
//         </div>
//       </div>
//     );
// };

// export default Friends;

const Friends = () => {
  const { userId, getAcceptedFriendRequest } = useContext(AuthContext);
  const users = getAcceptedFriendRequest?.data;
  const theme = useSelector((state) => state.theme.theme);
  console.log(users);
  return (
    <div className="flex justify-center items-center my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        {users?.length > 0 ? (
          users?.map((p, i) => {
            const isRequestedTo = p?.requestedTo?._id === userId;

            // Get the appropriate name based on the match
            const displayName = isRequestedTo
              ? `${p?.requestedBy?.name?.firstName} ${p?.requestedBy?.name?.lastName}`
              : `${p?.requestedTo?.name?.firstName} ${p?.requestedTo?.name?.lastName}`;

            // Get the appropriate profile picture
            const profilePic = isRequestedTo
              ? p?.requestedBy?.profilePic
              : p?.requestedTo?.profilePic;

            const profileLink = isRequestedTo
              ? `/user/profile/${p?.requestedBy?._id}`
              : `/user/profile/${p?.requestedTo?._id}`;
            const profileRole = isRequestedTo
              ? `${p?.requestedBy?.role}`
              : `${p?.requestedTo?.role}`;
            const profileEmail = isRequestedTo
              ? `${p?.requestedBy?.email}`
              : `${p?.requestedTo?.email}`;

            const profileAbout = isRequestedTo
              ? `${p?.requestedBy?.about}`
              : `${p?.requestedTo?.about}`;

            return (
              <div key={i}>
                {/* <div className="my-10 bg-white rounded-2xl shadow-lg p-6  text-center relative"> */}
                {/* Profile Image */}
                <div
                  className={`${
                    theme !== "light" &&
                    "p-[1px] m-5 bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px]"
                  }`}
                >
                  <div
                    className={`${
                      theme === "light"
                        ? "bg-white text-gray-600 m-5 shadow-xl"
                        : "bg-[url('/gradient-background1.png')] text-white bg-no-repeat bg-cover"
                    } shadow-[-1px_0px_56px_-6px_rgba(134,134,134,0.25)] rounded-[10px]  p-6 w-64 h-48 xl:h-56 text-center relative`}
                  >
                    <div className="relative md:w-24 h-16 w-16 md:h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-500 -mt-16">
                      <img
                        src={
                          profilePic ||
                          "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                        } // Replace this URL with the actual image URL
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name and Role */}
                    <h2 className="text-2xl font-semibold mt-4 capitalize">
                      {displayName}
                    </h2>
                    {/* <p className="text-blue-600 font-medium">{profileRole}</p> */}
                    {/* <p className=" font-medium">{profileEmail}</p>  */}
                    {/* Bio */}
                    {/* <p className="text-gray-600 mt-2">
                            {p.about
                              ? p.about.slice(0, 30) + "..."
                              : `Nothing to show about ${displayName}`}
                          </p> */}

                    <p className="text-gray-600 mt-2 text-sm">
                      {/* <span>User ID:</span> {p.uniqueId ? p.uniqueId : `ID`} */}
                    </p>

                    {/* Email Button */}
                    {/* <button className=" text-gray-700 border-2 shadow-lg hover:bg-gray-100 py-2 px-4 rounded-xl mt-4">
                           View Profile
                          </button> */}
                    <Link to={profileLink}>
                    <button className="bg-blue-700 text-white py-2 px-4 rounded-lg mt-4">
                      View Profile
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm md:text-lg col-span-full text-center pt-10">
            {`You don't have any friend yet. `}
         
          </p>
        )}
      </div>
    </div>
  );
};

export default Friends;
