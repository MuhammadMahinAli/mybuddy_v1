import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const HelpPopular = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupIndex, setOpenPopupIndex] = useState(null);

  const t = (feature) => {
    setOpenPopup(true);
    setOpenPopupIndex(feature);
  };
  const features = [
    {
      image: "./f1.png",
      title: "unified tools integration",
      description:
        "Access and manage tools like Canva, Blender, and Google Docs from one dashboard.",
    },
    {
      image: "./f2.png",
      title: "profile setup",
      description:
        "customize your profile to represent your expertise and interests. ",
    },
    {
      image: "./f3.png",
      title: "posting & feed",
      description:
        "share your updates and collaborate with others via posts and feeds.",
    },
    {
      image: "./f4.png",
      title: "researcher network",
      description:
        "connect with experts and collaborate on innovative projects.",
    },
    {
      image: "./f5.png",
      title: "project creation & management",
      description:
        "manage your projects seamlessly from creation to completion.",
    },
    {
      image: "./f6.png",
      title: "task commitments",
      description: "organize tasks and track commitments effectively.",
    },
    {
      image: "./f7.png",
      title: "funding projects",
      description:
        "get donations or attract stakeholders to fund your research.",
    },
    {
      image: "./f8.png",
      title: "meetings & attendance",
      description: "schedule and track meetings effortlessly with your team.",
    },
    {
      image: "./f9.png",
      title: "appearance setting",
      description:
        "customize your work pace with dark mode and light mode option.",
    },
  ];
  return (
    <>
      <div className={` py-7 px-10 md:py-14 md:px-20  space-y-3 xl:space-y-5`}>
        <h1 className="m-0 text-center text-gray-700  text-xl md:text-3xl xl:text-4xl capitalize font-bold ">
          Popular Features to Explore
        </h1>

        <div className="lg:px-48 text-center text-gray-700 xl:leading-[50px]  text-sm md:text-xl xl:text-xl  relative capitalize ">
          Find the tools and features to boost your research productivity.
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-7 px-5 lg:px-10">
        {features.map((feature) => (
          <div key={feature?.title} className="">
            <div
            onClick={() => t(feature)}
              className={`relative h-[200px] flex flex-col items-start justify-start border py-2 px-4 space-y-3 rounded-xl bg-[#e9f2f9]`}
            >
              <img
                className="h-[90px] w-[90px] absolute -left-2 -top-2"
                loading="lazy"
                alt=""
                src={feature.image}
              />

              <div className="flex flex-col items-start justify-start pt-14 md:pt-16">
                <b className="relative capitalize z-[1] text-lg">
                  {feature.title}
                </b>
                <div className="relative text-sm leading-[27px] capitalize text-slategray z-[1] mq450:text-mid mq450:leading-[22px]">
                  {feature.description}
                </div>
              
              </div>
            </div>
          </div>
        ))}
      </div>
      {openPopupIndex?.title && openPopup && (
        <div className=" z-50 fixed top-0 left-0  flex justify-center items-center bg-black/45 bg-opacity-50 w-screen h-screen overflow-y-scroll">
          <div
            className={`relative py-20 w-[300px] md:w-[500px] flex flex-col items-start justify-start border py-2 px-4 space-y-3 rounded-xl bg-[#e9f2f9]`}
          >
            <IoIosCloseCircleOutline
              onClick={() => setOpenPopupIndex(null)}
              className="text-xl absolute right-3 top-3"
            />
            <img
              className="h-[90px] w-[90px] absolute -left-2 -top-2"
              loading="lazy"
              alt=""
              src={openPopupIndex.image}
            />

            <div className="flex flex-col items-start justify-start ">
              <b className="relative capitalize z-[1] text-lg">
                {openPopupIndex.title}
              </b>
              <div className="relative text-sm leading-[27px] capitalize text-slategray z-[1] mq450:text-mid mq450:leading-[22px]">
                {openPopupIndex.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpPopular;
