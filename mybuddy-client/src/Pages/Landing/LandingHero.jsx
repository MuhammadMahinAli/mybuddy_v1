const LandingHero = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <div className="flex flex-col justify-center items-center -space-y-16 lg:space-y-3  lg:pt-20 lg:pb-10">
        <h1 className="m-0 text-white text-2xl lg:text-5xl  relative text-inherit leading-[100px] capitalize font-bold">
          empower your
        </h1>
        <h1 className="m-0 text-white text-2xl lg:text-5xl  relative text-inherit leading-[100px] capitalize font-bold">
          research
        </h1>
        <h1 className="m-0 text-white text-2xl lg:text-5xl  relative text-inherit leading-[100px] capitalize font-bold">
          journey
        </h1>
      </div>
      <button className=" px-5 py-2 cursor-pointer bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg [background:linear-gradient(-84.24deg,_#2c68ff,_#87a9ff)] flex flex-row items-center justify-center flex-wrap content-center">
        <b className="relative text-white xl:text-xl capitalize font-nunito text-primary-contrast text-left">
          get started
        </b>
      </button>
      <div className=" hidden  my-10 md:flex flex-col items-start justify-start pt-1 px-1 pb-[5px] box-border relative gap-2.5 max-w-full text-left text-lg text-lightslategray-200">
        <img
          className="w-full h-full absolute !m-[0] top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
          loading="lazy"
          alt=""
          src="/background@2x.png"
        />
        <div className="self-stretch flex flex-row items-center justify-start flex-wrap content-center gap-[52px] max-w-full z-[1] mq750:gap-[26px]">
          <button className="cursor-pointer [border:none] py-[11px] px-3 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg [background:linear-gradient(-84.24deg,_#cedcff,_#fff)] flex flex-row items-center justify-center">
            <div className="relative text-lg capitalize font-semibold font-nunito text-dimgray-100 text-left">
              Dashboard
            </div>
          </button>
          <div className="flex-1 flex flex-row items-center justify-between py-0 pl-0 pr-2.5 box-border min-w-[214px] max-w-full gap-5 mq450:flex-wrap">
            <div className="relative capitalize font-semibold">Feed</div>
            <div className="relative capitalize font-semibold">Projects</div>
            <div className="relative capitalize font-semibold">Management</div>
          </div>
        </div>
      </div>

      {/* tab image */}

      <div className="xl:w-[1200px] [backdrop-filter:blur(42px)] rounded-xl [background:linear-gradient(112.83deg,_rgba(255,_255,_255,_0.2),_rgba(255,_255,_255,_0.55))] border-primary-contrast border-[0.1px] border-solid flex flex-col items-start justify-start pt-7 px-7 ">
        <img
          className=" relative rounded-lg  overflow-hidden  object-cover"
          loading="lazy"
          alt=""
          src="/1280-1@2x.png"
        />
      </div>
    </div>
  );
};

export default LandingHero;
