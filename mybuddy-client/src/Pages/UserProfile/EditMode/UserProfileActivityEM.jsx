import { useSelector } from "react-redux";
import RightArrowIcon from "../../../icons/RightArrowIcon";
import { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";
import pdf from "../../../assets/home/pdf-image.jpg";
import { Link } from "react-router-dom";

const UserProfileActivityEM = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { getUserPost } = useContext(AuthContext);
  const allPosts = getUserPost?.data;
  //console.log("post",getUserPost);

  return (
    <div
      className={`${
        theme !== "light" &&
        "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% md:mx-7 lg:ml-20 lg:mr-32 xl:ml-0 xl:mr-0 rounded-2xl"
      }`}
    >
      <div
        className={`${
          theme === "light"
            ? "bg-white graish"
            : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:ml-[1px] text-white"
        }  rounded-2xl`}
      >
        <div
          className={`${
            theme === "light"
              ? "bg-[#edfaff]"
              : "bg-[url('/bluish-bg.png')] bg-no-repeat bg-cover"
          } flex justify-between items-center p-3 md:p-5 rounded-2xl`}
        >
          <div>
            <p className="text-lg md:text-2xl font-semibold">Activity</p>
            <p className="text-sm pt-1">422 Followers</p>
          </div>
          <Link to="/home">
            {theme === "light" ? (
              <div className="lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-2 xl:px-4 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                {/* <EditIcon /> */}
                <p className="text-sm capitalize">create a posts</p>
              </div>
            ) : (
              <div className="createPostGreenBtn">
                <p>Create A Post</p>
              </div>
            )}
          </Link>
        </div>
        {allPosts?.length === 0 ? (
          <p className="text-[13px] md:text-[16px] capitalize font-medium py-8 text-center">
            {"You've not posted anything yet."}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-5 lg:py-7">
              {allPosts?.map((post) => (
                <div
                  key={post?._id}
                  className="flex flex-col justify-center items-center space-y-3"
                >
                  <p className="text-[13px] md:text-[16px] capitalize font-medium">
                    {post?.postedBy?.name?.firstName}{" "}
                    {post?.postedBy?.name?.lastName} Posted this
                  </p>
                  <div className="bg-white border  rounded-lg">
                    <img
                      src={post?.image ? post?.image : pdf}
                      className="h-36 md:h-40 md:w-48 w-44 lg:h-44 lg:w-52 xl:h-40 xl:w-48 "
                    />
                  </div>
                </div>
              ))}
            </div>

            {allPosts?.length > 6 && (
              <div className="flex justify-center items-center py-5">
                {theme === "light" ? (
                  <div className="w-36 flex items-center space-x-2 justify-center lg:text-sm xl:text-lg text-white font-semibold rounded-[10px] px-2 py-1 xl:px-4 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
                    <p className="text-sm capitalize">see all posts</p>
                    <RightArrowIcon theme={theme} />
                  </div>
                ) : (
                  <div className="seeAllPostBtn">
                    <p>
                      See All Posts{" "}
                      <span>
                        {" "}
                        <RightArrowIcon theme={theme} />
                      </span>{" "}
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* </div> */}
    </div>
  );
};

export default UserProfileActivityEM;
