import { useSelector } from "react-redux";
import UserProfileActivityVM from "./UserProfileActivityVM";
import UserProfileExperienceVM from "./UserProfileExperienceVM";
import UserProfileLicenceVM from "./UserProfileLicenceVM";
import UserProfileProjectVM from "./UserProfileProjectVM";
import UserProfileSkillVM from "./UserProfileSkillVM";
import UserProfileSocialTabVM from "./UserProfileSocialTabVM";

const MobileTabFormetVM = ({
  allExperience,
  allLicense,
  allPost,
  allProject,
  allSkill,
  allSocialInfo,

}) => {
  const theme = useSelector((state) => state.theme.theme);
  //const skillArray = ["react", "tailwind", "html", "kubernetes"];
  return (
    <div className="xl:hidden py-6 px-5 space-y-5">
      <UserProfileActivityVM allPost={allPost} theme={theme} />
      <UserProfileExperienceVM allExperience={allExperience} theme={theme} />
      <UserProfileLicenceVM allLicense={allLicense} theme={theme} />
      <UserProfileProjectVM allProject={allProject} theme={theme} />
      <UserProfileSkillVM allSkill={allSkill} theme={theme} />
      <UserProfileSocialTabVM allSocialInfo={allSocialInfo} theme={theme} />
    </div>
  );
};

export default MobileTabFormetVM;
