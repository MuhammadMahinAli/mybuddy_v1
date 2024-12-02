import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import pdfIcon from "../../../assets/home/pdf-icon3.png";
import UpdatePost from "./UpdatePost";
import Swal from "sweetalert2";
import { useDeletePostMutation } from "../../../features/post/postApi";

const GeneralAllPost = () => {
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deletePost] = useDeletePostMutation();

  const toggleOption = (post) => {
    setIsOpenOption(!isOpenOption);
    setSelectedPost(post);
  };

  const toggleUpdatePost = (post) => {
    setIsOpenOption(false);
    setIsOpenUpdateModal(true);
    setSelectedPost(post);
  };

  const { getUserPost } = useContext(AuthContext);
  //console.log(getUserPost?.data);
  const allPost = getUserPost?.data;

  const handleDeletePost = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure to delete it ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id)
          .unwrap()
          .then(() => {
            Swal.fire("Well done!", "This post has been deleted.", "success");
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Error!", "There was an issue to delete post.", "error");
          });
      }
    });
  };
  return (
    <div>
      <h1 className=" text-[20px] lg:text-[28px] py-3 font-bold text-gray-700">
        ALL POST
      </h1>
      {allPost?.length === 0 ? (
        <p className="text-[13px] md:text-[16px] capitalize font-medium py-8 text-center">
          {"No post available to show"}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 py-5 lg:py-5 ">
            {allPost?.map((post) => (
              <div
                key={post?._id}
                className="flex space-x-3   shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] rounded-lg py-3 relative"
              >
                <button
                  onClick={() => toggleOption(post)}
                  className="absolute  right-2 top-2"
                >
                  <HiOutlineDotsVertical />
                </button>
                {post.image && (
                  <img
                    src={post.image}
                    className="w-4/12 h-20 lg:h-32 3xl:h-36 rounded-md"
                  />
                )}
                {post.pdf && (
                  <img
                    src={pdfIcon}
                    className="w-4/12 h-20 lg:h-32 3xl:h-36 rounded-md"
                  />
                )}
                {/* mbl */}
                <div
                  className={`${
                    post.image || post?.pdf ? "w-8/12" : "w-11/12"
                  } pr-6 rounded-lg lg:hidden`}
                >
                  {post?.description.length > 45
                    ? `${post?.description.slice(0, 45)}....`
                    : post?.description}
                </div>
                {/* tab */}
                <div
                  className={`${
                    post.image || post?.pdf ? "w-8/12" : "w-11/12"
                  } pr-6 rounded-lg hidden lg:block`}
                >
                  {post?.description.length > 140
                    ? `${post?.description.slice(0, 140)}....`
                    : post?.description}
                </div>

                {isOpenOption &&
                  selectedPost &&
                  selectedPost?._id === post?._id && (
                    <ul className="absolute bg-white rounded-md text-center  right-4 top-8 shadow-xl w-28">
                      <li
                        onClick={() => toggleUpdatePost(post)}
                        className="hover:bg-gray-100 py-2  cursor-pointer flex items-center pl-5 space-x-2"
                      >
                        {" "}
                        <span>
                          <FaRegPenToSquare className="text-gray-500" />
                        </span>{" "}
                        <span className=""> Edit</span>
                      </li>
                      <li
                        onClick={() => handleDeletePost(post?._id)}
                        className="hover:bg-gray-100 py-2  cursor-pointer flex items-center pl-5 space-x-2"
                      >
                        {" "}
                        <span>
                          <FaRegTrashCan className="text-gray-500" />
                        </span>{" "}
                        <span className=""> Delete</span>
                      </li>
                    </ul>
                  )}
                {isOpenUpdateModal &&
                  selectedPost &&
                  selectedPost?._id === post?._id && (
                    <UpdatePost
                      post={post}
                      setIsOpenUpdateModal={setIsOpenUpdateModal}
                      setSelectedPost={setSelectedPost}
                    />
                  )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GeneralAllPost;
