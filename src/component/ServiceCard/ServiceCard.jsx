import React from "react";
import "./ServiceCard.css";

const ServiceCard = ({ service, handleService }) => {
  const { _id, serviceName, img, active } = service;

  return (
    <div
      className={`service-card ${
        active !== undefined && active === true
          ? "border-2 border-[#e80054]"
          : "border-2 border-transparent"
      }`}
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
