import { useSelector } from "react-redux";
import UserProfileActivityEM from "./UserProfileActivityEM";
import UserProfileExperienceEM from "./UserProfileExperienceEM";
import UserProfileLicenceEM from "./UserProfileLicenceEM";
import UserProfileProjectEM from "./UserProfileProjectEM";
import UserProfileSkillEM from "./UserProfileSkillEM";
import UserProfileSocialTabEM from "./UserProfileSocialTabEM";


const MobileTabFormetEM = () => {
    const theme = useSelector((state) => state.theme.theme);

    return (
        <div className="xl:hidden py-6 px-5 space-y-5">
            <UserProfileActivityEM theme={theme} />
           <UserProfileExperienceEM theme={theme} />
           <UserProfileLicenceEM theme={theme} /> 
            <UserProfileProjectEM theme={theme} />
            <UserProfileSkillEM theme={theme} />
            <UserProfileSocialTabEM theme={theme} /> 
        </div>
    );
};

export default MobileTabFormetEM;