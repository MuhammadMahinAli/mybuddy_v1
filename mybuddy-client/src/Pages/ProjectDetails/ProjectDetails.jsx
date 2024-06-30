import light from "../../assets/light1.png";
import man from "../../assets/dummy.png";
import man1 from "../../assets/people1.png";
import read from "../../assets/read.png";
import fund from "../../assets/fund2.png";
import readLess from "../../assets/readless.png";
import circle from "../../assets/circle.png";
import qr from "../../assets/qr.png";
import gdrive from "../../assets/gdrive.png";
import des from "../../assets/heroImg.png";
import doc from "../../assets/doc.png";
import pdf from "../../assets/pdf.png";
import ytube from "../../assets/youtube.png";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useGetAllProjectQuery } from "../../features/project/projectApi";
import { useSelector } from "react-redux";
import ImageSlider from "./ImageSlider";
import ProjectDescription from "./ProjectDescription";
import OpenPdf from "./OpenPdf";
import OpenDocx from "./OpenDocx";
import { Link } from "react-router-dom";
import TaskTable from "./TaskTable";
import { useCreateProjectJoinRequestMutation, useGetAllProjectByRequestedByQuery } from "../../features/projectJoinRequest/projectJoinRequestApi";
import Swal from "sweetalert2";

const ProjectDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const requestedId = user?._id
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [openDescription, setOpenDescription] = useState(false);
  const [showPdfList, setShowPdfList] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);


   //******** post project 
  const [createProjectJoinRequest, { data: responseData, error: responseError }] = useCreateProjectJoinRequestMutation();
  const {
    data: allProjects,
    isLoading: isFetchingProject,
    error,
  } = useGetAllProjectQuery();
  const projects = allProjects?.data;

   // ******* fetch request
  //  const {
  //   data: allRequest,
  //   isLoading: isFetchingRequest,
    
  // } = useGetAllProjectByRequestedByQuery(user?._id);

  const toggleDescription = () => {
    const duration = 100;
    setTimeout(() => {
      setOpenDescription(!openDescription);
    }, duration);
  };


  const handleSubmit = (project) => {
       const data = {
         projectId: project?._id,
         requestedBy: requestedId, 
         requestedTo: project?.user?._id, 
         status: "Pending",
         tasks: selectedTasks
       };  
       console.log("Data to be sent:", data);
        createProjectJoinRequest(data);
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
      // navigate("/dashboard/books");
      Swal.fire({
        icon: "success",
        title: "Hurry !",
        text: "Your request has been sent successfully !",
      });;
    }
  }, [responseData, responseError]);

  return (
    <div className="py-1">
      <div className="mx-3 md:mx-6 3xl:mx-20 my-5 p-3 xl:p-3 bg-[#d9e8f7] shadow-[-7px_-7px_19px_rgba(255,_255,_255,_0.6),_9px_9px_16px_rgba(163,_177,_198,_0.6)] box-border border-[0.8px] border-solid border-gray space-y-5 ">
        <>
          {projects?.map((project, i) => (
            <div key={i} className="border-b border-gray-400 pb-5">
              {/* projet name & join */}
              <div className="flex  items-center justify-between lg:items-center">
                <div className="flex items-center space-x-0">
                  <img className="h-14 xl:h-16" src={light} />
                  <p className="text-[14px] xl:text-[20px] font-semibold graish">
                    {project?.projectName}
                  </p>
                </div>
                <div onClick={()=>handleSubmit(project)}  className="flex justify-center items-center rectangle-box px-3 py-1">
                  <p className="text-[16px] xl:text-[20px] font-semibold graish pr-1">
                    Join
                  </p>
                  <FaPlus className="graish" />
                </div>
                
              </div>
              {/* profile */}
              <div className="flex justify-start items-start md:-space-x-3 w-48  xl:w-3/12 my-4 md:my-3 lg:my-2">
                <img
                  src="https://source.unsplash.com/150x150/?portrait?3"
                  alt=""
                  className="h-10 w-10 lg:w-8 lg:h-8 xl:w-16 xl:h-16 mx-auto rounded-full dark:bg-gray-500 aspect-square"
                />
                <div>
                  <p className="text-[16px] xl:text-[20px] font-semibold graish">
                    <span className=" pl-1 font-medium capitalize">
                      {" "}
                      {project?.user?.name?.firstName}{" "}
                      {project?.user?.name?.lastName}
                    </span>
                  </p>
                  <p className="text-[16px] xl:text-[20px] font-semibold graish">
                    <span className="font-medium pl-1">From : disneyland</span>
                  </p>
                </div>
              </div>
              {/* Task Table */}
              <TaskTable tasks={project?.tasks} handleSubmit={handleSubmit} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
              {/* read more icons */}
              <div className="mt-0 md:mx-8">
                <div className="flex justify-between items-center pt-3">
                  {/*left  */}
                  <div className="space-y-3">
                    <div className="flex items-center -space-x-2 md:space-x-3">
                      <img
                        onClick={toggleDescription}
                        className="h-10 xl:h-16"
                        src={openDescription ? readLess : read}
                      />
                      <img className="h-10 xl:h-16" src="/like.svg" />
                      <img className="h-10 xl:h-16" src={fund} />
                      <img className="h-10 xl:h-16" src="/share.svg" />
                    </div>
                  </div>
                  {/* right */}
                  <div className="space-y-3">
                    <div className="flex items-center md:space-x-3 ">
                      <img className="h-10 xl:h-16" src={circle} />
                      <img className="h-10 xl:h-20" src="/BLOCKCHAIN.svg" />
                      <img className="h-10 xl:h-24" src={qr} />
                    </div>
                  </div>
                </div>
              </div>
              {/* bor=ttom div */}
              {openDescription && (
                <div className="pb-7" >
                  <div className="relative flex justify-center lg:justify-start md: space-x-3 py-5 md:py-2 xl:py-2 xl:ml-8">
                    <img
                      onClick={() => setShowDocuments(!showDocuments)}
                      className="h-12 xl:h-20 cursor-pointer"
                      src={doc}
                    />
                    <img
                      onClick={() => setShowPdfList(!showPdfList)}
                      className="h-12 xl:h-20 cursor-pointer"
                      src={pdf}
                    />
                    <a href={project?.videoUrl} target="blank">
                      <img
                        className="h-12 xl:h-20"
                        src={
                          project?.videoUrl.includes("youtu.be") ? ytube : gdrive
                        }
                      />
                    </a>

                    <div className="absolute top-14 left-24 md:left-72 lg:left-10 xl:left-24 xl:top-20  z-40">
                      <OpenPdf
                        pdfFiles={project?.pdfFiles}
                        showPdfList={showPdfList}
                      />
                    </div>

                    <div className="absolute top-14 left-2 md:left-56 lg:left-0 xl:top-20  z-40">
                      <OpenDocx
                        documents={project?.documents}
                        showDocuments={showDocuments}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row space-y-3 justify-start items-center">
                    <div className="flex justify-center  w-full lg:w-5/12">
                      <div>
                        {/* <img
                          src={des}
                          className="h-40 md:h-48 lg:h-52 xl:h-[300px]"
                          alt="hero"
                        /> */}
                        <ImageSlider images={project?.images} />
                      </div>
                    </div>
                    <ProjectDescription description={project?.description} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </>
        
      </div>
    </div>
  );
};

export default ProjectDetails;

  // const checkIfRequestExists = (projectId, requestedBy) => {
  //   return allRequest?.data?.map(request => request.projectId === projectId && request.requestedBy === requestedBy);
  //  };

  //  const handleSubmit = (project) => {
  //   if (checkIfRequestExists(project._id,requestedId)) {
  //      alert("Request already sent");
  //   } else {
  //      const data = {
  //        projectId: project?._id,
  //        requestedBy: requestedId, 
  //        requestedTo: project?.user?._id, 
  //        status: "Pending",
  //        tasks: selectedTasks
  //      };
   
  //      console.log("Data to be sent:", data);
  //   }
  //  };
