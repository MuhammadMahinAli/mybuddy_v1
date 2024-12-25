/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { fileUpload } from "../../../utils/cloudinary";
import { AuthContext } from "../../../Context/UserContext";
import UpdateTechnicalRecommendation from "./UpdateTechnicalRecommendation";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useUpdatePostInfoMutation } from "../../../features/post/postApi";
import Swal from "sweetalert2";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const UpdatePost = ({ post, setIsOpenUpdateModal, setSelectedPost }) => {
  const [updatePostInfo] = useUpdatePostInfoMutation();
  const { getAcceptedFriendRequest, userId } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    description: post?.description || "",
    image: post?.image || "",
    technicalRecommendations: post?.technicalRecommendations || [],
    teamMembers: post?.teamMembers || [],
    pdf: post?.pdf || "",
  });

  //------ description update

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleInputChange = (e) => {
  //   const { innerText } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     description: innerText,
  //   }));
  // };

 

  //  ---- image update

  const [previewImage, setPreviewImage] = useState("");
  const [isFileLoading, setIsFileLoading] = useState(false);

  const handlePreviewImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file)); // For local preview
      setIsFileLoading(true);

      try {
        const imageUrl = await fileUpload(file);
        setFormData((prevState) => ({
          ...prevState,
          image: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      setIsFileLoading(false);
    }
  };

  //---------- tech recom update

  const handleACheckboxChange = (name) => {
    setFormData((prevState) => {
      const updatedRecommendations =
        prevState.technicalRecommendations.includes(name)
          ? prevState.technicalRecommendations.filter((item) => item !== name)
          : [...prevState.technicalRecommendations, name];

      return {
        ...prevState,
        technicalRecommendations: updatedRecommendations,
      };
    });
  };

  //------------ friend update

  const currentFriend = getAcceptedFriendRequest?.data;
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    if (post?.teamMembers?.length > 0) {
      const initialMembers = post?.teamMembers
        .map((teamMember) => teamMember?.member?._id || teamMember?.member) // Handle both object and direct ID cases
        .filter(Boolean); // Filter out any undefined values
      setSelectedMembers(initialMembers);
    }
  }, [post]);

  const handleCheckboxChange = (id) => {
    setSelectedMembers((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      const updatedSelectedMembers = isSelected
        ? prevSelected.filter((memberId) => memberId !== id) // Remove ID if already selected
        : [...prevSelected, id]; // Add ID if not selected

      // Ensure formData is updated correctly with _id only
      setFormData((prevFormData) => ({
        ...prevFormData,
        teamMembers: updatedSelectedMembers.map((memberId) => ({
          member: memberId,
        })),
      }));

      return updatedSelectedMembers;
    });
  };

  const bgColors = [
    "#fff3c4",
    "#e0ebf6",
    "#d0cddd",
    "#d0eafd",
    "#d0cddd",
    "#e0ffd2",
    "#fddac2",
    "#b0d3e8",
  ];

  //------- update pdf

  const [pdfFile, setPdfFile] = useState(post?.pdf || "");
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setIsFileLoading(true);
      reader.onloadend = () => {
        setPdfFile(reader.result);
        setFormData((prevState) => ({
          ...prevState,
          pdf: reader.result,
        }));
        setIsFileLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };
  const [textareaHeight, setTextareaHeight] = useState('150px');

  useEffect(() => {
    const descriptionLength = formData.description.length;
    const newHeight = Math.max(150, Math.min(300, 150 + (descriptionLength / 70) * 5));
    setTextareaHeight(`${newHeight}px`);
  }, [formData.description]);


  //------- update post
  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log("Selected Members:", formData);
    const id = post?._id;
    const updatedPostData = formData;
    try {
      const result = await updatePostInfo({
        id,
        data: updatedPostData,
      });

      if (result?.data?.message === "Post updated successfully!") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your post has been updated successfully.",
          timer: 3000,
          showConfirmButton: false,
        });

        setIsOpenUpdateModal(false);
        setSelectedPost(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again later.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating Post:", error);
    }
  };

  console.log(currentFriend);

  return (
    <div className="fixed top-0 left-0  flex justify-center items-center bg-black/25 bg-opacity-50 w-screen h-screen overflow-y-scroll z-50">
      <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-[750px] md:h-[600px] overflow-y-scroll 3xl:w-[800px] cursor-pointer">
        <IoIosCloseCircleOutline
          onClick={() => setIsOpenUpdateModal(false)}
          className="text-xl float-right"
        />

        <form onSubmit={handleUpdate}>

          {/* Text Area for Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full outline-none"
            style={{ height: textareaHeight }}
          />
          {/* <section
            name="description"
            contentEditable={true}
            ref={descriptionRef}
            onInput={(e) => {
              saveCursorPosition();
              handleInputChange(e);
            }}
            onFocus={restoreCursorPosition}
            className="w-full outline-none text-xl my-3 py-3 cursor-auto"
            style={{
              whiteSpace: "pre-wrap",
              minHeight: "50px",
              padding: "8px",
            }}
          >
            {formData.description}
          </section> */}

          {/* Technical Recommendations Section */}
          {formData?.technicalRecommendations.length !== 0 && (
            <>
              <hr />
              <p className="text-center text-xl font-bold pt-5">
                Technical Recommendations
              </p>
              <UpdateTechnicalRecommendation
                handleACheckboxChange={handleACheckboxChange}
                formData={formData}
              />
            </>
          )}

          {/* Team Members Section */}
          {formData?.technicalRecommendations.length !== 0 && (
            <div className="py-3 my-7">
              <hr />
              <p className="text-center text-xl font-bold pt-5">Team Members</p>

              <div className="w-full px-3 pb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8 pt-3">
                  {currentFriend?.map((item, index) => {
                    const userIdToMatch =
                      item?.requestedBy?._id !== userId
                        ? item?.requestedBy?._id
                        : item?.requestedTo?._id;

                    // Updated check to compare member IDs properly
                    const isChecked = selectedMembers.includes(userIdToMatch);

                    const displayName =
                      userIdToMatch === item?.requestedBy?._id
                        ? `${item?.requestedBy?.name?.firstName} ${item?.requestedBy?.name?.lastName}`
                        : `${item?.requestedTo?.name?.firstName} ${item?.requestedTo?.name?.lastName}`;

                    const profilePic =
                      userIdToMatch === item?.requestedBy?._id
                        ? item?.requestedBy?.profilePic
                        : item?.requestedTo?.profilePic;

                    return (
                      <div
                        key={item?._id || index}
                        style={{
                          backgroundColor: bgColors[index % bgColors.length],
                        }}
                        className="flex items-center px-3 py-2 rounded-lg shadow-lg"
                      >
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(userIdToMatch)}
                          checked={isChecked}
                        />
                        <img
                          src={
                            profilePic ||
                            "https://i.ibb.co.com/FKKD4mT/opp.png"
                          }
                          loading="lazy"
                          alt={displayName}
                          className="h-9 w-9 rounded-lg ml-2"
                        />
                        <div className="text-sm md:text-[14px] py-1 px-3 rounded-md font-semibold capitalize">
                          {displayName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {formData?.image && formData?.image !== " " && (
            <>
              <hr />
              {/* Image Preview */}
              <div className="relative mt-4">
                <label
                  htmlFor="updateImg"
                  className="bg-white px-4 py-1 rounded-xl absolute left-12 top-3"
                >
                  <p>Edit</p>
                </label>
                {/* File Upload Input */}
                <input
                  type="file"
                  id="updateImg"
                  accept="image/*"
                  onChange={handlePreviewImage}
                  className="hidden"
                />
                <img
                  src={previewImage || formData.image}
                  alt="Preview"
                  className="px-10"
                />
              </div>
            </>
          )}
          {formData?.pdf && formData?.pdf !== " " && (
            <>
              <div className="relative mt-4 ">
                <label htmlFor="updatePDF" className="">
                  <p className="bg-gray-100 px-2  py-1 rounded-xl w-24 text-center mb-2">
                    Edit PDF
                  </p>
                </label>
                <input
                  type="file"
                  id="updatePDF"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  className="hidden"
                />
              </div>
              {pdfFile && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <div className="min-h-[300px] w-full max-h-[70vh] overflow-auto">
                    <Viewer fileUrl={pdfFile} />
                  </div>
                </Worker>
              )}
            </>
          )}

          <button
            type="submit"
            className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-lg font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
/* eslint-disable react/prop-types */
// import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../../Context/UserContext";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import { useUpdatePostInfoMutation } from "../../../features/post/postApi";
// import Swal from "sweetalert2";
// import { Worker, Viewer,} from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";

// const UpdatePost = ({ post, setIsOpenUpdateModal, setSelectedPost }) => {
//   const [updatePostInfo] = useUpdatePostInfoMutation();
//   const [formData, setFormData] = useState({
//     description: post?.description || "",
//     image: post?.image || "",
//     technicalRecommendations: post?.technicalRecommendations || [],
//     teamMembers: post?.teamMembers || [],
//     pdf: post?.pdf || "",
//   });

//   const containerRef = useRef(null);
//   const handlePdfUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     setIsFileLoading(true); // Start loading

//     reader.onloadend = () => {
//       setFormData((prevState) => ({
//         ...prevState,
//         pdf: reader.result,
//       }));
//       setIsFileLoading(false); // End loading
//     };

//     reader.readAsDataURL(file);
//   };
//   useEffect(() => {
//     if (window.LazyLoad) {
//       const lazyLoadInstance = new window.LazyLoad({
//         elements_selector: ".lazy",
//       });

//       return () => {
//         lazyLoadInstance.destroy();
//       };
//     }
//   }, []);

//   //------- update post
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     // console.log("Selected Members:", formData);
//     const id = post?._id;
//     const updatedPostData = formData;
//     try {
//       const result = await updatePostInfo({
//         id,
//         data: updatedPostData,
//       });

//       if (result?.data?.message === "Post updated successfully!") {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: "Your post has been updated successfully.",
//           timer: 3000,
//           showConfirmButton: false,
//         });

//         setIsOpenUpdateModal(false);
//         setSelectedPost(null);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong! Please try again later.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (error) {
//       console.error("Error updating Post:", error);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0  flex justify-center items-center bg-black/25 bg-opacity-50 w-screen h-screen overflow-y-scroll z-50">
//       <div className="w-full   transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-[750px] md:h-[600px] overflow-y-scroll 3xl:w-[800px] cursor-pointer">
//         <IoIosCloseCircleOutline
//           onClick={() => setIsOpenUpdateModal(false)}
//           className="text-xl float-right"
//         />

//         <form onSubmit={handleUpdate}>

//           <div className="relative mt-4">
//             <label
//               htmlFor="updatePDF"
//               className="bg-white px-4 py-1 rounded-xl absolute left-12 top-3"
//             >
//               <p>Edit</p>
//             </label>

//             <input
//               type="file"
//               id="updatePDF"
//               accept="image/*"
//               // onChange={handlePreviewImage}
//               className="hidden"
//             />
//             <img
//               // src={previewImage || formData.image}
//               alt="Preview"
//               className="px-10"
//             />
//           </div>
//           <div
//             ref={containerRef}
//             className="lazy my-3 md:my-1 py-2 shadow-xl border w-full"
//             data-src="your-url-to-trigger-load"
//           >
//             <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//               <div className="hide-scrollbar min-h-[300px] w-[270px] sm:w-[340px] md:w-[540px] lg:w-[500px] xl:w-full max-h-[70vh] 3xl:max-h-[80vh] overflow-x-auto">
//                 <Viewer fileUrl={post?.pdf} />
//               </div>
//             </Worker>
//           </div>

//           <button
//             type="submit"
//             className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-lg font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdatePost;

// import { useEffect, useRef, useState } from "react";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import Swal from "sweetalert2";

// import { useUpdatePostInfoMutation } from "../../../features/post/postApi";

// const UpdatePost = ({
//   post,
//   setIsOpenUpdateModal,
//   setSelectedPost,
// }) => {

//   const [formData, setFormData] = useState({
//     description: post?.description || "",
//     image: post?.image || "",
//     technicalRecommendations: post?.technicalRecommendations || [],
//     teamMembers: post?.teamMembers || [],
//     pdf: post?.pdf || "",
//   });

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const id = post?._id;
//     try {
//       const result = await updatePostInfo({ id, data: formData });
//       if (result?.data?.message === "Post updated successfully!") {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: "Your post has been updated successfully.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//         setIsOpenUpdateModal(false);
//         setSelectedPost(null);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong! Please try again later.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (error) {
//       console.error("Error updating Post:", error);
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 flex justify-center items-center bg-black/25 bg-opacity-50 w-screen h-screen overflow-y-scroll z-50">
//       <div className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-[750px] md:h-[600px] overflow-y-scroll 3xl:w-[800px] cursor-pointer">
//         <IoIosCloseCircleOutline
//           onClick={() => setIsOpenUpdateModal(false)}
//           className="text-xl float-right"
//         />
//         <form onSubmit={handleUpdate}>

//           <button
//             type="submit"
//             className="mt-4 inline-flex justify-center rounded-md border bg-blue-100 px-4 py-2 text-lg font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdatePost;
