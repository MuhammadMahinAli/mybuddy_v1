import LandingFooter from "../Landing/LandingFooter";
import HelpHero from "./HelpHero";
import HelpMore from "./HelpMore";
import HelpPopular from "./HelpPopular";

const Help = () => {
  return (
    <div className="bg-[#d0e3ec]">
      <div className="w-full relative bg-[#d0e3ec]  overflow-hidden flex flex-row items-start justify-start leading-[normal] tracking-[normal]">
        <HelpHero />
      </div>
      <HelpPopular />
      <HelpMore />
      <div className="absolute ">
        <LandingFooter />
      </div>
    </div>
  );
};

export default Help;
