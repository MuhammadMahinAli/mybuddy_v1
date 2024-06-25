import { useSelector } from "react-redux";
import whiteBorder from "../../../assets/user-profile/profile-white-border.png";
import darkBorder from "../../../assets/user-profile/profile-dark-border.png";
import xIcon from "../../../assets/user-profile/x.png";
import googleIcon from "../../../assets/user-profile/google.png";
import githubIcon from "../../../assets/user-profile/github.png";
import linkedinIcon from "../../../assets/user-profile/linkedin.png";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import CameraIcon from "../../../icons/CameraIcon";
import BackButton from "../../../icons/BackButton";
import UpdateButton from "../../../icons/UpdateButton";
import CameraIcon2 from "../../../icons/CameraIcon2";
import DekstopFormatEM from "./DekstopFormatEM";
import MobileTabFormetEM from "./MobileTabFormetEM";
import UserProfileAboutEM from "./UserProfileAboutEM";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/UserContext";
import { fileUpload } from "../../../utils/cloudinary";
import Swal from "sweetalert2";
import { CiSaveUp1 } from "react-icons/ci";
import UploadIcon2 from "../../../icons/UploadIcon2";
import UpdateAboutModal from "./modals/about/UpdateAboutModal";

const UserProfileEM = () => {
  const theme = useSelector((state) => state.theme.theme);
  const {
    singleUser,
    getUserPost,
    getAllProjectByUser,
    updateCoverPic,
    updateProfilePic,
    user,
    getAcceptedFriendRequest,
  } = useContext(AuthContext);

  // user information
  const userName = singleUser
    ? singleUser?.data?.name?.firstName + " " + singleUser?.data?.name?.lastName
    : "Welcome Guest !";
  const userPostNumber = singleUser ? getUserPost?.data?.length : "0";
  const userProjectNumber = singleUser
    ? getAllProjectByUser?.data?.length
    : "0";
  const id = user?._id;
  const userRole = singleUser?.data?.role ? singleUser?.data?.role : "Add your role";
  const userPhoneNumber = singleUser?.data?.phoneNumber
    ? singleUser?.data?.phoneNumber
    : "Add your phone number";
  const userAddress = singleUser?.data?.address
    ? singleUser?.data?.address + ","
    : "Add your Address";
  const userCountry = singleUser?.data?.country
    ? singleUser?.data?.country + "."
    : "";
  const userAbout = singleUser?.data?.about
    ? singleUser?.data?.about
    : "Add your bio.";
  const userFriend =  getAcceptedFriendRequest?.data?.length;

  console.log(getAcceptedFriendRequest);

  // update cover
  const [coverImage, setCoverImage] = useState(null);
  const [previewCoveImage, setPreviewCoverImage] = useState("");

  const handleUpdateCoverImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setPreviewCoverImage(URL.createObjectURL(file));
      try {
        const imageUrl = await fileUpload(file);
        if (imageUrl) {
          setCoverImage(imageUrl);
          console.log("Image URL:", imageUrl);
          return imageUrl;
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error in fileUpload:", error);
      }
    }
  };
  const currentCover = singleUser?.data?.coverPic;

  const handleCoverImageUpload = async () => {
    if (coverImage) {
      const data = {
        coverPic: coverImage,
      };
      console.log("Data to be uploaded:", data);
      try {
        await updateCoverPic({ id, data });
        console.log("Cover photo updated successfully");
        Swal.fire({
          icon: "success",
          title: "Cover Photo Updated",
          text: "Your cover photo has been updated successfully!",
        });
        setCoverImage(null);
        setPreviewCoverImage("");
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } catch (error) {
        console.error("Error uploading cover photo:", error);
      }
    } else {
      console.warn("No cover image to upload");
    }
  };
  // update profile Profile
  const [profileImage, setProfileImage] = useState(null);
  const [previewProfileImage, setPreviewProfileImage] = useState("");

  const handleUpdateProfileImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setPreviewProfileImage(URL.createObjectURL(file));
      try {
        const imageUrl = await fileUpload(file);
        if (imageUrl) {
          setProfileImage(imageUrl);
          console.log("Image URL:", imageUrl);
          return imageUrl;
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error in fileUpload:", error);
      }
    }
  };
  const currentProfile = singleUser?.data?.profilePic;

  const handleProfileImageUpload = async () => {
    if (profileImage) {
      const data = {
        profilePic: profileImage,
      };
      console.log("Data to be uploaded:", data);
      try {
        await updateProfilePic({ id, data });
        console.log("Profile photo updated successfully");
        Swal.fire({
          icon: "success",
          title: "Profile Photo Updated",
          text: "Your Profile photo has been updated successfully!",
        });
        setProfileImage(null);
        setPreviewProfileImage("");
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } catch (error) {
        console.error("Error uploading Profile photo:", error);
      }
    } else {
      console.warn("No Profile image to upload");
    }
  };

  // update modal
  const [isOpenAboutModal, setIsOpenAboutModal] = useState(false);
  const closeAboutModal = () => {
    setIsOpenAboutModal(false);
  };
  return (
    <div>
      {/* cover photo  3e4246 */}

      <div
        className={`${
          theme === "light" ? "bg-gray-400" : "bg-[#3e4246]"
        } relative h-[180px] md:h-[250px]`}
      >
        {/* Cover picture */}
        {currentCover && (
          <img
            src={currentCover}
            alt="Cover Photo"
            className="h-[180px] md:h-[250px] w-full object-cover z-0 p-[0px] "
          />
        )}

        {/* upload button for mobile */}
        <div className="absolute w-full top-5">
          <div className="w-full flex justify-between items-center lg:hidden pt-5 px-5 md:px-10 ">
            <BackButton />
            {previewCoveImage === "" ? (
              <label htmlFor="coverImageInput">
                <UpdateButton />
              </label>
            ) : (
              <button onClick={handleCoverImageUpload}>
                <FaHeart />
              </button>
            )}
          </div>
        </div>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleUpdateCoverImage}
          className="hidden"
          id="coverImageInput"
        />
        {/* upload button for dekstop */}
        {theme === "light" ? (
          <div className="hidden lg:block p-[2px] rounded-[13px] bg-gradient-to-l from-[rgb(42,219,164)] to-[#69f9cc] float-right absolute right-1 bottom-5 lg:mr-1 3xl:mr-4">
            {previewCoveImage === "" ? (
              <button className="flex items-center space-x-1 lg:text-sm  rounded-[13px] font-semibold graish lg:px-1 lg:py-1 xl:px-4 xl:py-2 bg-gray-400">
                <label htmlFor="coverImageInput">
                  <div className="flex space-x-1">
                    <CameraIcon2 theme={theme} />

                    <p>Edit Cover Photo</p>
                  </div>
                </label>
              </button>
            ) : (
              <button
                onClick={handleCoverImageUpload}
                className="flex items-center space-x-1 lg:text-sm  rounded-[13px] font-semibold graish lg:px-1 lg:py-1 xl:px-4 xl:py-2 bg-gray-400"
              >
                <div className="flex space-x-1">
                  {/* <CameraIcon2 theme={theme}/> */}
                  <CiSaveUp1 className={` text-xl`} />
                  <p>Save now</p>
                </div>
              </button>
            )}
          </div>
        ) : (
          <>
            {previewCoveImage === "" ? (
              <button className="hidden lg:block updateCoverBtn float-right absolute -top-56 right-5">
                <label htmlFor="coverImageInput">
                  <p>
                    <span>
                      <CameraIcon2 theme={theme} />
                    </span>
                    Edit Cover Photo
                  </p>
                </label>
              </button>
            ) : (
              <button
                onClick={handleCoverImageUpload}
                className="hidden lg:block updateCoverBtn float-right absolute -top-56 right-5"
              >
                <p className="text-xl">Save now</p>
              </button>
            )}
          </>
        )}
      </div>

      {/* user profile  */}
      <div className="z-50 -mt-20 space-y-5">
        <div
          className={`${
            theme !== "light" &&
            "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-3xl w-full md:w-11/12 lg:w-9/12 mx-0 md:mx-7 lg:mx-[100px] xl:mx-36"
          }`}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-white w-full md:w-11/12 lg:w-9/12 mx-0 md:mx-7 lg:mx-[100px] xl:mx-36"
                : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:ml-[1px]"
            } rounded-3xl lg:rounded-3xl relative  py-10  z-40 shadow-2xl`}
          >
            {/* profile for mobile and tab */}
            <div className=" flex flex-col justify-center items-center space-y-4 relative">
              <div className="relative bg-red-00 -mt-20 md:-mt-24 lg:-mt-28 ">
                <img
                  src={
                    previewProfileImage ||
                    currentProfile ||
                    "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
                  }
                  className="h-20 w-20 md:h-32 md:w-32 xl:w-36 xl:h-36 rounded-full p-2 md:p-[10px] lg:p-[12px] "
                />

                <img
                  className="w-20  md:w-32 lg:w-32 xl:w-36 absolute -top-[0px] right-0 md:top-[1px] md:right-0 lg:-top-0  lg:right-[0px] xl:-top-0 xl:right-[0px] 2xl:right-[0px] 3xl:right-[0px] 5xl:right-[0px]"
                  src={theme === "light" ? whiteBorder : darkBorder}
                  alt="dashedborder"
                />
                {/* <CameraIcon /> */}
                {previewProfileImage === "" ? (
                  <label htmlFor="profileImageInput">
                    <CameraIcon theme={theme} />
                  </label>
                ) : (
                  <button
                    className={`${theme === 'light' ? "bg-[#efefef] text-gray-500":"bg-[#3e4246] text-white"} absolute top-12 -right-2 md:top-20 lg:top-24  md:-right-[1px] lg:-right-[3px] xl:-right-[4px] 2xl:right-[0px] 3xl:top-24 3xl:-right-[1px] 5xl:right-[0px]  rounded-full`}
                    onClick={handleProfileImageUpload}
                  >
                <FaCheckCircle className="text-xl xl:text-2xl 3xl:text-3xl " />
                  </button>
                )}
                  <input
    type="file"
    name="file"
    accept="image/*"
    onChange={handleUpdateProfileImage}
    className="hidden"
    id="profileImageInput"
  />
              </div>
              <ul className="flex justify-between items-center w-80 pb-5">
                <li className="flex flex-col items-center justify-center border-r-2  py-2 w-full text-center  font-medium">
                  <p
                    className={`${
                      theme === "light" ? "graish" : "text-white"
                    } text-[14px] md:text-[16px]`}
                  >
                    {userPostNumber}
                  </p>
                  <p
                    className={`${
                      theme === "light" ? "text-gray-500" : "text-white"
                    } font-medium text-[14px] md:text-[16px]`}
                  >
                    POSTS
                  </p>
                </li>
                <li className="flex flex-col items-center justify-center  border-r-2  py-2 w-full text-center  font-medium">
                  <p
                    className={`${
                      theme === "light" ? "graish" : "text-white"
                    } text-[14px] md:text-[16px]`}
                  >
                    {userProjectNumber}
                  </p>
                  <p
                    className={`${
                      theme === "light" ? "text-gray-500" : "text-white"
                    } font-medium text-[14px] md:text-[16px]`}
                  >
                    PROJECTS
                  </p>
                </li>
                <li className="flex flex-col items-center justify-center    py-2 w-full text-center  font-medium">
                  <p
                    className={`${
                      theme === "light" ? "graish" : "text-white"
                    } text-[14px] md:text-[16px]`}
                  >
                    {userFriend}
                  </p>
                  <p
                    className={`${
                      theme === "light" ? "text-gray-500" : "text-white"
                    } font-medium text-[14px] md:text-[16px]`}
                  >
                    FRIENDS
                  </p>
                </li>
              </ul>
              <div className="space-y-1 relative border rounded-xl shadow-xl p-2 xl:px-40 md:w-[500px] lg:w-[700px] xl:w-[800px] 3xl:w-[900px]">
                <button
                  type="button"
                  onClick={() => setIsOpenAboutModal(true)}
                  className="absolute -right-3 -top-3"
                >
                  <UploadIcon2 theme={theme} />
                </button>
                <h1
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } pb-3 text-xl text-center font-bold`}
                >
                  {userName}
                </h1>
               
                <h1
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } font-medium text-[14px] xl:text-[16px] text-center `}
                >
                  Role: {userRole}
                </h1>
                <h1
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } font-medium text-[14px] xl:text-[16px] text-center  `}
                >
                 Address:  {userAddress} <span>{userCountry}</span>
                </h1>
                <h1
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } font-medium text-[14px] xl:text-[16px] text-center pb-2`}
                >
                  Contact: {userPhoneNumber}
                </h1>
                <p
                  className={`${
                    theme === "light" ? "graish" : "text-white"
                  } text-[15px] xl:text-[18px] font-medium capitalize text-center px-5 border-t border-[#838DAA] py-2 hidden lg:block`}
                >
                  {userAbout}
                </p>
              </div>
            </div>
          </div>
        </div>
        {isOpenAboutModal && (
          <UpdateAboutModal
            theme={theme}
            isOpenAboutModal={isOpenAboutModal}
            closeAboutModal={closeAboutModal}
          />
        )}
        {/* about , activity */}
        <div className="lg:hidden lg:w-9/12 px-5 md:mx-7 lg:mx-[100px] xl:mx-36">
          <UserProfileAboutEM
            theme={theme}
            setIsOpenAboutModal={setIsOpenAboutModal}
            userAbout={userAbout}
          />
        </div>
      </div>
      <MobileTabFormetEM
        getUserPost={getUserPost?.data}
        getAllProjectByUser={getAllProjectByUser}
        theme={theme}
      />
      <DekstopFormatEM
        getUserPost={getUserPost?.data}
        singleUser={singleUser}
        getAllProjectByUser={getAllProjectByUser}
        theme={theme}
      />
    </div>
  );
};

