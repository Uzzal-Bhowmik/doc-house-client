import React, { useEffect, useState } from "react";
import "./Doctors.css";
import DoctorCard from "../../../component/DoctorCard/DoctorCard";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    axios
      .get("https://doc-house-server.onrender.com/doctors")
      .then((res) => setDoctors(res.data));
  }, []);
  return (
    <div>
      <div className="text-center mb-16 space-y-4 w-3/4 mx-auto">
        <h1 className="text-4xl font-bold">Our Expert Doctors</h1>
        <p className="text-[#3B3A3A]">
          At our medical center, we take immense pride in the expertise and
          dedication of our exceptional team of doctors. With years of training
          and experience, our doctors are at the forefront of medical
          innovation, providing cutting-edge treatments and compassionate care
          to our patients.
        </p>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default Doctors;
