import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

const GeneralAllPost = () => {
    const [isOpenOption,setIsOpenOption] = useState(false);
    const [selectedPost,setSelectedPost] = useState(null);

    const toggleOption = (post)=>{
        setIsOpenOption(!isOpenOption);
        setSelectedPost(post)
    }

  const { getUserPost } = useContext(AuthContext);
  console.log(getUserPost?.data);
  const allPost = getUserPost?.data;
  return (
    <div>
      {allPost?.length === 0 ? (
        <p className="text-[13px] md:text-[16px] capitalize font-medium py-8 text-center">
          {"No activity available to show"}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 py-5 lg:py-7 ">
          
            {allPost?.map((post) => (
              <div key={post?._id} className="flex space-x-3   shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] rounded-lg py-3 relative">
                <button
                onClick={() => toggleOption(post)}
                className="absolute  right-2 top-2"
              >
                <HiOutlineDotsVertical />
              </button>
                {post.image && (
                  <img src={post.image} className="w-4/12 h-32 rounded-md" />
                )}

                <div className="pr-6 rounded-lg">
                  {post?.description.length > 140 ? `${post?.description.slice(0, 140)}....`: post?.description}
                </div>

                {isOpenOption &&
                selectedPost &&
                selectedPost?._id === post?._id && (
                  <ul className="absolute bg-white rounded-md text-center  right-4 top-8 shadow-xl w-28">
                    <li
                    //   onClick={() => toggleUpdateMeeting(post)}
                      className="hover:bg-gray-100 py-2  cursor-pointer flex items-center pl-5 space-x-2"
                    >
                      {" "}
                      <span>
                        <FaRegPenToSquare className="text-gray-500" />
                      </span>{" "}
                      <span className=""> Edit</span>
                    </li>
                    <li 
                    // onClick={()=>handleDeleteMeeting(post?._id)} 
                    className="hover:bg-gray-100 py-2  cursor-pointer flex items-center pl-5 space-x-2">
                      {" "}
                      <span>
                        <FaRegTrashCan className="text-gray-500" />
                      </span>{" "}
                      <span className=""> Delete</span>
                    </li>
                  </ul>
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
