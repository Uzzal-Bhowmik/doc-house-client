import React from "react";
import "./Home.css";
import DynamicHelmet from "../../../component/DynamicHelmet/DynamicHelmet";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";
import About from "../About/About";
import Reviews from "../Reviews/Reviews";
import Doctors from "../Doctors/Doctors";

const Home = () => {
  return (
    <div className="my-20">
      <DynamicHelmet pageName="Home" />
      <Banner />
      <Services />
      <About />
      <Reviews />
      <Doctors />
    </div>
  );
};

export default Home;
