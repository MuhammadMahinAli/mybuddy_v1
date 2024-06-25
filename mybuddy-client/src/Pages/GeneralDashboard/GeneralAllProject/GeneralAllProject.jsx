import "../GeneralAddProject/editor.css";
import "react-quill/dist/quill.core.css";
import { useContext } from "react";
import { AuthContext } from "../../../Context/UserContext";

const GeneralAllProject = () => {
  const { getAllProjectByUser } = useContext(AuthContext);
  const projects = getAllProjectByUser?.data;
  console.log(projects);

  return (
    <div className="relative gray600">
      <h1 className=" text-[20px] lg:text-[28px] pb-5 font-bold">
        ALL PROJECTS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        {projects?.length > 0 ? (
          projects.map((p, i) => (
            <>
              <div
                key={i}
                className={`space-y-1 flex flex-col justify-start rounded-[25px] bg-skyblue shadow-[0px_4px_4px_rgba(255,_255,_255,_0.25),_-2px_-2px_20px_5px_rgba(255,_255,_255,_0.5),_-10px_-10px_55px_26px_rgba(255,_255,_255,_0.2),_17px_17px_38px_rgba(0,_0,_0,_0.31)] overflow-hidden`}
              >
                <div className="flex justify-center items-center h-[120px] md:h-[140px] xl:h-[180px] rounded-[25px] bg-[#DCE2EA] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25),_-5px_-5px_20px_rgba(255,_255,_255,_0.8)_inset,_5px_5px_20px_rgba(0,_0,_0,_0.2)]">
                  <img
                    src={p.images[0]}
                    className="h-[100px] md:h-[120px] xl:h-[160px] rounded-2xl"
                  />
                </div>

                <div className="p-1 xl:p-3  md:px-5 lg:py-3 space-y-1 lg:space-y-1">
                  <p className="text-xl font-semibold py-3">
                    {p.projectName.slice(0, 15)}...
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: p?.description.slice(0, 100),
                    }}
                  />
                  <p className="pb-2 text-[14px] lg:text-[15px] xl:text-xl">
                    {p.des}
                  </p>
                  <button
                    className={`${i}

               w-full my-3 px-6 py-1 md:px-8 md:py-2 text-[16px] md:text-xl text-white font-semibold shadow-[0px_10px_10px_rgba(46,213,115,0.15)] rounded-[15px] [background:linear-gradient(-84.24deg,#2adba4,#76ffd4)]`}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="w-full flex justify-center items-center pt-3">
                <img src="/more2.svg" className="h-20  top-32 " />
              </div>
            </>
          ))
        ) : (
          <p className=" text-[16px] lg:text-[24px] pb-5 font-medium text-center lg:text-start w-11/12 md:w-[600px] pt-7">{`You've not posted any project yet.`}</p>
        )}
      </div>
    </div>
  );
};

export default GeneralAllProject;
