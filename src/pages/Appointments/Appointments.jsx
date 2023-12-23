import React, { useEffect, useState } from "react";
import "./Appointments.css";
import SharedBanner from "../Shared/SharedBanner/SharedBanner";
import dentalChair from "../../assets/service-chair.png";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import useServices from "../../hooks/useServices";
import ServiceCard from "../../component/ServiceCard/ServiceCard";
import AvailableSlotCard from "../../component/AvailableSlotCard/AvailableSlotCard";
import { FaCalendarDays, FaSuitcaseMedical } from "react-icons/fa6";

const Appointments = () => {
  const [selected, setSelected] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState({});

  useEffect(() => {
    if (selected) setSelectedDate(format(selected, "PP"));
  }, [selected]);

  let services = useServices()[0];
  const handleService = (_id) => {
    setSelectedServiceId(_id);
  };

  return (
    <div>
      <SharedBanner route={"Home/Appointment"} title={"Appointment"} />

      <div className="container mt-10">
        <h3 className="text-4xl font-bold mb-5 flex gap-3">
          <FaCalendarDays /> Select Your Preferred Day
        </h3>
        <div className="flex justify-around items-center">
          <div>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              disabled={{ before: new Date() }}
              style={{
                width: "350px",
                height: "345px",
                backgroundColor: "#fff",
                border: "2px solid lightBlue",
                borderRadius: "18px",
                boxShadow: "3px 4px 10px 2px rgba(0, 0, 0, 0.05)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "1rem",
              }}
            />
          </div>

          <div>
            <img src={dentalChair} alt="" />
          </div>
        </div>

        <div className="mt-28">
          <div className="">
            <h1 className="text-4xl font-bold flex gap-3">
              <FaSuitcaseMedical />
              Please select a service
            </h1>
            <p className="pl-12 pt-2 text-xl text-[var(--sec-color)]">
              Available Services on{" "}
              <span className="font-extrabold">{selectedDate}</span>
            </p>
          </div>

          {/* services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 w-fit mx-auto mt-10">
            {services?.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                handleService={handleService}
                selectedServiceId={selectedServiceId}
              />
            ))}
          </div>

          {/* available slots */}
          <div className="mt-32">
            {services?.map((service) => (
              <div key={service._id}>
                {service._id === selectedServiceId && (
                  <>
                    <h1 className="text-5xl text-center">
                      Available slots for Teeth {service.serviceName}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-fit mx-auto my-12">
                      {service.availableSlot?.map(
                        (slotObject) =>
                          !slotObject.bookedDates.includes(selectedDate) && (
                            <AvailableSlotCard
                              key={slotObject.slot}
                              slotObject={slotObject}
                              service={service}
                              selectedDate={selectedDate}
                            />
                          )
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
