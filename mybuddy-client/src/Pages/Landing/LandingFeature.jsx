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
        <div className={`flex flex-col md:flex-row space-y-3 md:space-x-3`}>
          <div className="space-y-4 w-12/12 md:w-6/12">
          {/* card 1  grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-5 */}
          <div className={` rounded-xl bg-[#e9f2f9] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl">
                  effortless project management
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium ">
                  create , assign and track tasks with ease to ensure timely
                  project completion
                </div>
              </div>
              <img
                className="w-[200px] h-[200px] md:w-[180px] md:h-[130px] xl:w-[270px] xl:h-[210px] 3xl:w-[250px] 3xl:h-[200px] relative object-cover"
                loading="lazy"
                alt=""
                src="/f32.png"
              />
            </div>
          </div>
          {/* card 22 */}
          <div className={` rounded-xl bg-[#e9f2f9] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl">
                  real-time collaboration
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium ">
                  share updates, approve work and connect with our team
                  seamlessly
                </div>
              </div>
              <img
                className="w-[250px] h-[200px] md:w-[290px] md:h-[220px] xl:w-[300px] xl:h-[210px] 3xl:w-[400px] 3xl:h-[270px] relative object-cover"
                loading="lazy"
                alt=""
                src="/frame-290-1@2x.png"
              />
            </div>
          </div>

          {/* card 33 */}
          <div className={`  rounded-xl bg-[#e9f2f9] px-2 md:px-0 md:pt-9`}>
            <div className=" flex flex-col items-center justify-start gap-7">
              <div className="p-3 flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl">
                  fund your research
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium ">
                  receive donations or sell project share to secure the funding
                  you need
                </div>
              </div>
              <img
                className="ml-5 md:ml-20 lg:ml-10 xl:ml-16 3xl:ml-28 5xl:ml-40  rounded-tl-2xl rounded-br-2xl w-[350px] h-[290px] md:w-[250px] md:h-[220px] lg:w-[400px] lg:h-[330px] xl:h-[390px] xl:w-[470px] 5xl:w-[500px] relative object-cover "
                loading="lazy"
                alt=""
                src="/fe8.png"
              />
            </div>
          </div>

          {/* card 44 */}
          <div className={` rounded-xl bg-[#b1b6f0] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl">
                  connect with researchers
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium ">
                  expand your network by collaborating with top researchers
                  worldwide.
                </div>
              </div>
              <img
                className="w-[200px] h-[200px] md:w-[200px] md:h-[210px] lg:w-[250px] lg:h-[240px] xl:h-[230px] 3xl:w-[350px] 3xl:h-[360px] relative object-cover"
                loading="lazy"
                alt=""
                src="/fe1.png"
              />
            </div>
          </div>
          </div>

          <div className="space-y-3 w-12/12 md:w-6/12">

          {/* card 55 */}
          <div className={` rounded-xl bg-[#e9f2f9] px-3 md:px-0`}>
            <div className=" flex flex-col items-center xl:items-start  justify-start gap-7">
              <div className="p-3 3xl:p-5 flex flex-col items-start justify-start ">
                <div className=" relative text-gray-800 capitalize font-black text-xl">
                  schedule meetings
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium ">
                  plan your research discussions without the hassle of multiple
                </div>
              </div>
              <img
                className="mr-5 xs:mr-16 md:mr-24 lg:mr-28 xl:mr-36 3xl:mr-48 rounded-bl-2xl rounded-tr-2xl w-[260px] h-[250px] md:w-[235px] md:h-[250px] lg:w-[328px] lg:h-[350px] xl:w-[380px] xl:h-[370px]  3xl:h-[390px]  relative object-cover"
                loading="lazy"
                alt=""
                src="/frame-301-1@2x.png"
              />
            </div>
          </div>
          {/* card 66 */}
          <div className={` rounded-xl bg-[#b1b6f0] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl">
                  all your tools in one place
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium ">
                  easily access and manage essential tools like canva, blender,
                  discord and more, all from your dashboard.
                </div>
              </div>
              <img
                className="w-[200px] h-[200px] md:w-[250px] md:h-[180px] lg:w-[300px] 3xl:w-[450px] 3xl:h-[270px] relative object-cover"
                loading="lazy"
                alt=""
                src="/fe5.png"
              />
            </div>
          </div>
          {/* card 77 */}
          <div className={` rounded-xl bg-[#e9f2f9] p-5 md:py-9`}>
            <div className=" flex flex-col items-center justify-start gap-7">
              <div className=" flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl">
                  ensure project authenticity with block-chain
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium ">
                  validate and secure your research projects using block-chain
                  security. guarantee trust and prevent fraud with verified
                  project records.
                </div>
              </div>
              <img
                className="w-[200px] h-[200px] md:w-[220px] md:h-[170px] lg:w-[310px] xl:w-[390px] xl:h-[240px]  3xl:w-[280px] 3xl:h-[220px] relative object-cover"
                loading="lazy"
                alt=""
                src="/fe6.png"
              />
            </div>
          </div>

          {/* card 88 */}
          <div className={` rounded-xl bg-[#e9f2f9] px-3 md:px-0 md:py-0`}>
            <div className=" flex flex-col items-center justify-start gap-7">
              <div className="p-3 flex flex-col items-start justify-start gap-[13px]">
                <div className=" relative text-gray-800 capitalize font-black text-xl">
                  transparent team performance
                </div>
                <div className="relative text-gray-700 leading-[27px] capitalize font-medium ">
                  download individual or team commit histories to ensure full
                  transparency and track progress effectively.
                </div>
              </div>
              <img
                className="ml-5 xs:ml-16 md:ml-16 lg:ml-20 w-[270px] h-[200px] md:w-[260px] md:h-[200px] lg:h-[270px] lg:w-[360px] xl:h-[350px] xl:w-[465px] 3xl:h-[370px] 3xl:w-[500px] relative object-cover"
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
