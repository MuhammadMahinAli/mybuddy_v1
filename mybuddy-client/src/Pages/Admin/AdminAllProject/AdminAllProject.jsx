

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
  const [totalProjects, setTotalProjects] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);

  // Fetch projects with pagination or uniqueId filter
  const fetchProjects = async (page = 1, uniqueIdFilter = "") => {
    setLoading(true);
    try {
      const response = await axios.get(`https://test-two-22w0.onrender.com/api/v1/project/getAllProject`, {
        params: {
          page,
          limit: 6,
          uniqueId: uniqueIdFilter,
        },
      });

      const { projects, currentPage, totalPages, totalProjects } = response.data.data;

      setProjects(projects || []);
      setCurrentPage(currentPage || 1);
      setTotalPages(totalPages || 1);
      setTotalProjects(totalProjects || 0);
      setIsFiltered(!!uniqueIdFilter);
    } catch (error) {
      setProjects([]);
      setCurrentPage(1);
      setTotalPages(1);
      setTotalProjects(0);
    }
    setLoading(false);
  };

  // Initial fetch of all projects
  useEffect(() => {
    if (!isFiltered) {
      fetchProjects(currentPage);
      window.scrollTo(0, 0);
    }
  }, [currentPage, isFiltered]);

  // Handle uniqueId filter
  const handleFilter = () => {
    fetchProjects(1, uniqueId);
  };

  // Reset to original paginated view
  const handleReset = () => {
    setUniqueId("");
    setIsFiltered(false);
    setCurrentPage(1);
    fetchProjects(1);
  };

  return (
    <div>
      <div className="py-4">
        {/* Search bar */}
        <div className="w-full lg:w-8/12 flex justify-center items-center relative xl:w-7/12 2xl:w-6/12 3xl:w-7/12 mb-4">
          <input
            type="text"
            placeholder="Search by Unique ID"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className="w-full h-9 md:h-10 lg:h-12 outline-none rounded-lg py-3 bg-[#e4ecf7] shadow px-3 border border-gray-100"
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

        {/* Projects Grid */}
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.length > 0 ? (
              projects.map((p, i) => (
                <div key={i}>
                  <div className="h-[440px] pb-4 space-y-1 flex flex-col justify-start rounded-[15px] bg-skyblue shadow-lg overflow-hidden">
                    <div className="flex justify-center items-center h-[240px] bg-[#DCE2EA] shadow-inner rounded-[25px]">
                      <img
                        src={p.images[0]}
                        alt="Project"
                        className="rounded-2xl h-full w-full object-cover"
                      />
                    </div>
                    <div className="px-3 pt-3 space-y-1">
                      <p className="text-xl font-bold truncate">{p.projectName}</p>
                      <div
                        className="text-sm text-gray-700 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: `${p?.description?.slice(0, 100)}${
                            p.description?.length > 100 ? "..." : ""
                          }`,
                        }}
                      />
                      <Link to={
                        userId === "67396ba011eb8789052c3cfd"
                          ? `/admin/${userId}/project-details/${p?._id}`
                          : `/dashboard/details/${p?._id}`
                      }>
                        <button className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-[#2adba4] to-[#76ffd4] text-white font-semibold rounded-[10px]">
                          View More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center pt-10 text-gray-500">
                No project{isFiltered ? " matched your search." : "s found."}{" "}
                {isFiltered && (
                  <span className="text-blue-500 hover:underline cursor-pointer" onClick={handleReset}>
                    Reset
                  </span>
                )}
              </p>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && !isFiltered && (
          <div className="pagination flex items-center justify-center mt-8 space-x-2">
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
