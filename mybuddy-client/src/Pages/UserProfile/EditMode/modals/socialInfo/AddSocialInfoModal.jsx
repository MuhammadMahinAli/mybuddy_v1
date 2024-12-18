import { useSelector } from "react-redux";
import TwitterIcon from "../../../../../icons/TwitterIcon";
import GithubIcon from "../../../../../icons/GithubIcon";
import LinkedInIcon from "../../../../../icons/LinkedInIcon";
import ytube from "../../../../../assets/icon/yt.png";
import pintrst from "../../../../../assets/icon/pintrst.png";
import tiktok from "../../../../../assets/icon/tiktok.png";
import fb from "../../../../../assets/icon/fb.png";
import instaIcon from "../../../../../assets/icon/instagram.png";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../../../../Context/UserContext";
import Swal from "sweetalert2";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AddSocialInfoModal = ({ isOpenAddSocial, closeAddSocialModal,setIsOpenAddSocial }) => {
  const theme = useSelector((state) => state.theme.theme);
  const { user } = useSelector((state) => state.auth);
  const { addSocialInfo, singleUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    orcid: "",
    researchGate:"",
    googleScholar:"",
    twitter: "",
    github: "",
    linkedIn: "",
    instagram: "",
    personalWebsite: "",
    youtube: "",
    tiktok: "",
    pinterest: "",
    facebook: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user: user?._id,
      ...formData,
    };
    addSocialInfo(data).unwrap();
    Swal.fire({
      icon: "success",
      title: "Good Job !",
      text: "You updated your social information !",
    });
    closeAddSocialModal();
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  return (
    <Transition appear show={isOpenAddSocial} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAddSocialModal}>
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

        <form className="fixed inset-0 overflow-y-auto" onSubmit={handleSubmit}>
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
                        <IoIosCloseCircleOutline
                  onClick={() => setIsOpenAddSocial(false)}
                  className="text-xl text-gray-700 absolute right-5 cursor-pointer"
                />
                    <p className="m-[1px] pt-2 md:pt-4 text-[15px] md:text-[20px] xl:text-[24px] font-semibold text-start">
                      Add Your Social Info
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
                        } my-4 md:my-9  xs:w-[250px] md:w-[500px] lg:w-[400px] xl:w-[500px]  space-y-4 p-3 md:p-8 box-border  rounded-xl`}
                      >
                        {/*  orcid */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Orc ID
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <div
                              className={`${
                                theme !== "light" ? "bg-[#fff]" : "bg-[#fff]"
                              }  rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14`}
                            >
                              <img
                                className="h-[36px]"
                                src="/orcid.svg.png"
                                loading="lazy"
                                alt=""
                              />
                            </div>

                            <textarea
                              name="orcid"
                              value={formData.orcid}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#d6f4ca] graish"
                                  : "bg-[#204057] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>
                        {/*  researchGate */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                          Research Gate
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <div
                              className={`${
                                theme !== "light" ? "bg-[#fff]" : "bg-[#fff]"
                              }  rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14`}
                            >
                               <img
                                className="h-[40px]"
                                src="/rg.png"
                                loading="lazy"
                                alt=""
                              />
                            </div>

                            <textarea
                              name="researchGate"
                              value={formData.researchGate}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                 ? "bg-[#caf4ee] graish"
                                  : "bg-[#204057] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>
                        {/*  googleScholar */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                           Google Scholar
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <div
                              className={`${
                                theme !== "light" ? "bg-[#fff]" : "bg-[#fff]"
                              }  rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14`}
                            >
                            <img
                                className="h-[38px]"
                                src="/google-scholar-hd-logo.png"
                                loading="lazy"
                                alt=""
                              />
                            </div>

                            <textarea
                              name="googleScholar"
                              value={formData.googleScholar}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                              ? "bg-[#cae4f4] graish"
                                  : "bg-[#204057] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>
                        {/* Twitter */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Twitter
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <div
                              className={`${
                                theme !== "light" ? "bg-[#fff]" : "bg-[#000]"
                              }  rounded-l-lg  flex justify-center items-center h-9 w-10 md:h-14 md:w-14`}
                            >
                              <TwitterIcon theme={theme} />
                            </div>

                            <textarea
                              name="twitter"
                              value={formData.twitter}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#cae4f4] graish"
                                  : "bg-[#204057] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* Github */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Github
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <div className="bg-[#1abcfe] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                              <GithubIcon />
                            </div>

                            <textarea
                              name="github"
                              value={formData.github}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#b3e4f8] graish"
                                  : "bg-[#1f546d] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* LinkedIn */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            LinkedIn
                          </label>
                          <div className="flex justify-start items-center cursor-pointer -space-x-1 h-10 md:h-20 pt-1">
                            <div className="bg-[#0288d1] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                              <LinkedInIcon />
                            </div>

                            <textarea
                              name="linkedIn"
                              value={formData.linkedIn}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#c4dfee] graish"
                                  : "bg-[#15384c] text-white"
                              } m-[2px] pl-2 md:pt-4 outline-none rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* Instagram */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Instagram
                          </label>
                          <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                            <div className="bg-[#ff7478] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                              <img
                                className="h-7 w-7"
                                src={instaIcon}
                                loading="lazy"
                                alt=""
                              />
                            </div>

                            <textarea
                              name="instagram"
                              value={formData.instagram}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#ffd0d1] graish"
                                  : "bg-[#593739] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* Personal Website */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Personal Website
                          </label>
                          <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                            <div className="bg-[#5a9cf9] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="26"
                                fill="#fff"
                                className="bi bi-globe2"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zM8 1.018a6.961 6.961 0 0 0-1.75 4.225h3.5A6.961 6.961 0 0 0 8 1.018zm0 13.964a6.96 6.96 0 0 0 1.75-4.225h-3.5A6.96 6.96 0 0 0 8 14.982zM6.243 14H9.76c-.205-.536-.378-1.166-.49-1.863H6.733c-.112.697-.285 1.327-.49 1.863zm-1.166-3.863h5.846c.108-.7.176-1.445.186-2.225H4.891c.01.78.078 1.525.186 2.225zM4.89 7.225h6.22c-.01-.78-.078-1.525-.186-2.225H5.077c-.108.7-.176 1.445-.186 2.225zm1.843-3.912h2.536c.205-.536.378-1.166.49-1.863H6.633c.112.697.285 1.327.49 1.863zm4.162 0h2.524a7.007 7.007 0 0 0-1.46-1.863c-.39.715-.737 1.514-1.064 1.863zm-5.186 0c-.327-.35-.675-1.148-1.064-1.863a7.007 7.007 0 0 0-1.46 1.863h2.524zM3.709 10.137h-2.52a7.005 7.005 0 0 0 1.459 1.863c.39-.715.737-1.514 1.064-1.863zm7.238 0c.327.35.675 1.148 1.064 1.863a7.005 7.005 0 0 0 1.459-1.863h-2.52z" />
                              </svg>
                            </div>

                            <textarea
                              name="personalWebsite"
                              value={formData.personalWebsite}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#ced4ff] graish"
                                  : "bg-[#323859] text-white"
                              } m-[2px] pl-2 md:pt-4 outline-none rounded-r-lg w-full  md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* YouTube */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            YouTube
                          </label>
                          <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                            <div className="bg-[#FF0000] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                              <img
                                className="h-7 w-7"
                                src={ytube}
                                loading="lazy"
                                alt=""
                              />
                            </div>

                            <textarea
                              name="youtube"
                              value={formData.youtube}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#ffd0d1] graish"
                                  : "bg-[#593739] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* TikTok */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            TikTok
                          </label>
                          <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                            <div className="bg-[#000000] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                              <img
                                className="h-7 w-7"
                                src={tiktok}
                                loading="lazy"
                                alt=""
                              />
                            </div>

                            <textarea
                              name="tiktok"
                              value={formData.tiktok}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#ffd0d1] graish"
                                  : "bg-[#593739] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* Pinterest */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Pinterest
                          </label>
                          <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                            <div className="bg-[#E60023] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                              <img
                                className="h-7 w-7"
                                src={pintrst}
                                loading="lazy"
                                alt=""
                              />
                            </div>

                            <textarea
                              name="pinterest"
                              value={formData.pinterest}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#ffd0d1] graish"
                                  : "bg-[#593739] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>

                        {/* Facebook */}
                        <div>
                          <label
                            className={`${
                              theme === "light" ? "graish" : "text-white"
                            } text-sm md:text-[18px] 3xl:text-[20px] font-semibold`}
                          >
                            Facebook
                          </label>
                          <div className="flex justify-start items-center -space-x-1 cursor-pointer h-10 md:h-20 pt-1">
                            <div className="bg-[#3b5998] rounded-l-lg flex justify-center items-center h-9 w-10 md:h-14 md:w-14">
                              <img
                                className="p-1 w-7"
                                src={fb}
                                loading="lazy"
                                alt=""
                              />
                            </div>

                            <textarea
                              name="facebook"
                              value={formData.facebook}
                              onChange={handleChange}
                              className={`${
                                theme === "light"
                                  ? "bg-[#ffd0d1] graish"
                                  : "bg-[#593739] text-white"
                              } m-[1px] pl-2 md:pt-4 outline-none rounded-r-lg w-full md:px-3 text-[15px] md:text-[18px] xl:text-[20px] font-semibold text-start h-[37px] md:h-[57px]`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
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

export default AddSocialInfoModal;
