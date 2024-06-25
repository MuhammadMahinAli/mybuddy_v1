import { useEffect } from "react";
import DynamicProjectSkillSection from "../../../common/DynamicSkillSecrion/DynamicProjectSkillSection";
import DynamicSkillSection from "../../../common/DynamicSkillSecrion/DynamicSkillSection";

const Skills = ({skillArray, theme,openComponent,i}) => {
  useEffect(() => {
    console.log("Rendering Image component at index:", i);
  }, [i]);
  return (
    <div className="flex justify-center items-center md:w-[500px] lg:w-[390px] xl:w-[500px] h-[140px] sm:h-[130px] md:h-[250px] xl:h-[280px]">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2   gap-5 py-6 px-5  xl:px-3 max-h-[140px] md:max-h-[250px] md:gap-x-6 xl:gap-6 overflow-y-auto ml-5 lg:ml-0 hide-scrollbar">
    <DynamicProjectSkillSection theme={theme} skillArray={skillArray}/>
    </div>
    </div>
  );
};

export default Skills;
