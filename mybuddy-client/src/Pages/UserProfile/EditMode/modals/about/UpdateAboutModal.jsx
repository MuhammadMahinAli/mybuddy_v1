import { useContext, useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import TwitterIcon from "../../../../../icons/TwitterIcon";
import GithubIcon from "../../../../../icons/GithubIcon";
import LinkedInIcon from "../../../../../icons/LinkedInIcon";
import ytube from "../../../../../assets/icon/yt.png";
import pintrst from "../../../../../assets/icon/pintrst.png";
import tiktok from "../../../../../assets/icon/tiktok.png";
import fb from "../../../../../assets/icon/fb.png";
import instaIcon from "../../../../../assets/icon/instagram.png";
import { AuthContext } from "../../../../../Context/UserContext";

const UpdateAboutModal = ({ isOpenAboutModal, theme, closeAboutModal }) => {
  const { getSingleUserSocialInfo, updateUserInfo, singleUser, user } =
    useContext(AuthContext);
  const userInfo = singleUser?.data;
  console.log("ui", userInfo);

  // Initialize form data state
  const [formData, setFormData] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    role: "",
    about: "",
    phoneNumber: "",
    phoneNumberPrivacy: false,
    address: "",
    addressPrivacy: false,
    country: "",
  });

  // Populate form data state with userInfo when modal opens
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: {
          firstName: userInfo?.name?.firstName || "",
          lastName: userInfo?.name?.lastName || "",
        },
        role: userInfo?.role || "",
        about: userInfo?.about || "",
        phoneNumber: userInfo?.phoneNumber || "",
        phoneNumberPrivacy: userInfo?.phoneNumberPrivacy || false,
        address: userInfo?.address || "",
        addressPrivacy: userInfo?.addressPrivacy || false,
        country: userInfo?.country || "",
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      // Check if the name is within the "name" object
      if (name === "firstName" || name === "lastName") {
        return {
          ...prevData,
          name: {
            ...prevData.name,
            [name]: value,
          },
        };
      }
      // Handle other fields and checkboxes
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = user?._id;
    const data = { ...formData };

    console.log(formData);
    console.log("data", data);

    try {
      await updateUserInfo({ id, data })
      .unwrap() 
      Swal.fire({
        icon: "success",
        title: "Good Job !",
        text: "You've Updated Your Information !",
      });
      closeAboutModal();
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error("Error updating social info:", error);
    }
  };

  return (
    <Transition appear show={isOpenAboutModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAboutModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <form onSubmit={handleSubmit} className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="px-[3px] rounded-m bg-white">
                  <div
                    className={`${
                      theme === "light"
                        ? "graish lg:w-[780px] xl:w-[1130px] 2xl:w-[1210px] 3xl:w-[1280px]"
                        : "text-white"
                    } `}
                  >
                    <p className="m-[1px] pt-2 md:pt-3 outline-none text-[15px] md:text-[20px] xl:text-[24px] font-semibold text-start">
                      Update Your Information
                    </p>
                    <div
                      data-aos="fade-down"
                      data-aos-duration="1500"
                      className="flex justify-center items-center md:-mt-5 lg:w-[900px] lg:justify-start lg:pl-10"
                    >
                      <div
                        className={`${
                          theme === "light"
                            ? "bg-[#f5f5f5] border-[0.8px] border-solid border-gray shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] "
                            : "bg-[#24272f]"
                        } my-4 md:my-9  w-11/12  space-y-4 p-3 md:p-8 box-border  rounded-xl`}
                      >
                        {/* name */}
                        <div className="flex justify-between items-center">
                          {/* First Name */}
                          <div>
                            <label
                              className={`${
                                theme === "light" ? "graish" : "text-white"
                              } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                            >
                              First Name
                            </label>
                            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                              <textarea
                                name="firstName"
                                value={formData.name.firstName}
                                onChange={handleChange}
                                className={`${
                                  theme === "light"
                                    ? "bg-white text-black"
                                    : "bg-[#204057] text-white"
                                } m-[1px] border pl-2 md:pt-3 outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                              />
                            </div>
                          </div>

                          {/* Last Name */}
                          <div>
                            <label
                              className={`${
                                theme === "light" ? "graish" : "text-white"
                              } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                            >
                              Last Name
                            </label>
                            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                              <textarea
                                name="lastName"
                                value={formData.name.lastName}
                                onChange={handleChange}
                                className={`${
                                  theme === "light"
                                    ? "bg-white text-black"
                                    : "bg-[#204057] text-white"
                                } m-[1px] border pl-2 md:pt-3   outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Role */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Role
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <textarea
                              name="role"
                              value={formData.role}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-white text-black"
                                  : "bg-[#204057] text-white"
                              } m-[1px] border pl-2 md:pt-3   outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* phone */}

                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Phone Number
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <textarea
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "graish"
                                  : "bg-[#204057] text-white"
                              } m-[1px] pl-2 md:pt-3 outline-none rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                          <div className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              name="phoneNumberPrivacy"
                              checked={formData.phoneNumberPrivacy}
                              onChange={handleChange}
                            />
                            <label className="text-blue-600 ml-2 text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
                              Make phone number public
                            </label>
                          </div>
                        </div>

                        {/* address */}
                        <div>
                          <div>
                            <label
                              className={`${
                                theme === "light" ? "graish" : "text-white"
                              } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                            >
                              Address
                            </label>
                            <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                              <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`${
                                  theme === "light"
                                    ? "bg-white text-black"
                                    : "bg-[#204057] text-white"
                                } m-[1px] border pl-2 md:pt-3   outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                              />
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              name="addressPrivacy"
                              checked={formData.addressPrivacy}
                              onChange={handleChange}
                            />
                            <label className="text-blue-600 ml-2 text-sm md:text-[18px] 3xl:text-[20px] font-semibold">
                              Make address public
                            </label>
                          </div>
                        </div>

                        {/* Country */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Country
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <textarea
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-white text-black"
                                  : "bg-[#204057] text-white"
                              } m-[1px] border pl-2 md:pt-3   outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* About */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            About
                          </label>
                          <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                            <textarea
                              name="about"
                              value={formData.about}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-white text-black"
                                  : "bg-[#204057] text-white"
                              } m-[1px] border pl-2   outline-none rounded-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[45px] md:h-[80px]`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-0">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};

export default UpdateAboutModal;
