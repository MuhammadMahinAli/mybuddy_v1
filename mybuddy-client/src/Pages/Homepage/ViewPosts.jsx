import { useEffect, useState } from "react";
import whiteBorder from "../../assets/home/p-border.png";
import darkBorder from "../../assets/home/dark-border.png";
import Image from "./view/Image";
import Skills from "./view/Skills";
import { useGetAllPostQuery } from "../../features/post/postApi";
import ViewPdfFile from "./ViewPdfFile";
import ProjectSidebar from "./ProjectSidebar/ProjectSidebar";
import { FaPlus } from "react-icons/fa";
import Description from "./Description";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import TeamMember from "./view/TeamMember";

const ViewPosts = ({ theme,active }) => {
  const [openComponent, setOpenComponent] = useState({});
  const {
    data: allPosts,
    isLoading: isFetchingPosts,
    error,
  } = useGetAllPostQuery();

  useEffect(() => {
    if (allPosts && allPosts?.data) {
      const initialOpenComponent = {};
      allPosts.data.forEach((_, index) => {
        initialOpenComponent[index] = "image";
      });
      setOpenComponent(initialOpenComponent);
    }
  }, [allPosts]);

  const toggleComponent = (index, component) => {
    setOpenComponent((prev) => ({
      ...prev,
      [index]: component,
    }));
  };

  if (isFetchingPosts) {
    return (
      <div className="flex justify-center items-center -pt-20">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${
          theme === "light" ? "text-gray-600" : "text-white"
        } xl:text-xl font-semibold`}
      >
        Error loading posts
      </div>
    );
  }

  if (!allPosts || !allPosts.data || allPosts.data.length === 0) {
    return (
      <div
        className={`${
          theme === "light" ? "text-gray-600" : "text-white"
        } xl:text-xl font-semibold`}
      >
        No posts available
      </div>
    );
  }

  const posts = allPosts.data;

  return (
    <div className="space-y-3 py-3">
      {posts?.map((post, i) => (
        <div
          key={i}
          className={`${
            theme !== "light" &&
            "relative p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px]"
          }`}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-white p-3 relative"
                : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
            } shadow-[-1px_0px_56px_-6px_rgba(134,134,134,0.25)] rounded-[10px] w-[270px] xs:w-[280px] sm:w-[350px] md:w-[600px] lg:w-[500px] xl:w-[670px] 2xl:w-[750px] 3xl:w-[800px]`}
          >
            <Link to={`/user/profile/${post?.postedBy?._id}`}>
              <div className="flex justify-between items-center p-2 sm:px-3 sm:pt-3">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col justify-center items-center relative">
                    <img
                      src={
                        post?.postedBy?.profilePic
                          ? post?.postedBy?.profilePic
                          : "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                      }
                      className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full p-[6px]"
                    />

                    <img
                      className="w-16 lg:w-32 xl:w-36 absolute"
                      src={theme === "light" ? darkBorder : whiteBorder}
                      alt="dashedborder"
                    />
                  </div>

                  <div>
                    <div className="flex items-center space-x-1">
                      <p
                        className={`${
                          theme === "light" ? "graish" : "text-white"
                        } sm:hidden capitalize text-[14px] md:text-[15px] lg:text-[18px] font-semibold`}
                      >
                        {post?.postedBy?.name?.firstName}{" "}
                      </p>
                      <p
                        className={`${
                          theme === "light" ? "graish" : "text-white"
                        } hidden sm:block capitalize text-[14px] md:text-[15px] lg:text-[18px] font-semibold`}
                      >
                        {post?.postedBy?.name?.firstName}{" "}
                        {post?.postedBy?.name?.lastName}
                      </p>
                    </div>
                    <p
                      className={`${
                        theme === "light" ? "graish" : "text-white"
                      } hidden  md:block capitalize text-[14px] lg:text-[15px]`}
                    >
                      {post?.postedBy?.role}
                    </p>
                  </div>
                </div>
                <div>
                  {theme === "light" ? (
                    <button className="flex items-center my-3 px-4 py-1 md:px-4 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]">
                      <span className="pr-1">
                        <FaPlus />
                      </span>
                      Follow
                    </button>
                  ) : (
                    <button className="newBtn">
                      <p>
                        <span className="pr-1">
                          <FaPlus />
                        </span>{" "}
                        Follow
                      </p>
                    </button>
                  )}
                </div>
              </div>
            </Link>
            <div
              className={`${
                theme === "light" ? "graish" : "text-white"
              } flex flex-col justify-center items-center  py-3 md:py-6`}
            >
              <Description text={post?.description} />
              <div className="w-full my-3 md:my-5 flex justify-center items-center">
                {post?.technicalRecommendations.length > 0 && (
                  <div className="flex justify-center items-center ">
                    {openComponent[i] === "image" && post?.image && (
                      <Image image={post?.image} />
                    )}
                    {openComponent[i] === "skill" &&
                      post?.technicalRecommendations.length > 0 && (
                        <Skills
                          openComponent={openComponent[i]}
                          theme={theme}
                          skillArray={post?.technicalRecommendations}
                        />
                      )}
                    {openComponent[i] === "team" &&
                      post?.teamMembers.length > 0 && (
                        <TeamMember
                          openComponent={openComponent[i]}
                          theme={theme}
                          teamMembers={post?.teamMembers}
                        />
                      )}
                  </div>
                )}
              </div>
              {post?.technicalRecommendations.length > 0 &&
                post?.teamMembers?.length > 0 && (
                  <ProjectSidebar
                    theme={theme}
                    openComponent={openComponent[i]}
                    toggleImage={() => toggleComponent(i, "image")}
                    toggleSkill={() => toggleComponent(i, "skill")}
                    toggleTeam={() => toggleComponent(i, "team")}
                  />
                )}
              {post?.technicalRecommendations.length === 0 &&
                post?.pdf === "" && (
                  <div className="w-[400px] 3xl:w-[500px]">
                    <Image image={post?.image} />
                  </div>
                )}
              {post?.pdf && post.pdf.includes("data:") && (
                <ViewPdfFile pdf={post.pdf} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewPosts;
