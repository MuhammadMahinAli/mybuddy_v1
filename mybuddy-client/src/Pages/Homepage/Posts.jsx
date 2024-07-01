import { useEffect, useState } from "react";
import pdfPreview from '../../assets/home/pdf-image.jpg';
import MediaIcon from "../../icons/MediaIcon";
import ArticleIcon from "../../icons/ArticleIcon";
import ProjectIcon from "../../icons/ProjectIcon";
import TechnicalIcon from "../../icons/TechnicalIcon";
import TeamMemberIcon from "../../icons/TeamMemberIcon";
import PdfIcon from "../../icons/PdfIcon";
import TechnicalRecommendationModal from "./TechnicalRecommendationModal";
import { fileUpload } from "../../utils/cloudinary";
import TeamMemberModal from "./TeamMemberModal";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../features/post/postApi";
import { useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";

const Posts = ({ theme }) => {
  const navigate = useNavigate();
  const [mediaTab, setMediaTab] = useState(true);
  const [projectTab, setProjectTab] = useState(false);
  const [articleTab, setArticleTab] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [createPost, { data: responseData, error: responseError }] =
    useCreatePostMutation();
  const { user } = useSelector((state) => state.auth);

  const closeModal = () => {
    setIsOpen(false);
  };
  const closeTeamModal = () => {
    setIsTeamOpen(false);
  };

  const toggleMedia = () => {
    setMediaTab(true);
    setProjectTab(false);
    setArticleTab(false);
  };
  const toggleProject = () => {
    setMediaTab(false);
    setProjectTab(true);
    setArticleTab(false);
  };
  const toggleArticle = () => {
    setMediaTab(false);
    setProjectTab(false);
    setArticleTab(true);
  };

  const [previewImage, setPreviewImage] = useState("");
  const handlePreviewImage = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewImage(file);
      //setPreviewImage(URL.createObjectURL(file));
      const imageUrl = await fileUpload(file);
      setFormData((prevState) => ({
        ...prevState,
        image: imageUrl,
      }));
      return imageUrl;
    }
  };
  console.log(previewImage);
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevState) => ({
        ...prevState,
        pdf: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };
  // teamMembers: [],
  const [formData, setFormData] = useState({
    description: "",
    technicalRecommendations: [],
    teamMembers: [],
    comments: [],
    pdf: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateTechnicalRecommendations = (recommendations) => {
    setFormData((prevState) => ({
      ...prevState,
      technicalRecommendations: recommendations,
    }));
  };
  
  const updateTeamMember = (members) => {
    setFormData((prevState) => ({
      ...prevState,
      teamMembers: members, 
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (!formData.description) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget To Write Description",
      });
      return;
    }
    const postData = {
     ...formData,
      postedBy: user._id,
    };
    console.log("form", postData);
    createPost(postData);
    setFormData({
      description: "",
      technicalRecommendations: [],
      image: "",
      comments: [],
      pdf: "",
    });

  };


  useEffect(() => {
    if (!responseData?.status) {
      console.log(responseData?.message);
    }
    if (responseError?.data) {
       console.log(responseError.data);
    }
    if (responseData?.success && responseData?.data) {
      console.log(responseData);
      Swal.fire({
        icon: "success",
        title: "Hurry !",
        text: "Your post has been published !",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }, [responseData, responseError]);

  const handleRemoveImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      image: "",
    }));
    setPreviewImage("");
  };
  const handleRemovePdf = () => {
    setFormData((prevState) => ({
      ...prevState,
      pdf: "",
    }));
  };

  return (
    <div className="z-0">
      <div
        className={`${
          theme !== "light" &&
          "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90% rounded-[10px]"
        }`}
      >
        <div
          className={`${
            theme === "light"
              ? "bg-white"
              : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover"
          } shadow-[-1px_0px_56px_-6px_rgba(134,134,134,0.25)] rounded-[10px] w-[240px] xs:w-[280px] sm:w-[350px] md:w-[600px] lg:w-[500px] xl:w-[670px] 2xl:w-[750px] 3xl:w-[800px]`}
        >
          <ul className="flex justify-between items-center">
            <li
              onClick={toggleMedia}
              className={`${
                mediaTab ? "border-b-4 border-b-[#2adba4]" : "border-b-2"
              } flex items-center justify-center space-x-2 border-r-2 py-4 w-full text-center font-medium cursor-pointer`}
            >
              <MediaIcon theme={theme} />
              <p
                className={`text-[14px] md:text-[18px] ${
                  theme === "light" ? "text-gray-500" : "text-white"
                }`}
              >
                Media
              </p>
            </li>
            <li
              onClick={toggleProject}
              className={`${
                projectTab ? "border-b-4 border-b-[#2adba4]" : "border-b-2"
              } flex items-center justify-center space-x-2 border-r-2 py-4 w-full text-center font-medium cursor-pointer`}
            >
              <ProjectIcon theme={theme} />
              <p
                className={`text-[14px] md:text-[18px] ${
                  theme === "light" ? "text-gray-500" : "text-white"
                }`}
              >
                Project
              </p>
            </li>
            <li
              onClick={toggleArticle}
              className={`${
                articleTab ? "border-b-4 border-b-[#2adba4]" : "border-b-2"
              } flex items-center justify-center space-x-2 py-4 w-full text-center font-medium cursor-pointer`}
            >
              <ArticleIcon theme={theme} />
              <p
                className={`text-[14px] md:text-[18px] ${
                  theme === "light" ? "text-gray-500" : "text-white"
                }`}
              >
                Article
              </p>
            </li>
          </ul>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={`h-20 md:h-40 w-full border-b-2 p-2 outline-none ${
              theme === "light" ? "bg-white" : "bg-transparent text-white"
            }`}
            placeholder="Enter description"
            required
          />
          <div className="flex justify-between items-center py-2 px-3">
            <div className="flex space-x-3 xl:space-x-4 items-center">
              {mediaTab && (
                <label htmlFor="media">
                  <MediaIcon theme={theme} />
                </label>
              )}
              {projectTab && (
                <>
                  <button type="button" onClick={() => setIsTeamOpen(true)}>
                    <TeamMemberIcon />
                  </button>
                  <button type="button" onClick={() => setIsOpen(true)}>
                    <TechnicalIcon />
                  </button>
                  <label htmlFor="media">
                    <MediaIcon theme={theme} />
                  </label>
                </>
              )}
              <input
                className="hidden"
                type="file"
                name="file"
                id="media"
                onChange={handlePreviewImage}
                accept="image/*"
              />
              {articleTab && (
                <>
                  <label htmlFor="pdf">
                    <PdfIcon />{" "}
                  </label>
                  <input
                    className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
                                                             focus:outline-none  bg-white text-gray-900 hidden"
                    type="file"
                    accept=".pdf"
                    name="pdf"
                    id="pdf"
                    onChange={handlePdfUpload}
                  />
                </>
              )}
              {/* preview image */}
               {formData?.image && ( 
                <div className="relative  bg-gray-300 rounded-lg h-7 w-10 md:h-14 md:w-28 lg:ml-4">
                  <div onClick={handleRemoveImage} className="bg-gray-200 absolute -top-2 -right-3 rounded-full">
                  <IoIosCloseCircle  className="text-[18px] md:text-[22px] cursor-pointer" />
                  </div>
                  <img src={formData?.image} className="h-7 w-10 md:h-14 md:w-full border border-gray-400 shadow-xl rounded-lg" />
                </div>
             )} 
              {/* preview pdf */}
               {formData?.pdf && ( 
                <div className="relative bg-gray-300 rounded-lg h-10 w-10 md:h-14 md:w-14 lg:ml-4">
                  <div onClick={handleRemovePdf} className="bg-gray-200 absolute -top-2 -right-3 rounded-full">
                  <IoIosCloseCircle  className="text-[18px] md:text-[22px] cursor-pointer" />
                  </div>
                  <img src={pdfPreview} className="h-10 w-10  md:h-14 md:w-full border border-gray-400 shadow-xl rounded-lg" />
                </div>
             )} 
            </div>
         
            {theme === "light" ? (
           
              <button
                onClick={handleSubmit}
                className="my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[22px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]"
              >
                Post
              </button>
            ) : (
              <button onClick={handleSubmit} className="PostBtn">
                <p>Post</p>
              </button>
            )}
       
          </div>
          
          {isOpen && (
            <TechnicalRecommendationModal
              technicalRecommendations={formData.technicalRecommendations}
              isOpen={isOpen}
              closeModal={closeModal}
              updateTechnicalRecommendations={updateTechnicalRecommendations}
            />
          )}
          <TeamMemberModal
  isTeamOpen={isTeamOpen}
  closeTeamModal={closeTeamModal}
  updatedTeamMembers={updateTeamMember}
/>

        </div>
      </div>
    </div>
  );
};

export default Posts;