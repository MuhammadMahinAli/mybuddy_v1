// import { useState } from "react";

import { useSelector } from "react-redux";
import LandingCollaboration from "./LandingCollaboration";
import LandingFeature from "./LandingFeature";
import LandingFooter from "./LandingFooter";
import LandingHero from "./LandingHero";
import LandingHowWork from "./LandingHowWork";
import LandingNav from "./LandingNav";
import LandingTouchDiff from "./LandingTouchDiff";
import { Link } from "react-router-dom";
import GoogleAdComponent from "../../GoogleAdComponent/GoogleAdComponent";

const LandingPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="relative">
      <div
        className={`w-full [background:linear-gradient(180deg,_#84a7cd,_#c1dae6_18%,_#fff)] max-w-full overflow-hidden flex flex-col items-start justify-start pt-0 px-0 leading-[normal] tracking-[normal]`}
      >
        <div className="flex-1 flex flex-row items-center justify-start pt-9  pb-[7px] box-border bg-[url('/public/full-kanding-page@3x.png')] bg-cover bg-no-repeat bg-[top]  ">
          <div className="">
            {/* nav */}
            <LandingNav />
            {/* hero */}

            <LandingHero />

            <GoogleAdComponent />
            {/* collaboration */}
            <LandingCollaboration />

            {/* get ready */}
          </div>
        </div>
      </div>
      {/* features */}
      <LandingFeature />
      <div className="flex flex-row items-center justify-center pb-8">
        <button className="  px-5 py-2 cursor-pointer bg-[transparent] shadow-[0px_5px_5px_rgba(46,_213,_115,_0.15)] rounded-lg [background:linear-gradient(-84.24deg,_#2c68ff,_#87a9ff)]  flex-wrap content-center">
          <Link
            to={user ? "/home" : "/login"}
            className="relative text-white xl:text-xl capitalize font-nunito text-primary-contrast text-left"
          >
            get started
          </Link>
        </button>
      </div>
      <GoogleAdComponent />

      {/* how it work */}
      <LandingHowWork />
      {/* touch diff */}
      <LandingTouchDiff />
      {/* <LandingGetReady /> */}
      {/* footer */}

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
