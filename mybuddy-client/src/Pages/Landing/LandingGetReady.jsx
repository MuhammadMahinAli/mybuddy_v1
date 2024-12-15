const LandingGetReady = () => {
  return (
    <div>
      <section
        className={`my-10 flex flex-row items-start justify-center py-0 px-5 box-border max-w-full shrink-0 text-left text-27xl text-primary-contrast font-nunito `}
      >
        <div className="rounded-3xl relative flex flex-col items-start justify-start  p-5 box-border  ">
          <img
            className="rounded-3xl px-10 w-[calc(100%_-_20px)] h-[400px] absolute !m-[0] top-[10px] right-[10px] left-[10px] max-w-full overflow-hidden shrink-0 object-cover"
            alt=""
            src="/rectangle-67-1@2x.png"
          />
          <div className="rounded-3xl w-full lg:w-[1000px] flex flex-col justify-center items-center lg:justify-start flex-wrap  gap-5 p-20 z-[1]">
            <div className="flex flex-col  gap-4">
              <h1 className="m-0 text-white relative text-center lg:text-start text-3xl xl:text-4xl text-inherit capitalize font-bold ">
                ready to get started
              </h1>
              <div className="relative text-white capitalize font-medium text-sm text-center lg:text-start xl:text-lg">
                Elevate your productivity to the next level.
              </div>
            </div>
            <button className="cursor-pointer [border:none] py-2.5 px-[20px] w-52 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg [background:linear-gradient(-84.24deg,_#2c68ff,_#87a9ff)] flex flex-row items-center justify-center">
              <b className="relative text-xl text-white capitalize font-nunito text-primary-contrast text-left">
                get started
              </b>
            </button>

            <div className=" w-[281.2px] [backdrop-filter:blur(42px)] rounded-xl [background:linear-gradient(112.83deg,_rgba(255,_255,_255,_0.12),_rgba(255,_255,_255,_0.33))] border-primary-contrast border-[0.1px] border-solid box-border flex flex-col items-start justify-start pt-[13px] px-[15px] pb-3.5 text-base">
              <div className="flex flex-row items-center justify-start gap-2.5">
                <div className="shadow-[0px_-6px_20px_rgba(255,_255,_255,_0.4),_4px_4px_20px_rgba(111,_140,_176,_0.21)] rounded-6xs bg-primary-contrast flex flex-col items-start justify-start pt-[11px] pb-[11.8px] pl-[11px] pr-2.5">
                  <img
                    className="w-[25.3px] h-[24.2px] relative"
                    loading="lazy"
                    alt=""
                    src="/group-60.svg"
                  />
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[3px]">
                  <div className="relative capitalize font-medium">
                    download from app store
                  </div>
                  <div className="w-[195px] relative text-sm capitalize font-light inline-block">
                    download for IOS
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="hidden lg:block">
<img
              className=" absolute right-10 top-16 lg:h-[300px] xl:h-[370px]  overflow-hidden object-contain min-w-[313px]"
              loading="lazy"
              alt=""
              src="/frame-390@2x.png"
            />
</div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingGetReady;
