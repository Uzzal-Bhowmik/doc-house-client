import React, { useEffect, useState } from "react";
import SharedBanner from "../Shared/SharedBanner/SharedBanner";
import dentalChair from "../../assets/service-chair.png";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useServices from "../../hooks/useServices";
import ServiceCard from "../../component/ServiceCard/ServiceCard";
import AvailableSlotCard from "../../component/AvailableSlotCard/AvailableSlotCard";

const Appointments = () => {
  const [selected, setSelected] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState({});

  useEffect(() => {
    if (selected) setSelectedDate(format(selected, "PP"));
  }, [selected]);

  let services = useServices()[0];
  // useEffect(() => {
  //   if (services[0]) {
  //     services[0].active = true;
  //   }
  // }, [services]);

  // add id of the selected service to state
  const handleService = (_id) => {
    // const updatedServices = services.map((service) => {
    //   if (service._id === _id) {
    //     service["active"] = true;
    //   } else {
    //     service["active"] = false;
    //   }
    //   return service;
    // });

    // services = updatedServices;

    setSelectedServiceId(_id);
  };

  console.log(services);
  return (
    <div>
      <SharedBanner route={"Home/Appointment"} title={"Appointment"} />

      <div className="container mt-10">
        <div className="flex justify-around items-center">
          <div>
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              style={{
                width: "312px",
                height: "312px",
                backgroundColor: "#fff",
                borderRadius: "18px",
                boxShadow: "3px 4px 10px 2px rgba(0, 0, 0, 0.05)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>

          <div>
            <img src={dentalChair} alt="" />
          </div>
        </div>

        <div className="mt-28">
          <div className="text-center space-y-2">
            <p className="text-lg text-[var(--sec-color)]">
              Available Services on {selectedDate}
            </p>
            <h1 className="text-5xl">Please select a service</h1>
          </div>

          {/* services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 w-fit mx-auto mt-10">
            {services?.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                handleService={handleService}
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
                      {service.availableSlot?.map((slotObject) => (
                        <div key={slotObject.slot}>
                          {slotObject.bookedDates.includes(selectedDate) ? (
                            ""
                          ) : (
                            <AvailableSlotCard
                              key={slotObject.slot}
                              slotObject={slotObject}
                              service={service}
                              selectedDate={selectedDate}
                            />
                          )}
                        </div>
                      ))}
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
