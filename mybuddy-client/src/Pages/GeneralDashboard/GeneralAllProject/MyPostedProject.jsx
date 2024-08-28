import "../GeneralAddProject/editor.css";
import "react-quill/dist/quill.core.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { FaPlus } from "react-icons/fa";
import filter from "../../../assets/filter.png";
import { IoIosArrowUp, IoIosSearch } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyPostedProject = () => {
  const { getAllProjectByUser, allAcceptedSentRequest } =
    useContext(AuthContext);
  const projects = getAllProjectByUser?.data;

  const currentTeamMember = allAcceptedSentRequest?.data;
  console.log(currentTeamMember);
  const [showAll, setShowAll] = useState(false);

  const handleShowMore = () => {
    setShowAll(true);
  };

  const visibleProjects = showAll ? projects : projects?.slice(0, 3);

  return (
    <div className="relative gray600">
      {/* cards */}

      {projects?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleProjects.map((p, i) => (
              <div key={i}>
                <div
                  className={`pb-4 space-y-1 flex flex-col justify-start rounded-[15px] bg-skyblue shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] overflow-hidden`}
                >
                  <div className="flex justify-center items-center h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
                    <img
                      src={p.images[0]}
                      className="rounded-2xl h-[180px] ssm:h-[220px] sm:h-[260px] md:h-[240px] xl:h-[240px] w-full object-cover"
                    />
                  </div>

                  <div className="px-2 pt-0 ssm:pt-1 lg:pt-3 xl:pt-3 3xl:pt-3 xl:p-3  md:px-5 lg:py-3 space-y-1 lg:space-y-1">
                    <p className="2xl:hidden text-xl 3xl:text-[22px] font-bold pt-2 ssm:py-0">
                      {p?.projectName.length > 15
                        ? `${p.projectName.slice(0, 7)}...`
                        : p.projectName}
                    </p>
                    <p className="hidden 2xl:block text-xl 3xl:text-[22px] font-bold py-0">
                      {p.projectName}
                    </p>
                    <div
                      className="ssm:hidden pb-3"
                      dangerouslySetInnerHTML={{
                        __html: `${p?.description.slice(0, 100)}${
                          p?.description.length > 100 ? "..." : ""
                        }`,
                      }}
                    />

                    <div
                      className="hidden ssm:block md:hidden pb-3"
                      dangerouslySetInnerHTML={{
                        __html: p?.description.slice(0, 130),
                      }}
                    />
                    <div
                      className="hidden md:block pb-3"
                      dangerouslySetInnerHTML={{
                        __html: p?.description.slice(0, 100),
                      }}
                    />

                    <button
                      className={`${i}

             w-full my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]`}
                    >
                      <Link to={`/dashboard/details/${p._id}`}>View More</Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            onClick={() => setShowAll(!showAll)}
            className="w-full flex justify-center items-center pt-3"
          >
            {!showAll ? <IoChevronDown /> : <IoIosArrowUp />}
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-[16px] md:text-[18px] lg:text-[24px] pb-5 font-medium text-start w-11/12 md:w-[600px] xl:pt-7">{`You've not posted any project yet.`}</p>
      )}
    </div>
  );
};

export default MyPostedProject;
