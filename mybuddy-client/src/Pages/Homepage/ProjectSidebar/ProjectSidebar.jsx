/* eslint-disable react/prop-types */
import { useState } from "react";
import HoveredText from "../../../icons/HoveredText";
import DescrioptionIcon from "../../../icons/Project/DescrioptionIcon";
import TechnicalRecomIcon from "../../../icons/Project/TechnicalRecomIcon";
import TeamIcon from "../../../icons/Project/TeamIcon";

const ProjectSidebar = ({
  theme,
  teamMembers,
  technicalRecommendations,
  openComponent,
  toggleImage,
  toggleSkill,
  toggleTeam,
}) => {
  const [openImage, setOpenImage] = useState(false);
  const [openTechnicalRecommendation, setOpenTechnicalRecommendation] =
    useState(false);
  const [openTeam, setOpenTeam] = useState(false);

  return (
    <div className={`${theme === "light" ? "bg-white" : "bg-[#3a565b]"} z-50 `}>
      <ul
        className={`w-[35px] sm:w-[40px] md:w-[50px] lg:w-[50px] xl:w-[55px] 3xl:w-[55px]  ${
          theme === "light" ? "bg-white border" : "bg-[#3a565b]"
        } flex flex-col items-center justify-center py-4 sm:py-6 lg:py-10 shadow-2xl rounded-full space-y-3 sm:space-y-6 lg:space-y-7 absolute ${openComponent === "team" || openComponent === "skill" ? "top-[20%] sm:top-[1%]  md:top-[20%] lg:top-[10%] xl:top-[13%] 3xl:top-[12%]" : "top-[30%] sm:top-[25%]  md:top-[40%] lg:top-[30%] xl:top-[38%] 3xl:top-[35%]"}   left-0 z-50`}
      >
        
          <li className="relative">
          <div
            className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
            onMouseEnter={() => setOpenImage(true)}
            onMouseLeave={() => setOpenImage(false)}
          >
            <div
              onClick={toggleImage}
              className={`${
                openComponent === "image" || theme === "light"
                  ? ""
                  : "shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset]"
              }`}
            >
              <DescrioptionIcon
                theme={theme}
                openComponent={openComponent}
                openImage={openImage}
              />
            </div>
          </div>
          {openImage && (
            <div className="absolute left-9 top-0">
              <HoveredText text={"Image"} theme={theme} />
            </div>
          )}
        </li>
        
     
        {
          technicalRecommendations?.length > 0 && 
          <li className="relative">
          <div
            className="flex items-center justify-center cursor-pointer [border:none] box1 p-0 rounded-xl"
            onMouseEnter={() => setOpenTechnicalRecommendation(true)}
            onMouseLeave={() => setOpenTechnicalRecommendation(false)}
          >
            <div
              onClick={toggleSkill}
              className={`${
                openComponent === "skill" || theme === "light"
                  ? ""
                  : ""
              }`}
            >
              <TechnicalRecomIcon
                openComponent={openComponent}
                theme={theme}
                openTechnicalRecommendation={openTechnicalRecommendation}
              />
            </div>
          </div>
          {openTechnicalRecommendation && (
            <div className="absolute left-10 -top-3 z-50">
              <HoveredText text={"Technical Recommendation"} theme={theme} />
            </div>
          )}
        </li>
        }
            {teamMembers?.length > 0 &&
        <li className="relative">
          <div
            className="flex items-center justify-center cursor-pointer [border:none] p-0 box1 rounded-xl"
            onMouseEnter={() => setOpenTeam(true)}
            onMouseLeave={() => setOpenTeam(false)}
          >
              {/* onClick={toggleTeam} shadow-[1px_3px_24px_rgba(170,_170,_170,_0.45)_inset] */}
     
              <div
              onClick={toggleTeam}
                className={`${
                  openComponent === "team" || theme === "light"
                    ? ""
                    : ""
                }`}
              >
                <TeamIcon
                  theme={theme}
                  openComponent={openComponent}
                  openTeam={openTeam}
                />
              </div>
          
          </div>
          {openTeam && (
            <div className="absolute left-12 -top-4 z-50">
              <HoveredText text={"Team Member"} theme={theme} />
            </div>
          )}
        </li>}
      </ul>
    </div>
  );
};

export default ProjectSidebar;
