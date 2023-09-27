import React from "react";
import "./LoginBanner.css";
import loginBgPart1 from "../../assets/login-bg-part1.png";
import loginBgPart2 from "../../assets/login-bg-part2.png";

const LoginBanner = () => {
  return (
    <div className="bg-[var(--pri-color)] min-h-screen h-full relative">
      <img
        src={loginBgPart1}
        alt=""
        className="z-10 absolute w-[50%] top-[30%] left-[20%]"
      />
      <img src={loginBgPart2} alt="" className="absolute w-[50%] right-0" />
    </div>
  );
};

export default LoginBanner;
