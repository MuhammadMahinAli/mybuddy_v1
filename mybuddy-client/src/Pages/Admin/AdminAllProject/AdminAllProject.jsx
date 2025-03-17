import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineReload } from "react-icons/ai";
import Loading from "../../Loading/Loading";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa";
import { AuthContext } from "../../../Context/UserContext";

const AdminAllProject = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);

  // Fetch projects with pagination or uniqueId filter
  const fetchProjects = async (page = 1, uniqueIdFilter = "") => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await axios.get(
        `https://test-two-22w0.onrender.com/api/v1/project/getAllProject`,
        {
          params: {
            page,
            limit: 6,
            uniqueId: uniqueIdFilter,
          },
        }
      );
      const data = response.data.data;

      console.log("dd", data);

      setProjects(data.projects || []);
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
        setProjects([]); // No match found
      }
    }
    setLoading(false); // Set loading to false when data is fetched
  };

  // Initial fetch of projects
  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  // Handle uniqueId filter
  const handleFilter = () => {
    fetchProjects(1, uniqueId);
  };

  // Reset to original paginated view
  const handleReset = () => {
    setUniqueId("");
    setIsFiltered(false);
    fetchProjects(1); // Fetch initial 6 projects
  };

  return (
    <div>
      <div className="py-4">
        <div className="w-full lg:w-8/12 flex justify-center items-center relative  xl:w-7/12 2xl:w-6/12 3xl:w-7/12 mb-4">
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
            {projects.length > 0 ? (
              projects.map((p, i) => (
                <>
                  <div key={i}>
                    <div
                      className={`h-[360px] ssm:h-[400px] sm:h-[460px] md:h-[430px] lg:h-[459px] xl:h-[440px] pb-4 space-y-1 flex flex-col justify-start rounded-[15px] bg-skyblue shadow-lg overflow-hidden`}
                    >
                      <div className="flex justify-center items-center h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
                        <img
                          src={p.images[0]}
                          alt="Project"
                          className="rounded-2xl h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] w-full object-cover"
                        />
                      </div>
                      <div className="px-2 pt-0 ssm:pt-1 lg:pt-3 xl:pt-3 3xl:pt-3 xl:p-3 md:px-5 lg:py-3 space-y-1 lg:space-y-1">
                        <p className="2xl:hidden text-xl 3xl:text-[22px] font-bold pt-2 ssm:py-0">
                          {p.projectName.length > 15
                            ? `${p.projectName.slice(0, 7)}...`
                            : p.projectName}
                        </p>
                        <p className="hidden 2xl:block text-xl 3xl:text-[22px] font-bold py-0">
                          {p.projectName}
                        </p>
                        <div
                          className="ssm:hidden pb-3"
                          dangerouslySetInnerHTML={{
                            __html: `${p.description.slice(0, 100)}${
                              p.description.length > 100 ? "..." : ""
                            }`,
                          }}
                        />
                        <div
                          className="hidden ssm:block md:hidden pb-3"
                          dangerouslySetInnerHTML={{
                            __html: `${p.description.slice(0, 130)}${
                              p.description.length > 130 ? "..." : ""
                            }`,
                          }}
                        />
                        <div
                          className="hidden md:block pb-3"
                          dangerouslySetInnerHTML={{
                            __html: `${p.description.slice(0, 100)}${
                              p.description.length > 100 ? " ..." : ""
                            }`
                          }}
                        />
                        <button className="w-full my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]">
                          <Link
                            to={
                              userId === "67396ba011eb8789052c3cfd"
                                ? `/admin/${userId}/project-details/${p?._id}`
                                : `/dashboard/details/${p?._id}`
                            }
                          >
                            View More
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p className="col-span-full text-center pt-10">
                {`No project matched with the provided uniqueId. `}
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
          <div className=" pagination flex items-center justify-center mt-14">
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

export default AdminAllProject;
