import { useEffect, useState } from "react";
import AddProjectFirstForm from "./AddProjectFirstForm";
import AddProjectSecForm from "./AddProjectSecForm";
import AddProjectThirdForm from "./AddProjectThirdForm";
import PropTypes from "prop-types";
import { useCreateNewProjectMutation } from "../../../features/project/projectApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const GeneralAddProject = ({ closeModal }) => {
  const { user } = useSelector((state) => state.auth);
  const [createNewProject, { data: responseData, error: responseError }] =
    useCreateNewProjectMutation();
  const [openFirstForm, setOpenFirstForm] = useState(true);
  const [openSecondForm, setOpenSecondForm] = useState(false);
  const [openThirdForm, setOpenThirdForm] = useState(false);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [tasks, setTasks] = useState([]);


  const handleFirst = () => {
    setOpenFirstForm(false);
    setOpenSecondForm(true);
    setOpenThirdForm(false);
  };
  const handleSecond = () => {
    setOpenFirstForm(false);
    setOpenSecondForm(false);
    setOpenThirdForm(true);
  };
  const handleThird = () => {
    setOpenFirstForm(true);
    setOpenSecondForm(false);
    setOpenThirdForm(false);
  };
  const [projectData, setProjectData] = useState({
    projectName: "",
    discord: "",
    whatsApp: "",
    startDate:"",
    endDate: "",
    category: "",
    description: "",
    videoUrl: "",
  });
  console.log(projectData);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectData.projectName) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget To Write Project Name.",
      });
      return;
    }
    if (!projectData.description) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget To Write Description",
      });
      return;
    }
    if (!projectData.whatsApp) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget To Write WhatsApp Number.",
      });
      return;
    }
    if (!projectData.discord) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget To Write Discord Server Link",
      });
      return;
    }
    if (!projectData.endDate) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "I Think, You Forget To Write Deadline of the project.",
      });
      return;
    }
    if (pdfFiles?.length === 0 && documents?.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "Please upload at least one PDF or DOCX file.",
      });
      return;
    }
    if (pdfFiles?.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops !",
        text: "Please upload at least one Image.",
      });
      return;
    }
    const data = {
      user: user._id,
      ...projectData,
      images,
      documents,
      pdfFiles,
      tasks,
    };
    console.log(data);
    createNewProject(data);
  };

  console.log(responseData, responseError?.data);
  useEffect(() => {
    if (!responseData?.status) {
      // alert(responseData?.message);
    }
    if (responseError?.data) {
      // alert(responseError.data);
    }
    if (responseData?.success && responseData?.data) {
      console.log(responseData);
      // navigate("/dashboard/books");
      Swal.fire({
        icon: "success",
        title: "Hurry !",
        text: "Project created successfully !",
      });
      closeModal();
    }
    if (responseError) {
      Swal.fire({
        icon: "error",
        title: "Oops !",
        text: "Something went wrong , try again later !",
      });
    }
  }, [responseData, responseError]);

  const goBack = () => {
    if (openThirdForm) {
      setOpenFirstForm(false);
      setOpenThirdForm(false);
      setOpenSecondForm(true);
    }
    if (openSecondForm) {
      setOpenFirstForm(true);
      setOpenThirdForm(false);
      setOpenSecondForm(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center pb-5">
        <h1 className="gray600 text-[20px] lg:text-[28px]  font-bold">
          {openFirstForm && "CREATE PROJECT"}
          {openThirdForm && "TASK"}
        </h1>
        <div className="flex space-x-2 justify-center items-center">
          {openFirstForm || (
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-3 md:px-4 py-2 text-sm md:text-lg  font-semibold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={goBack}
            >
              Go back
            </button>
          )}
          <button
            onClick={closeModal}
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-3 md:px-4 py-2 text-sm md:text-lg  font-semibold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>

      <div className="w-full pt-2 lg:py-4 bg-[#e9f2f9] flex my-5 justify-center items-center shadow-[-2px_-3px_6px_1px_rgba(255,_255,_255,_0.9),_4px_4px_6px_rgba(182,_182,_182,_0.6)] backdrop-filter:blur(20px); rounded-xl">
        <form onSubmit={handleSubmit} className="md:w-11/12">
          {/* 1st form */}
          {openFirstForm && (
            <AddProjectFirstForm
              handleFirst={handleFirst}
              onFormChange={handleFormChange}
              projectData={projectData}
              setProjectData={setProjectData}
          
            />
          )}
          {/* 2nd form */}
          {openSecondForm && (
            <AddProjectSecForm
              handleSecond={handleSecond}
              images={images}
              setImages={setImages}
              setDocuments={setDocuments}
              documents={documents}
              pdfFiles={pdfFiles}
              setPdfFiles={setPdfFiles}
              onFormChange={handleFormChange}
            />
          )}
          {/* 3rd form */}
          {openThirdForm && (
            <AddProjectThirdForm
              handleThird={handleThird}
              tasks={tasks}
              setTasks={setTasks}
            />
          )}
          {openThirdForm && (
            <button className="float-right">
              <button className="my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[10px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]">
                Post
              </button>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default GeneralAddProject;
GeneralAddProject.propTypes = {
  closeModal: PropTypes.func,
};
