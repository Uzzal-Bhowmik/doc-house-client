import React from "react";
import "./Banner.css";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import docGroup from "../../../assets/docGroup.png";
import bigCap from "../../../assets/bigcap.png";
import fullcap from "../../../assets/fullcap.png";
import circle from "../../../assets/circle.png";
import dot from "../../../assets/dot.png";
import tiltFullcap from "../../../assets/tilt-fullcap.png";

const Banner = () => {
  return (
    <div className="h-screen bg-[var(--pri-color)]">
      <div className="container flex justify-center items-center pt-16">
        <div className="text-white md:w-[40%]">
          <h1 className="text-6xl font-bold leading-normal">
            Your Best Medical Help Center
          </h1>
          <p className="mt-5 mb-8">
            Where Compassionate Care Meets Cutting-Edge Medicine: Your Ultimate
            Medical Help Center
          </p>

          <Link>
            <Button
              className="bg-[var(--sec-color)] text-white"
              radius="sm"
              size="lg"
            >
              All Services
            </Button>
          </Link>
        </div>

        <div className="md:w-[50%] z-30">
          <img src={docGroup} alt="" className="block md:ms-auto" />
        </div>
      </div>

      {/* bg img parts */}
      <img
        src={bigCap}
        alt=""
        className="absolute md:top-0 md:z-20 w-[200px]"
      />
      <img
        src={fullcap}
        alt=""
        className="absolute md:bottom-5 md:left-[40%]"
      />
      <img
        src={dot}
        alt=""
        className="absolute md:bottom-28 md:left-[47%] z-0"
      />
      <img
        src={circle}
        alt=""
        className="absolute md:top-[12%] md:left-[60%] z-20"
      />
      <img
        src={tiltFullcap}
        alt=""
        className="absolute top-[10%] left-[35%] z-20"
      />
    </div>
  );
};

export default Banner;
