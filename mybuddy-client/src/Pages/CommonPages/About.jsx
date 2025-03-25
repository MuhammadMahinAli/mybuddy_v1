import React from "react";
import LandingNav from "../Landing/LandingNav";
import { lazy, Suspense } from "react";
import Loading from "../Loading/Loading";
import FeatureCard from "./FeatureCard";

const LandingFooter = lazy(() => import("../Landing/LandingFooter"));
const About = () => {
  return (
    <div className="relative">
      <div
        className={` w-full bg-gradient-to-b from-[#84a7cd] via-[#c1dae6] to-white max-w-full overflow-hidden flex flex-col items-start justify-start pt-0 px-0 leading-[normal] tracking-[normal]`}
      >
        <div className="  items-center justify-start py-8 box-border bg-cover bg-no-repeat bg-top bg-[url('/star-bg.png')]">
          <LandingNav />

          <div className="px-5 md:px-10 pt-10 xl:pt-20">
            <div className="flex flex-col lg:flex-row justify-between items-center pt-5 lg:pt-14">
              {/* left */}
              <div>
                <h1 className="capitalize text-[30px] xl:text-[50px] text-white md:text-[40px] font-black leading-none max-md:max-w-full ">
                  about us
                </h1>
                <p className="text-xl xl:text-2xl font-normal mt-[15px] max-md:max-w-full md:mt-10 text-white 3xl:w-9/12">
                  Empowering researchers & innovators with seamless project
                  management and collaboration.
                </p>
                <div className="capitalize text-gray-600 mt-5 rounded-lg h-14 flex justify-center items-center text-lg md:text-xl font-bold w-36 bg-cover bg-no-repeat bg-top bg-[url('https://cdn.builder.io/api/v1/image/assets/23a3c2e3bc6c40d1929e6e069f81541b/1f6c17532299a58b8a6b3f71b95b64186d50a9b4?placeholderIfAbsent=true')]">
                  who we are
                </div>
              </div>

              {/* right */}
              <div className="flex justify-center items-center">
                <img
                  src="https://i.ibb.co.com/QLSv5MH/image-1.png"
                  className="aspect-[1.08] object-contain w-11/12 lg:w-10/12 3xl:w-11/12"
                  alt="Research team collaboration"
                />
              </div>
            </div>

            <p className="text-[rgba(79,79,79,1)] leading-loose md:leading-[1.8] text-lg md:text-3xl xl:text-[35px] font-medium mt-7 w-11/12">
              As <span style={{ textTransform: "lowercase" }}>a </span>
              <span
                style={{
                  textTransform: "lowercase",
                  color: "rgba(255,255,255,1)",
                }}
              >
                cutting-edge research management platform
              </span>
              <span style={{ textTransform: "lowercase" }}>, we provide</span>
              <span
                style={{
                  textTransform: "lowercase",
                  color: "rgba(255,255,255,1)",
                }}
              >
                {" "}
                intelligent solutions{" "}
              </span>
              <span style={{ textTransform: "lowercase" }}>
                for researchers, innovators, and teams. Our{" "}
              </span>
              <span
                style={{
                  textTransform: "lowercase",
                  color: "rgba(255,255,255,1)",
                }}
              >
                advanced tools
              </span>
              <span style={{ textTransform: "lowercase" }}> help you </span>
              <span
                style={{
                  textTransform: "lowercase",
                  color: "rgba(255,255,255,1)",
                }}
              >
                organize, collaborate, and streamline workflows,
              </span>
              <span style={{ textTransform: "lowercase" }}>
                {" "}
                ensuring research excellence with ease.
              </span>
            </p>
            <div className="capitalize text-gray-600 mt-5 rounded-lg h-14 flex justify-center items-center text-lg md:text-xl font-bold w-40 bg-cover bg-no-repeat bg-top bg-[url('https://cdn.builder.io/api/v1/image/assets/23a3c2e3bc6c40d1929e6e069f81541b/1f6c17532299a58b8a6b3f71b95b64186d50a9b4?placeholderIfAbsent=true')]">
              Our Promises
            </div>
            <section className="flex flex-col relative min-h-[675px] items-center px-0 xl:px-20 py-[60px]">
              {/* <div className="absolute inset-0 bg-gradient-to-b from-[#8CA7D8] to-[#AABFE7] w-full h-full"></div> */}

              
              <div className="relative flex w-full max-w-[1229px] flex-col items-center max-md:max-w-full">
                <h2 className="text-white text-3xl xl:text-[50px] font-bold mb-6 xl:mb-16 text-center">
                  We Always Promise Our Users
                </h2>

                <div className="flex flex-col w-full gap-8">
                  <FeatureCard
                    title="Smart Project Management"
                    description="Leverage AI-Driven Project Tracking, Task Assignments, And Progress Analysis To Keep Your Research On Track And Maximize Productivity."
                    isFirst={true}
                  />

                  <FeatureCard
                    title="Data Security & Privacy"
                    description="We Prioritize The Security Of Your Research With Robust Encryption, Secure Access Controls, And Compliance Standards, Ensuring Your Data Stays Protected."
                    isFirst={false}
                  />

                  <FeatureCard
                    title="Seamless Collaboration"
                    description="Facilitate Effortless Teamwork With Real-Time Collaboration Tools, Automated Meeting Scheduling, And Structured Task Delegation—Designed For Researchers By Researchers."
                    isFirst={false}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
                   {/* footer */}
      <Suspense fallback={<Loading />}>
        <LandingFooter />
      </Suspense>
      </div>
    </div>
  );
};

export default About;
