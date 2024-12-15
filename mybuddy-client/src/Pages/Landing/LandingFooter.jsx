

const LandingFooter = () => {
    return (
        <div>
                 <>
        <div className="self-stretch h-[650px] flex flex-col items-start justify-start pt-0 px-0 pb-[415px] box-border gap-[259px]">
          <div className="self-stretch flex flex-col items-center justify-start gap-5 shrink-0 max-w-full">
            <div className="self-stretch flex flex-col items-center justify-start gap-2 shrink-0">
              <h1 className="m-0 self-stretch relative text-inherit capitalize font-bold font-[inherit] mq450:text-4xl mq1050:text-11xl">
                subscribe us
              </h1>
              <div className="relative text-base capitalize text-dimgray-100 inline-block min-h-[66px]">
                <p className="m-0">
                  Elevate Your Research Productivity To The Next Level. Manage
                  Your Projects, Collaborate With Experts, And Stay Organized
                  From Anywhere — At Your Desk Or On The Go.
                </p>
              </div>
            </div>
            <div className="w-[705px] [backdrop-filter:blur(42px)] rounded-31xl bg-white rounded-full border-primary-contrast border-[0.5px] border-solid box-border flex flex-col items-end justify-start max-w-full">
              <button className="rounded-full cursor-pointer [border:none] pt-[15px] px-[23px] pb-4 bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-31xl [background:linear-gradient(-84.24deg,_#2c68ff,_#87a9ff)] flex flex-col items-start justify-start">
                <div className="flex flex-row items-center justify-start gap-4">
                  <b className="text-white relative text-lg capitalize font-nunito text-primary-contrast text-left">
                    subscribe now
                  </b>
                  <img
                    className="h-3  w-6 relative object-contain"
                    alt=""
                    src="/vector-6.svg"
                  />
                </div>
              </button>
            </div>
          </div>
          <div className="pt-6 self-stretch flex flex-row items-center justify-between shrink-0 gap-5 text-left text-sm text-gray-1400 lg:flex-wrap">
            <div className="w-[257px] flex flex-col items-start justify-start text-4xl text-gray-900">
              <div className="flex flex-row items-center justify-start">
                <img
                  className="h-[55.2px] w-[55.2px] relative object-cover"
                  loading="lazy"
                  alt=""
                  src="/image-2@2x.png"
                />
                <b className="relative capitalize text-xl">
                  research buddy
                </b>
              </div>
              <div className="relative text-base capitalize text-dimgray-300">
                Empowering Researchers To Achieve More. Simplify Research
                Collaboration, Manage Tools, And Unlock Your Full Potential.
                Join Us Today To Revolutionize The Way You Conduct Research.
              </div>
            </div>
            <div className="w-[118px] flex flex-col items-start justify-start py-0 pl-0 pr-0.5 box-border gap-2.5">
              <b className="relative text-mid capitalize text-dimgray-200">
                Important Links
              </b>
              <a className="[text-decoration:none] self-stretch relative capitalize text-[inherit]">
                home
              </a>
              <a className="[text-decoration:none] self-stretch relative capitalize text-[inherit]">
                Project
              </a>
              <a className="[text-decoration:none] self-stretch relative capitalize text-[inherit]">
                Help
              </a>
              <div className="self-stretch relative capitalize">Contact</div>
            </div>
            <div className="w-[118px] flex flex-col items-start justify-start py-0 pl-0 pr-0.5 box-border gap-[9px]">
              <b className="self-stretch relative text-mid capitalize text-dimgray-200">
                community
              </b>
              <a className="[text-decoration:none] self-stretch relative capitalize text-[inherit]">
                news feed
              </a>
              <div className="self-stretch relative capitalize">profile</div>
              <a className="[text-decoration:none] self-stretch relative capitalize text-[inherit]">
                dashboard
              </a>
              <div className="self-stretch relative capitalize">friends</div>
            </div>
            <div className="w-[118px] flex flex-col items-start justify-start py-0 pl-0 pr-0.5 box-border gap-[9px]">
              <b className="self-stretch relative text-mid capitalize text-dimgray-200">
                followers
              </b>
              <a className="[text-decoration:none] self-stretch relative capitalize text-[inherit]">
                Facebook
              </a>
              <a className="[text-decoration:none] self-stretch relative capitalize text-[inherit]">
                twitter
              </a>
              <a className="[text-decoration:none] self-stretch relative capitalize text-[inherit]">
                Linkedin
              </a>
              <a className="[text-decoration:none] self-stretch relative capitalize text-[inherit]">
                YouTube
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center py-10 text-center text-sm text-dimgray-100 mq450:pl-5 mq450:pr-5 mq450:box-border mq1050:pl-32 mq1050:pr-[132px] mq1050:box-border">
          <div className="relative capitalize pt-7">
            Copy© research buddy 2021. All Rights Reserved
          </div>
        </div>
        </>
        </div>
    );
};

export default LandingFooter;