import React from "react";
import LandingNav from "../Landing/LandingNav";
import { PiTelegramLogo } from "react-icons/pi";
import { lazy, Suspense } from "react";
import Loading from "../Loading/Loading";

const LandingFooter = lazy(() => import("../Landing/LandingFooter"));

const Contact = () => {
  return (
    <div className="relative">
      <div
        className={` w-full bg-gradient-to-b from-[#84a7cd] via-[#c1dae6] to-white max-w-full overflow-hidden flex flex-col items-start justify-start pt-0 px-0 leading-[normal] tracking-[normal]`}
      >
        <div className="  items-center justify-start py-8 lg:py-10 3xl:py-12 box-border bg-cover bg-no-repeat bg-top bg-[url('/star-bg.png')]">
          <LandingNav />
          <div className="px-5 md:px-10 pt-16 xl:pt-5">
            <div className="flex flex-col lg:flex-row justify-between items-center pt-5 lg:pt-14">
              {/* left */}
              <div>
                <h1 className="capitalize text-[30px] xl:text-[50px] text-white md:text-[40px] font-black leading-none max-md:max-w-full ">
                  Get in Touch with Us
                </h1>
                <p className="text-xl xl:text-2xl font-normal mt-[15px] max-md:max-w-full md:mt-10 text-white 3xl:w-10/12">
                  We're here to help! Reach out with any questions, feedback, or
                  support needs.
                </p>
              </div>

              {/* right */}
              <div className="flex justify-center items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/23a3c2e3bc6c40d1929e6e069f81541b/e9df8acc47b6811cfd13dc0a1a5b14d9d540e7c2?placeholderIfAbsent=true"
                  className="aspect-[1.08] object-contain w-11/12 lg:w-10/12 3xl:w-8/12"
                  alt="Research team collaboration"
                />
              </div>
            </div>

            <div className="relative shadow-[0px_4px_24px_rgba(0,0,0,0.2)] w-full  px-2 md:px-[30px] py-2 md:py-[34px] rounded-2xl xl:rounded-[30px] ">
              <div className="flex flex-col lg:flex-row justify-start  relative rounded-[30px] space-y-5">
                {/* left */}
                <div className="w-full lg:w-1/2 bg-[rgba(255,255,255,0.25)] relative flex flex-col relative pt-5 pb-5 md:pb-8 px-1 ssm:px-4 md:pt-[25px] lg:pb-[11px] rounded-2xl xl:rounded-[30px]">
                  <h2 className="bg-blend-normal text-white text-xl md:text-2xl xl:text-4xl font-bold text-center md:text-start">
                    Contact Information
                  </h2>

                  <div className="space-y-5 flex flex-col text-2xl text-white font-medium justify-center ssm:mt-5">
                    {/* Address */}

                    <div className="bg-[rgba(121,154,195,1)] flex  w-full  justify-center px-4 md:px-[16px] py-4 md:py-[30px] lg:py-[34px] rounded-[17px]">
                      <div className="flex w-full items-center gap-2">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/23a3c2e3bc6c40d1929e6e069f81541b/bd7d8f1cf0f5c896123feadebf752689fa363f7f?placeholderIfAbsent=true"
                          alt="Address icon"
                          className="aspect-[0.97] object-contain w-[20px] md:w-[24px] self-stretch shrink-0 my-auto"
                        />
                        <address className="self-stretch  not-italic text-sm md:text-[18px] lg:text-xl">
                          47600 Subang Jaya, Selangor
                        </address>
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="bg-[rgba(121,154,195,1)] flex  w-full  justify-center px-4 md:px-[16px] py-4 md:py-[30px] lg:py-[34px] rounded-[17px]">
                      <div className="flex w-full items-center gap-2">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/23a3c2e3bc6c40d1929e6e069f81541b/d542f8bdd37ec457ef016860389c07463e11095f?placeholderIfAbsent=true"
                          alt="Address icon"
                          className="aspect-[0.97] object-contain w-[20px] md:w-[24px] self-stretch shrink-0 my-auto"
                        />
                        <address className="self-stretch  not-italic text-sm md:text-[18px] lg:text-xl">
                          +601140764409
                        </address>
                      </div>
                    </div>
                    {/* Email */}

                    <div className="bg-[rgba(121,154,195,1)] flex  w-full  justify-center px-4 md:px-[16px] py-4 md:py-[30px] lg:py-[34px] rounded-[17px]">
                      <div className="flex w-full items-center gap-2">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/23a3c2e3bc6c40d1929e6e069f81541b/486df8c02cac5aed65f3991fae31535603549def?placeholderIfAbsent=true"
                          alt="Address icon"
                          className="aspect-[0.97] object-contain w-[20px] md:w-[24px] self-stretch shrink-0 my-auto"
                        />
                        <address className="self-stretch  not-italic text-sm md:text-[18px] lg:text-xl">
                          researchbdy@gmail.com
                        </address>
                      </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="lg:absolute lg:bottom-5 self-center flex w-[137px] max-w-full items-stretch gap-5 justify-between mt-[100px]">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/23a3c2e3bc6c40d1929e6e069f81541b/d1c668120586ecc9846e4f1e722186ba49b0e286?placeholderIfAbsent=true"
                          alt="Facebook"
                          className="aspect-[1] object-contain w-[25px] md:w-[31px] shrink-0"
                        />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/23a3c2e3bc6c40d1929e6e069f81541b/9406f011e6ca2169e19d70a308de549b6b4d0fca?placeholderIfAbsent=true"
                          alt="Twitter"
                          className="aspect-[1] object-contain w-[25px] md:w-[31px] shrink-0"
                        />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets/23a3c2e3bc6c40d1929e6e069f81541b/78e5bf603c44ef0065525d7a4e477f834bed6bcd?placeholderIfAbsent=true"
                          alt="LinkedIn"
                          className="aspect-[1] object-contain w-[25px] md:w-[31px] shrink-0"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                {/* right */}
                <form className="px-5 w-full lg:w-1/2 space-y-6 bg-transparent">
                  {/* First Name */}
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-[16px] lg:text-[20px] font-bold text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full border-b border-gray-600 focus:outline-none  bg-transparent text-black placeholder-gray-500"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-[16px] lg:text-[20px] font-bold text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full border-b border-gray-600 focus:outline-none  bg-transparent text-black placeholder-gray-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[16px] lg:text-[20px] font-bold text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border-b border-gray-600 focus:outline-none  bg-transparent text-black placeholder-gray-500"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[16px] lg:text-[20px] font-bold text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full border-b border-gray-600 focus:outline-none  bg-transparent text-black placeholder-gray-500"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[16px] lg:text-[20px] font-bold text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full border-b border-gray-600 focus:outline-none  bg-transparent text-black placeholder-gray-500 resize-none h-24"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="float-right flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all text-[16px] lg:text-lg"
                  >
                    <PiTelegramLogo />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
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

export default Contact;
