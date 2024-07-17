/* eslint-disable react/prop-types */
import UserProfileProjectVM from "./UserProfileProjectVM";
import UserProfileSocialTabVM from "./UserProfileSocialTabVM";
import UserProfileSkillVM from "./UserProfileSkillVM";
import UserProfileActivityVM from "./UserProfileActivityVM";
import UserProfileExperienceVM from "./UserProfileExperienceVM";
import UserProfileLicenceVM from "./UserProfileLicenceVM";
import { useSelector } from "react-redux";

const DekstopFormatVM = ({
  allExperience,
  allLicense,
  allPost,
  allProject,
  allSkill,
  allSocialInfo,
}) => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`${
        theme === "light" ? "graish" : "text-white"
      } xl:flex justify-between items-start py-7 px-20 hidden `}
    >
      {/* left */}
      <div className="w-4/12 lg:mr-8 space-y-7">
        <div
          className={`${
            theme !== "light" &&
            "p-[1px] bg-gradient-to-r from-[#4EEBFF] from-10% via-[#AA62F9] via-30% to-[#F857FF] to-90%  rounded-2xl "
          }`}
        >
          <div
            className={`${
              theme === "light"
                ? "bg-white"
                : "bg-[url('/gradient-background1.png')] bg-no-repeat bg-cover 3xl:ml-[1px]"
            }  rounded-2xl   space-y-4 p-3 md:p-5`}
          >
            {/* Experience */}
            <UserProfileExperienceVM
              allExperience={allExperience}
              theme={theme}
            />
            {/* lisecnce */}
            <UserProfileLicenceVM allLicense={allLicense} theme={theme} />
          </div>
        </div>
        <UserProfileSocialTabVM allSocialInfo={allSocialInfo} theme={theme} />
      </div>

      {/* right */}
      <div className=" xl:w-9/12 3xl:w-10/12 space-y-7">
        {/* activities */}
        <UserProfileActivityVM allPost={allPost} theme={theme} />
        {/* projects */}
        <UserProfileProjectVM allProject={allProject} theme={theme} />
        <UserProfileSkillVM allSkill={allSkill} theme={theme} />

        {/* </div> */}
      </div>
    </div>
  );
};

export default DekstopFormatVM;
