import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Divider } from "@nextui-org/react";

const Footer = () => {
  return (
    <footer className="bg-[#f3f3f3] pt-16 pb-6 rounded-t-3xl mt-28">
      <div className="container flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start space-y-16 md:space-y-0 text-center md:text-left">
        <div className="md:w-[33%]">
          <div className="w-fit mx-auto">
            <div className="flex justify-center md:justify-start items-center">
              <img src={logo} alt="" className="w-[13%] block" />
              <h3 className="text-3xl font-bold ms-3">
                <span className="text-[var(--sec-color)]">Doc</span> House
              </h3>
            </div>
            <p className="mt-5 mb-6 font-md pe-8">
              Your Trusted Haven for Healthcare Excellence. Your Journey to
              Health Starts Here at DocHouse.
            </p>

            <Button variant="ghost" color="warning">
              Appointment
            </Button>
          </div>
        </div>

        <div className="md:w-[33%]">
          <div className="w-fit mx-auto space-y-3">
            <h4 className="text-2xl font-bold">Quick Links</h4>
            <p>
              <Link>Home</Link>
            </p>
            <p>
              <Link>About</Link>
            </p>
            <p>
              <Link>Appointments</Link>
            </p>
            <p>
              <Link>Login</Link>
            </p>
          </div>
        </div>

        <div className="md:w-[33%]">
          <div className="w-fit mx-auto space-y-3">
            <h4 className="text-2xl font-bold">Working Hours</h4>
            <p>Monday - 10 am to 7 pm</p>
            <p>Tuesday - 10 am to 7 pm</p>
            <p>Thursday - 10 am to 7 pm</p>
            <p>Saturday - 10 am to 7 pm</p>
          </div>
        </div>
      </div>

      <div className="container">
        <Divider className="mt-10 mb-4" />

        <p className="text-center text-[#6C6B6B]">
          Copyright © 2022 - All right reserved by Doc House Ltd
        </p>
      </div>
    </footer>
  );
};

export default Footer;
