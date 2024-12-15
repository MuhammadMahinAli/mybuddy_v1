import { useState } from "react";
import { useDeleteAdminToolMutation, useGetAllToolsQuery } from "../../../features/tools/toolsApi";
import { HiOutlineDotsVertical, HiOutlineExternalLink } from "react-icons/hi";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import UpdateTool from "./UpdateTool";
import Swal from "sweetalert2";

const AdminAllTool = () => {
  const { data: getAllTools } = useGetAllToolsQuery();
  const [deleteAdminTool] = useDeleteAdminToolMutation();
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  //const [deletePost] = useDeletePostMutation();

  const toggleOption = (tool) => {
    setIsOpenOption(!isOpenOption);
    setSelectedTool(tool);
  };

  const toggleUpdateTool = (tool) => {
    setIsOpenOption(false);
    setIsOpenUpdateModal(true);
    setSelectedTool(tool);
  };

  console.log(getAllTools?.data);
  const allTools = getAllTools?.data;

  const handleDeleteTool = (id) => {
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
        deleteAdminTool(id)
          .unwrap()
          .then(() => {
            Swal.fire("Well done!", "This tool has been deleted.", "success");
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          })
          .catch((error) => {
            console.log(error);
            if(error){
              Swal.fire("Error!", "There was an issue to delete error.", "error");
            }
          });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {allTools?.map((tool, i) => (
        <div key={i}>
          <div className="relative rounded-2xl p-3 space-y-3 bg-skyblue  shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)]">
            <button
              onClick={() => toggleOption(tool)}
              className="absolute  right-2 top-2"
            >
              <HiOutlineDotsVertical />
            </button>
            <>
              {isOpenOption &&
                selectedTool &&
                selectedTool?._id === tool?._id && (
                  <ul className="absolute bg-white rounded-md text-center  right-4 top-4 shadow-xl w-28">
                    <li
                      
                      className="hover:bg-gray-100 py-2  cursor-pointer "
                    >
                      <a className="flex items-center pl-5 space-x-2" href={tool?.toolHomepage} target="blank">
                      <span>
                        <HiOutlineExternalLink className="text-xl text-gray-500" />
                      </span>{" "}
                      <span className=""> Visit</span>
                      </a>
                      {" "}
                    
                    </li>
                    <li
                      onClick={() => toggleUpdateTool(tool)}
                      className="hover:bg-gray-100 py-2  cursor-pointer flex items-center pl-5 space-x-2"
                    >
                      {" "}
                      <span>
                        <FaRegPenToSquare className="text-gray-500" />
                      </span>{" "}
                      <span className=""> Edit</span>
                    </li>
                    <li
                      onClick={() => handleDeleteTool(tool?._id)}
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
            </>
            <div className="">
              <img
                src={tool?.image}
                className="h-[57px] w-[60px] border-2 border-gray-400 p-1 rounded-full"
              />
            </div>

            <div>
              <h3 className=" text-lg font-medium sm:text-xl">
                <a href="#" className="hover:underline">
                  {tool?.toolName}
                </a>
              </h3>

              <p className="pt-2 text-sm text-gray-700">{tool?.description}</p>
            </div>
          </div>
          {isOpenUpdateModal &&
                  selectedTool &&
                  selectedTool?._id === tool?._id && (
                    <UpdateTool
                      tool={tool}
                      setIsOpenUpdateModal={setIsOpenUpdateModal}
                      setSelectedTool={setSelectedTool}
                    />
                  )}
        </div>
        
      ))}
      
    </div>
  );
};

export default AdminAllTool;
