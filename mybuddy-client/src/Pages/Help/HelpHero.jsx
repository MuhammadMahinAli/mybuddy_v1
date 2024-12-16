import LandingNav from "../Landing/LandingNav";

const HelpHero = () => {
  return (
    <section
      className={` w-full pb-10 lg:pb-14 rounded-b-[50px] lg:rounded-b-[50px]  xl:rounded-b-[50px] flex flex-col items-center justify-center box-border bg-[url('/herosection.png')] bg-cover bg-no-repeat  `}
    >
        <LandingNav/>
      <div className="self-stretch flex flex-col items-center justify-start pt-14">
        <div className="">
          <div className="flex flex-col justify-center items-center -space-y-16 lg:space-y-3 pt-5 md:pt-10 lg:pt-20 lg:pb-10">
            <h1 className="m-0 text-white text-2xl lg:text-5xl  relative text-inherit leading-[100px] capitalize font-bold">
              hi buddy, how
            </h1>
            <h1 className="m-0 text-white text-2xl lg:text-5xl  relative text-inherit leading-[100px] capitalize font-bold">
              can we assist
            </h1>
            <h1 className="m-0 text-white text-2xl lg:text-5xl  relative text-inherit leading-[100px] capitalize font-bold">
              you today?
            </h1>
          </div>
          
              <div className="flex items-center pl-4 bg-[#b9d1e8] h-[40px] lg:h-[60px] rounded-lg w-[300px] md:w-[600px] lg:w-[800px] gap-2">
                <img
                  className="h-[20px] w-[20px] relative"
                  alt=""
                  src="/link-icon.svg"
                />
                <div className="text-white relative capitalize font-semibold text-xl">
                  search
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-7 gap-3 lg:gap-7 pt-14">
              <button className="cursor-pointer shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg [background:linear-gradient(-86.36deg,_#aec4fc,_#f1f5fe)] px-3 py-2 [backdrop-filter:blur(42px)]  border-white border-[0.1px] border-solid box-border flex flex-row items-center justify-center">
                <b className="text-gray-700 text-sm lg:text-lg relative capitalize font-semibold">
                  what’s new
                </b>
              </button>
              <div className="px-3 py-2 [backdrop-filter:blur(42px)] rounded-lg [background:linear-gradient(112.83deg,_rgba(255,_255,_255,_0.11),_rgba(255,_255,_255,_0.29))] border-white border-[0.1px] border-solid box-border flex flex-row items-center justify-center">
                <div className="text-white text-sm lg:text-lg relative capitalize font-semibold">
                  projects
                </div>
              </div>
              <div className="px-3 py-2 [backdrop-filter:blur(42px)] rounded-lg [background:linear-gradient(112.83deg,_rgba(255,_255,_255,_0.11),_rgba(255,_255,_255,_0.29))] border-white border-[0.1px] border-solid box-border flex flex-row items-center justify-center">
                <div className="text-white text-sm lg:text-lg relative capitalize font-semibold">
                  messaging
                </div>
              </div>
              <div className="px-3 py-2 [backdrop-filter:blur(42px)] rounded-lg [background:linear-gradient(112.83deg,_rgba(255,_255,_255,_0.11),_rgba(255,_255,_255,_0.29))] border-white border-[0.1px] border-solid box-border flex flex-row items-center justify-center">
                <div className="text-white text-sm lg:text-lg relative capitalize font-semibold">
                  collaboration
                </div>
              </div>
              <button className="px-3 py-2 [backdrop-filter:blur(42px)] rounded-lg [background:linear-gradient(112.83deg,_rgba(255,_255,_255,_0.11),_rgba(255,_255,_255,_0.29))] border-white border-[0.1px] border-solid box-border flex flex-row items-center justify-center">
                <div className="text-white text-sm lg:text-lg relative capitalize font-semibold">
                  funding options
                </div>
              </button>
              <div className="px-3 py-2 [backdrop-filter:blur(42px)] rounded-lg [background:linear-gradient(112.83deg,_rgba(255,_255,_255,_0.11),_rgba(255,_255,_255,_0.29))] border-white border-[0.1px] border-solid box-border flex flex-row items-center justify-center">
                <div className="text-white text-sm lg:text-lg relative capitalize font-semibold">
                  profiles
                </div>
              </div>
              <div className="px-3 py-2 [backdrop-filter:blur(42px)] rounded-lg [background:linear-gradient(112.83deg,_rgba(255,_255,_255,_0.11),_rgba(255,_255,_255,_0.29))] border-white border-[0.1px] border-solid box-border flex flex-row items-center justify-center">
                <div className="text-white text-sm lg:text-lg relative capitalize font-semibold">
                  tools
                </div>
              </div>
            </div>

      
      </div>
    </section>
  );
};

export default HelpHero;
