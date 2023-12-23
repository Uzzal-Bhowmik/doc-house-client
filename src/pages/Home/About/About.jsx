import React from "react";
import { Slide } from "react-awesome-reveal";
import { BsClock, BsTelephoneOutbound } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";

const About = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-5">
      <Slide direction="up" triggerOnce>
        <div className="bg-[var(--pri-color)] text-white flex justify-center items-start py-12 px-20 rounded-lg">
          <BsClock className="text-4xl mr-4"></BsClock>
          <div>
            <h4 className="text-2xl mb-2 font-bold">Opening Hours</h4>
            <p className="text-lg">Open 9.00 am to 5.00pm Everyday</p>
          </div>
        </div>

        <div className="bg-[var(--sec-color)] text-white flex justify-center items-start py-12 px-20 rounded-lg">
          <SlLocationPin className="text-4xl mr-4"></SlLocationPin>
          <div>
            <h4 className="text-2xl mb-2 font-bold">Our Locations</h4>
            <p className="text-lg">Dhanmondi 17, Dhaka -1200, Bangladesh</p>
          </div>
        </div>

        <div className="bg-[var(--pri-color)] text-white flex justify-center items-start py-12 px-20 rounded-lg">
          <BsTelephoneOutbound className="text-4xl mr-4"></BsTelephoneOutbound>
          <div>
            <h4 className="text-2xl mb-2 font-bold">Contact Us</h4>
            <p className="text-lg">
              +88 01750 00 00 00 <br />
              +88 01750 00 00 00
            </p>
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default About;