export default UserProfileEM;
//   {/* profile for mobile and tab */}
//   <div className="lg:hidden flex flex-col justify-center items-center space-y-4 relative">
//   <img
//     src={
//       previewProfileImage ||
//       currentProfile ||
//       "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//     }
//     className="h-20 w-20 md:h-32 md:w-32 -mt-20 md:-mt-24 lg:-mt-28 rounded-full p-2 md:p-[10px] lg:p-[8px] "
//   />
//
//   <img
//     className="w-20  md:w-32 lg:w-32 xl:w-36 absolute -top-[95px] md:-top-[110px] lg:-top-28 md:right-[26px] lg:right-14"
//     src={theme === "light" ? whiteBorder : darkBorder}
//     alt="dashedborder"
//   />
//
//   {/* <CameraIcon /> */}
//   {previewProfileImage === "" ? (
//     <label htmlFor="profileImageInput">
//       <CameraIcon theme={theme} />
//     </label>
//   ) : (
//     <button
//       className={`${
//         theme === "light" ? "bg-[#efefef]" : "bg-[#3e4246]"
//       } rounded-full`}
//       onClick={handleProfileImageUpload}
//     >
//       <FaHeart />
//     </button>
//   )}
//
//   <div className="space-y-1">
//     <h1
//       className={`${
//         theme === "light" ? "graish" : "text-white"
//       } text-xl text-center font-bold`}
//     >
//       {userName}
//     </h1>
//     <h1
//       className={`${
//         theme === "light" ? "graish" : "text-white"
//       } text-[14px] text-center `}
//     >
//       {userRole}
//     </h1>
//     <h1
//       className={`${
//         theme === "light" ? "graish" : "text-white"
//       } text-[14px] text-center  `}
//     >
//       {userAddress} <span>{userCountry}</span>
//     </h1>
//     <h1
//       className={`${
//         theme === "light" ? "graish" : "text-white"
//       } text-[14px] text-center `}
//     >
//       Contact: {userPhoneNumber}
//     </h1>
//   </div>
//   <div className="flex space-x-3">
//     <img src={xIcon} className="h-9 rounded-full" />
//     <img src={googleIcon} className="h-9 rounded-full" />
//     <img src={linkedinIcon} className="h-9 rounded-full" />
//     <img src={githubIcon} className="h-9 rounded-full" />
//   </div>
//  /div>

