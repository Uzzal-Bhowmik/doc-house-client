import React from "react";
import "./ServiceCard.css";

const ServiceCard = ({ service, handleService, selectedServiceId }) => {
  const { _id, serviceName, img, active } = service;

  return (
    <div
      className={`service-card border-2 ${
        selectedServiceId === _id
          ? "border-2 border-[#e80054]"
          : "border-2 border-transparent"
      } transition-all duration-400 ease-out`}
      onClick={() => handleService(_id)}
    >
      <div className="service-img">
        <img src={img} alt="" />
      </div>

      <div className="service-details">{serviceName}</div>
    </div>
  );
};

export default ServiceCard;
