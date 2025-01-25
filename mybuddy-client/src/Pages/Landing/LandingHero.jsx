import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import heroFeed from '../../assets/home/hf.png';
import heroProject from '../../assets/home/hp.png';
import heroManage from '../../assets/home/hm.png';

const LandingHero = () => {
  const [openDashboard, setOpenDashboard] = useState(true);
  const [openFeed, setOpenFeed] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openManage, setOpenManage] = useState(false);

  const toggleDashboard = () => {
    setOpenDashboard(true);
    setOpenFeed(false);
    setOpenManage(false);
    setOpenProject(false);
  };
  const toggleFeed = () => {
    setOpenDashboard(false);
    setOpenFeed(true);
    setOpenManage(false);
    setOpenProject(false);
  };
  const toggleProject = () => {
    setOpenDashboard(false);
    setOpenFeed(false);
    setOpenManage(false);
    setOpenProject(true);
  };
  const toggleManage = () => {
    setOpenDashboard(false);
    setOpenFeed(false);
    setOpenManage(true);
    setOpenProject(false);
  };
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="flex flex-col justify-center items-center -space-y-16 lg:space-y-3 pt-5 md:pt-10 lg:pt-20 lg:pb-10">
        <h1 className="m-0 text-white text-3xl lg:text-5xl  relative text-inherit leading-[100px] capitalize font-bold">
          empower your
        </h1>
        <h1 className="m-0 text-white text-3xl lg:text-5xl  relative text-inherit leading-[100px] capitalize font-bold">
          research
        </h1>
        <h1 className="m-0 text-white text-3xl lg:text-5xl  relative text-inherit leading-[100px] capitalize font-bold">
          journey
        </h1>
      </div>
      <Link
        to={user ? "/feed" : "/login"}
        className=" px-5 py-2 cursor-pointer bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg [background:linear-gradient(-84.24deg,_#2c68ff,_#87a9ff)] flex flex-row items-center justify-center flex-wrap content-center"
      >
        <b className="relative text-white xl:text-xl capitalize font-nunito text-primary-contrast text-left">
          get started
        </b>
      </Link>
      <div className=" hidden  my-10 md:flex flex-col items-start justify-start pt-1 px-1 pb-[5px] box-border relative gap-2.5 max-w-full text-left text-lg text-lightslategray-200">
        <img
          className="rounded-lg w-full h-full absolute !m-[0] top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
          loading="lazy"
          alt=""
          src="/background@2x.png"
        />
        <div className=" flex flex-row items-center justify-start flex-wrap content-center space-x-0 max-w-full z-[1] ">
          <button
          onClick={toggleDashboard}
            className={` ${
              openDashboard
                ? "[background:linear-gradient(-84.24deg,_#cedcff,_#fff)]"
                : "bg-transparent"
            } cursor-pointer [border:none] py-[11px] px-3 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg  flex flex-row items-center justify-center`}
          >
            <div className="relative text-lg capitalize font-semibold font-nunito text-dimgray-100 text-left">
              Dashboard
            </div>
          </button>
          <button
          onClick={toggleFeed}
            className={` ${
              openFeed
                ? "[background:linear-gradient(-84.24deg,_#cedcff,_#fff)]"
                : "bg-transparent"
            } cursor-pointer [border:none] py-[11px] px-3 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg  flex flex-row items-center justify-center`}
          >
            <div className="relative text-lg capitalize font-semibold font-nunito text-dimgray-100 text-left">
              Feed
            </div>
          </button>
          <button
          onClick={toggleProject}
            className={` ${
              openProject
                ? "[background:linear-gradient(-84.24deg,_#cedcff,_#fff)]"
                : "bg-transparent"
            } cursor-pointer [border:none] py-[11px] px-3 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg  flex flex-row items-center justify-center`}
          >
            <div className="relative text-lg capitalize font-semibold font-nunito text-dimgray-100 text-left">
              Project
            </div>
          </button>
          <button
          onClick={toggleManage}
            className={` ${
              openManage
                ? "[background:linear-gradient(-84.24deg,_#cedcff,_#fff)]"
                : "bg-transparent"
            } cursor-pointer [border:none] py-[11px] px-3 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg  flex flex-row items-center justify-center`}
          >
            <div className="relative text-lg capitalize font-semibold font-nunito text-dimgray-100 text-left">
              Management
            </div>
          </button>
        </div>
      </div>
      <div className=" md:hidden  my-10 flex flex-col items-start justify-start pt-1 px-1 pb-[5px] box-border relative gap-2.5 max-w-full text-left text-lg text-lightslategray-200">
        <img
          className="rounded-lg w-full h-full absolute !m-[0] top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
          loading="lazy"
          alt=""
          src="/background@2x.png"
        />
         <div className=" flex flex-row items-center justify-start flex-wrap content-center space-x-0 max-w-full z-[1] ">
          <button onClick={toggleDashboard} className={` ${openDashboard? "[background:linear-gradient(-84.24deg,_#cedcff,_#fff)]": "bg-transparent"} cursor-pointer [border:none] p-2 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg  flex flex-row items-center justify-center`}>
          <img src='/ld.png' className="h-6"/>
          </button>
          <button onClick={toggleFeed} className={` ${openFeed? "[background:linear-gradient(-84.24deg,_#cedcff,_#fff)]": "bg-transparent"} cursor-pointer [border:none] p-2 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg  flex flex-row items-center justify-center`}>
          <img src='/lf.png' className="h-6"/>
          </button>
          <button onClick={toggleProject} className={` ${openProject? "[background:linear-gradient(-84.24deg,_#cedcff,_#fff)]": "bg-transparent"} cursor-pointer [border:none] p-2 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg  flex flex-row items-center justify-center`}>
          <img src='/lp.png' className="h-6"/>
          </button>
          <button onClick={toggleManage} className={` ${openManage? "[background:linear-gradient(-84.24deg,_#cedcff,_#fff)]": "bg-transparent"} cursor-pointer [border:none] p-2 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg  flex flex-row items-center justify-center`}>
          <img src='/lm.png' className="h-6"/>
          </button>
        </div>
      </div>

      {/* tab image */}

      <div className="mx-3  [backdrop-filter:blur(42px)] rounded-xl [background:linear-gradient(112.83deg,_rgba(255,_255,_255,_0.2),_rgba(255,_255,_255,_0.55))] border-primary-contrast border-[0.1px] border-solid flex flex-col items-start justify-start  p-3 ">
        <img
          className="h-[170px] md:h-[310px] lg:h-[530px] xl:h-[650px] 3xl:h-[750px] relative rounded-lg  overflow-hidden  object-cover"
          loading="lazy"
          alt=""
          src={openFeed ? heroFeed : openManage ? heroManage : openProject ? heroProject : "/1280-1@2x.png"}
        />
      </div>
    </div>
  );
};

export default LandingHero;
