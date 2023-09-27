import React from "react";
import "./SharedBanner.css";
import bigCapsule from "../../../assets/bigcap.png";
import tiltCapsule from "../../../assets/tilt-fullcap.png";

const SharedBanner = ({ route, title }) => {
  return (
    <div className="bg-[var(--pri-color)] h-[60vh] flex items-center relative">
      <div className="text-white space-y-3 md:w-[70%] md:mx-auto">
        <p className="text-sm text-gray-300">{route}</p>
        <h3 className="text-4xl font-bold">{title}</h3>
      </div>

      {/* bg image parts */}
      <img
        src={bigCapsule}
        alt=""
        className="absolute rotate-180 bottom-0 left-10"
      />
      <img src={tiltCapsule} alt="" className="absolute right-20 z-10" />
    </div>
  );
};

export default SharedBanner;
