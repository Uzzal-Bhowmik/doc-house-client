import React from "react";
import "./AvailableSlotCard.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import useAuthContext from "../../hooks/useAuthContext";
import useServices from "../../hooks/useServices";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AvailableSlotCard = ({ slotObject, service, selectedDate }) => {
  const { user } = useAuthContext();
  const refetch = useServices()[1];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [axiosInterceptor] = useAxiosSecure();

  const { register, handleSubmit } = useForm();

  const handleBookAppointment = (data) => {
    // add service name to data obj
    data.service = service?.serviceName;
    data["price"] = parseFloat(data.price.replace("$", ""));

    // add appointment from appointments collection in db
    axiosInterceptor
      .post("http://localhost:5000/appointments", data)
      .then((res) => {
        if (res.data.insertedId) {
          // update(add) bookedDates array in services collection
          axiosInterceptor
            .patch("http://localhost:5000/services/addDate", {
              _id: service._id,
              bookedSlotTime: data.slotTime,
              bookedDate: data.appointmentDate,
            })
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Your appointment has been successfully scheduled",
                  showConfirmButton: false,
                  timer: 2500,
                });
              }
            });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="slot-card flex items-center justify-center">
      <div>
        <div className="slot-img">
          <img src={service?.img} alt="" />
        </div>

        <div className="slot-details my-7 space-y-2">
          <h4 className="text-4xl font-bold">{service?.serviceName}</h4>
          <p className="uppercase font-bold text-lg">{slotObject.slot}</p>
        </div>

        <Button className="bg-[#F7A582] font-bold text-white" onClick={onOpen}>
          Book Appointment
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {service?.serviceName}
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={handleSubmit(handleBookAppointment)}
                    className="appointment-form"
                  >
                    <input
                      type="text"
                      {...register("appointmentDate")}
                      defaultValue={`${selectedDate}`}
                      readOnly
                    />
                    <input
                      type="text"
                      {...register("slotTime")}
                      defaultValue={slotObject.slot}
                      readOnly
                    />
                    <input
                      type="text"
                      {...register("name")}
                      defaultValue={user?.displayName && user?.displayName}
                      readOnly={user?.displayName}
                    />
                    <input
                      type="email"
                      {...register("email")}
                      defaultValue={user?.email && user?.email}
                      readOnly={user?.email}
                    />
                    <input
                      type="text"
                      {...register("price")}
                      defaultValue={"$" + service?.price}
                      readOnly={service?.price}
                    />
                    <input
                      type="text"
                      {...register("phone")}
                      placeholder="Phone"
                      required
                    />
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      color="success"
                      className="uppercase text-white"
                    >
                      Book Now
                    </Button>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default AvailableSlotCard;