//<div className="flex flex-col-reverse lg:flex-row justify-between items-center ">
//left
//<div className="">
//  <ul className="flex justify-between items-center w-80">
//    <li className="flex flex-col items-center justify-center border-r-2  py-2 w-full text-center  font-medium">
//      <p
//        className={`${
//          theme === "light" ? "graish" : "text-white"
//        } text-[16px] md:text-xl`}
//      >
//        {userPostNumber}
//      </p>
//      <p
//        className={`${
//          theme === "light" ? "text-gray-500" : "text-white"
//        } font-medium text-[14px] md:text-[16px]`}
//      >
//        POSTS
//      </p>
//    </li>
//    <li className="flex flex-col items-center justify-center  border-r-2  py-2 w-full text-center  font-medium">
//      <p
//        className={`${
//          theme === "light" ? "graish" : "text-white"
//        } text-[16px] md:text-xl`}
//      >
//        {userProjectNumber}
//      </p>
//      <p
//        className={`${
//          theme === "light" ? "text-gray-500" : "text-white"
//        } font-medium text-[14px] md:text-[16px]`}
//      >
//        PROJECTS
//      </p>
//    </li>
//    <li className="flex flex-col items-center justify-center    py-2 w-full text-center  font-medium">
//      <p
//        className={`${
//          theme === "light" ? "graish" : "text-white"
//        } text-[16px] md:text-xl`}
//      >
//        1,130
//      </p>
//      <p
//        className={`${
//          theme === "light" ? "text-gray-500" : "text-white"
//        } font-medium text-[14px] md:text-[16px]`}
//      >
//        FRIENDS
//      </p>
//    </li>
//  </ul>
//</div>
//center
//<div className="hidden lg:flex flex-col justify-center items-center relative">
//  <img
//    src={
//      previewProfileImage ||
//      currentProfile ||
//      "https://as1.ftcdn.net/v2/jpg/01/68/80/20/1000_F_168802088_1msBk8PpBRCCVo012WJTpWG90KHvoMWf.jpg"
//    }
//    className="h-32 w-32 -mt-[115px] rounded-full p-[9px]"
//  />
//  <img
//    className="w-8 lg:w-32 xl:h-32 xl:w-36 absolute -top-28 right-[12px] md:right-0"
//    src={theme === "light" ? whiteBorder : darkBorder}
//    alt="dashedborder"
//  />
//
//
//  {previewProfileImage === "" ? (
//    <label htmlFor="profileImageInput">
//      <CameraIcon theme={theme} />
//    </label>
//  ) : (
//    <button
//      className={`${
//        theme === "light" ? "bg-[#efefef]" : "bg-[#3e4246]"
//      } absolute -top-12 md:-top-7 right-24 md:right-16 lg:-right-1  rounded-full`}
//      onClick={handleProfileImageUpload}
//    >
//      <FaHeart />
//    </button>
//  )}
//  <input
//    type="file"
//    name="file"
//    accept="image/*"
//    onChange={handleUpdateProfileImage}
//    className="hidden"
//    id="profileImageInput"
//  />
//</div>
//right
//<div className="py-6 lg:py-0 lg:px-3 3xl:px-8">
//  <div className="flex justify-between items-center space-x-3">
//    {theme === "light" ? (
//      <div className="p-[2px] rounded-[13px] bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
//        <button className="lg:text-sm xl:text-lg rounded-[13px] font-semibold graish px-3 py-2 xl:px-4 xl:py-2 bg-white">
//          Proposal
//        </button>
//      </div>
//    ) : (
//      <p className="cursor-pointer text-sm lg:text-[14px] font-medium rounded-[15px] py-1 md:py-3 px-3 xl:px-5  text-white tracking-wider shadow-[-2px_-2px_100px_rgba(255,_255,_255,_0.1)_inset,_2px_2px_100px_rgba(66,_66,_66,_0.1)_inset] [backdrop-filter:blur(50px)]  box-border">
//        PROPOSAL
//      </p>
//    )}
//    {/* friend request button */}
//    {theme === "light" ? (
//      <div className="lg:text-sm xl:text-lg text-white font-semibold rounded-[13px] px-3 py-2 xl:px-4 xl:py-2 cursor-pointer bg-gradient-to-l from-[#2adba4] to-[#69f9cc]">
//        Friend Request
//      </div>
//    ) : (
//      <button className="profileFriendRequestBtn">
//        <p>FRIEND REQUEST</p>
//      </button>
//    )}
//
//    <div
//      className={`${
//        theme === "light"
//          ? "bg-red-200"
//          : "border border-[#9370DB]"
//      } rounded-[11px] px-3 py-2 xl:px-3 xl:py-2 flex justify-center items-center`}
//    >
//      <FaHeart className="text-2xl font-semibold text-red-500 cursor-pointer" />
//    </div>
//  </div>
//</div>
//
//
//</div>
//{/* profile for dekstop */}
//<div className="hidden lg:flex flex-col justify-center items-center space-y-3 lg:pt-6">
//<div className="rounded-3xl border-2 my-5 mx-10 p-2 relative min-w-[700px]">
//<div className="flex flex-col justify-center items-center space-y-3 pb-10 ">
//  <h1
//    className={`${
//      theme === "light" ? "graish" : "text-white"
//    } text-xl font-bold`}
//  >
//    {userName}
//  </h1>
//
//  <div className="space-y-2">
//  <h1
//    className={`${theme === "light" ? "graish" : "text-white"}`}
//  >
//   {userRole}
//  </h1>
//  <h1
//      className={`${
//        theme === "light" ? "graish" : "text-white"
//      } text-[15px] text-center`}
//    >
//      {userAddress} <span>{userCountry}</span>
//    </h1>
//    <h1
//      className={`${
//        theme === "light" ? "graish" : "text-white"
//      } text-[15px] text-center `}
//    >
//      Contact: {userPhoneNumber}
//    </h1>
//    </div>
//  <div className="flex space-x-3 pt-2">
//    <img src={xIcon} className="h-9 rounded-full" />
//    <img src={googleIcon} className="h-9 rounded-full" />
//    <img src={linkedinIcon} className="h-9 rounded-full" />
//    <img src={githubIcon} className="h-9 rounded-full" />
//  </div>
//</div>
//<p
//  className={`${
//    theme === "light" ? "graish" : "text-white"
//  } text-center px-5 border-t border-[#838DAA] py-5`}
//>
//  {userAbout}
//</p>
//{/* edit button */}
//<button type="button" onClick={()=>setIsOpenAboutModal(true)} className="absolute -right-3 -top-3">
//    <UploadIcon2 theme={theme} />
//  </button>
//</div>
//{
//  isOpenAboutModal && <UpdateAboutModal theme={theme} isOpenAboutModal={isOpenAboutModal} closeAboutModal={closeAboutModal} />
//}
//</div>
