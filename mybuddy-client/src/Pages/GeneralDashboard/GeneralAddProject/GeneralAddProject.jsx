import { useEffect, useState } from "react";
import AddProjectFirstForm from "./AddProjectFirstForm";
import AddProjectSecForm from "./AddProjectSecForm";
import AddProjectThirdForm from "./AddProjectThirdForm";
import PropTypes from "prop-types";
import post from "../../../assets/post.png";
import{ useCreateNewProjectMutation} from '../../../features/project/projectApi'
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


const GeneralAddProject = ({ closeModal }) => {
  const { user } = useSelector((state) => state.auth);
  const [createNewProject, { data: responseData, error: responseError }] = useCreateNewProjectMutation()
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
    discord:"",
    whatsApp:"",
    startDate:"",
    endDate:"",
    category:"",
    description: "",
    videoUrl: "",
  });

  const handleFormChange = (e) => {
    const {name, value} = e.target;
    setProjectData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { user:user._id,...projectData, images, documents, pdfFiles, tasks};
    console.log(data);
     createNewProject(data);
  };
  console.log(responseData,responseError?.data);
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
    }
  }, [responseData, responseError]);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="gray600 text-[20px] lg:text-[28px] pb-5 font-bold">
          CREATE PROJECT
        </h1>

        <button
          onClick={closeModal}
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-3 md:px-4 py-2 text-sm md:text-lg  font-semibold text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Close
        </button>
      </div>

      <div className="w-full pt-2 lg:py-4 bg-[#9ec9e2] flex my-5 justify-center items-center  shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] backdrop-filter:blur(20px); rounded-xl">
        <form onSubmit={handleSubmit} className="md:w-11/12">
          {/* 1st form */}
          {openFirstForm && <AddProjectFirstForm handleFirst={handleFirst} onFormChange={handleFormChange} projectData={projectData} setProjectData={setProjectData} />}
          {/* 2nd form */}
          {openSecondForm && <AddProjectSecForm handleSecond={handleSecond} images={images} setImages={setImages} setDocuments={setDocuments} documents={documents} pdfFiles={pdfFiles} setPdfFiles={setPdfFiles} onFormChange={handleFormChange} />}
          {/* 3rd form */}
          {openThirdForm && <AddProjectThirdForm handleThird={handleThird} tasks={tasks} setTasks={setTasks} />}
       {
        openThirdForm &&
        <button className="float-right">
        <img src={post} className="h-12 lg:h-16" />
      </button>
       }
        </form>
      </div>
    </div>
  );
};

export default GeneralAddProject;
GeneralAddProject.propTypes = {
  closeModal: PropTypes.func,
};
