const LandingFeature = () => {
  return (
    <div>
      <div
        className={`bg-gradient-to-b from-[#a9c6dc] px-3 md:px-10 lg:px-14 xl:px-24 3xl:px-32 pb-10`}
      >
        <div
          className={` py-7 px-10 md:py-14 md:px-20  space-y-3 xl:space-y-9`}
        >
          <h1 className="m-0 text-center text-gray-700  text-xl md:text-4xl xl:text-5xl capitalize font-bold ">
            Powerful Collaboration for Researchers
          </h1>

          <div className="lg:px-48 text-center text-gray-700 xl:leading-[50px]  text-sm md:text-xl xl:text-3xl  relative capitalize ">
            Manage your projects, connect with collaborators, and bring ideas to
            life all in one place.
          </div>
        </div>
        <div className={`flex flex-col lg:flex-row space-y-3 lg:space-x-3 xl:space-y-0`}>
          <div className="space-y-4  w-12/12 lg:w-6/12 sm:mx-10 md:mx-20 lg:mx-0">
          {/* card 1  grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-5 */}
          <div className={` rounded-xl bg-[#e9f2f9] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-3 sm:gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl xl:text-2xl">
                  effortless project management
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium 3xl:text-lg ">
                  create , assign and track tasks with ease to ensure timely
                  project completion
                </div>
              </div>
              <img
                className="w-[px] h-[170px] xs:h-[242px] xs:w-[300px] sm:w-[250px] sm:h-[200px] lg:h-[200px] xl:w-[270px] xl:h-[220px] 3xl:h-[220px]  relative object-cover"
                loading="lazy"
                alt=""
                src="/f32.png"
              />
            </div>
          </div>
          {/* card 22 */}
      
          <div className={`  rounded-xl bg-[#e9f2f9] px-2 md:px-0 md:pt-9`}>
            <div className=" flex flex-col items-center justify-start gap-3 sm:gap-7">
              <div className="p-3 flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl xl:text-2xl">
                  fund your research
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium 3xl:text-lg ">
                  receive donations or sell project share to secure the funding
                  you need
                </div>
              </div>
              <img
                className="ml-[17px] xs:ml-5 sm:ml-20 lg:ml-10 xl:ml-16 3xl:ml-28 5xl:ml-40  rounded-tl-2xl rounded-br-2xl xs:w-[350px] xs:h-[290px] sm:w-[450px] sm:h-[420px] lg:w-[400px] lg:h-[330px] xl:h-[490px] xl:w-[470px] relative object-cover "
                loading="lazy"
                alt=""
                src="/fe8.png"
              />
            </div>
          </div>
          {/* card 33 */}
        
          <div className={` rounded-xl bg-[#e9f2f9] px-3 md:px-0`}>
            <div className=" flex flex-col items-center xl:items-start  justify-start gap-3 sm:gap-7">
              <div className="p-3 3xl:p-5 flex flex-col items-start justify-start ">
                <div className=" relative text-gray-800 capitalize font-black text-xl xl:text-2xl">
                  schedule meetings
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium 3xl:text-lg ">
                  plan your research discussions without the hassle of multiple
                </div>
              </div>
              <img
                className="mr-10 xs:mr-16 sm:mr-24 lg:mr-12 xl:mr-36 3xl:mr-48 rounded-bl-2xl rounded-tr-2xl w-[260px] h-[250px] xs:h-[290px] xs:w-[290px] sm:w-[440px] sm:h-[400px] lg:w-[400px] lg:h-[380px] xl:w-[480px] xl:h-[450px]  3xl:h-[480px] 3xl:w-[500px]  relative object-cover"
                loading="lazy"
                alt=""
                src="/frame-301-1@2x.png"
              />
            </div>
          </div>
        
          {/* card 44 */}
         
          <div className={` rounded-xl bg-[#cbe1f2] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-3 sm:gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl xl:text-2xl">
                  ensure project authenticity with block-chain
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium 3xl:text-lg ">
                  validate and secure your research projects using block-chain
                  security. guarantee trust and prevent fraud with verified
                  project records.
                </div>
              </div>
              <img
                className="w-[210px] h-[130px] xs:h-[190px] xs:w-[310px] sm:w-[320px] sm:h-[300px] md:w-[475px] lg:w-[360px] lg:h-[230px] xl:w-[470px] xl:p-5 3xl:p-7 xl:h-[310px] 3xl:h-[340px] 3xl:w-[550px]  relative object-cover"
                loading="lazy"
                alt=""
                src="/fe6.png"
              />
            </div>
          </div>
          </div>

          <div className="space-y-3 w-12/12 lg:w-6/12 md:mx-20 lg:mx-0">

          {/* card 55 */}
         
          <div className={` rounded-xl bg-[#e9f2f9] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-3 sm:gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl xl:text-2xl">
                  real-time collaboration
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium 3xl:text-lg ">
                  share updates, approve work and connect with our team
                  seamlessly
                </div>
              </div>
              <img
                className="xs:w-[250px] xs:h-[200px] sm:w-[300px] sm:h-[230px]  xl:w-[300px] xl:h-[250px] 3xl:h-[290px] 3xl:w-[370px] relative object-cover"
                loading="lazy"
                alt=""
                src="/frame-290-1@2x.png"
              />
            </div>
          </div>
          {/* card 66 */}
        
          <div className={` rounded-xl bg-[#b1b6f0] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-3 sm:gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl xl:text-2xl">
                  connect with researchers
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium 3xl:text-lg ">
                  expand your network by collaborating with top researchers
                  worldwide.
                </div>
              </div>
              <img
                className="w-[230px] h-[230px] xs:h-[300px] xs:w-[300px] sm:w-[340px] sm:h-[310px] lg:w-[290px] lg:h-[320px] xl:w-[490px] xl:h-[510px]  relative object-cover"
                loading="lazy"
                alt=""
                src="/fe1.png"
              />
            </div>
          </div>
          {/* card 77 */}
          <div className={` rounded-xl bg-[#b1b6f0] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-3 sm:gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl xl:text-2xl">
                  all your tools in one place
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium 3xl:text-lg ">
                  easily access and manage essential tools like canva, blender,
                  discord and more, all from your dashboard.
                </div>
              </div>
              <img
                className="w-[290px] h-[230px] xs:h-[280px] xs:w-[300px] sm:w-[490px] sm:h-[300px] lg:w-[370px] lg:h-[320px] xl:h-[370px] xl:w-[440px] relative object-cover"
                loading="lazy"
                alt=""
                src="/fe5.png"
              />
            </div>
          </div>

          {/* card 88 */}
          <div className={` rounded-xl bg-[#cbe1f2] px-3 md:px-0 md:py-0`}>
            <div className=" flex flex-col items-center justify-start gap-3 sm:gap-7">
              <div className="p-3 flex flex-col items-start justify-start gap-[13px]">
                <div className="pt-4 relative text-gray-800 capitalize font-black text-xl xl:text-2xl">
                  transparent team performance
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium 3xl:text-lg ">
                  download individual or team commit histories to ensure full
                  transparency and track progress effectively.
                </div>
              </div>
              <img
                className="rounded-tl-2xl rounded-br-2xl ml-5 xs:ml-8 md:ml-16 lg:ml-14 w-[270px] h-[200px] xs:h-[px] xs:w-[320px] sm:w-[549px] sm:h-[335px] md:w-[460px] md:h-[310px] lg:h-[288px] lg:w-[400px] xl:h-[360px] xl:w-[480px] 3xl:h-[360px] 3xl:w-[530px] relative object-cover"
                loading="lazy"
                alt=""
                src="/frame-309-1@2x.png"
              />
            </div>
          </div>
        </div>
        </div>

        
      </div>
    </div>
  );
};

export default LandingFeature;
