import React, { useEffect, useState } from "react";
import "./MyAppointments.css";
import useAuthContext from "../../../hooks/useAuthContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Button,
  Divider,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Payment from "../../Payment/Payment";
import useAppointments from "../../../hooks/useAppointments";

const MyAppointments = () => {
  const { user } = useAuthContext();
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filteredAppointmentsByPay, setFilteredAppointmentsByPay] = useState(
    []
  );
  const [appointmentDates, setAppointmentDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState("all");
  const [axiosInterceptor] = useAxiosSecure();
  const [dataLoading, setDataLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAppointment, setSelectedAppointment] = useState({});

  const [userAppointments, refetch] = useAppointments();

  const handlePay = (appointment) => {
    setSelectedAppointment(appointment);
    onOpen();
  };

  // load user appointments data
  useEffect(() => {
    setAllAppointments(userAppointments);
    setDataLoading(false);
  }, [user, axiosInterceptor, userAppointments]);

  // set appointment dates
  useEffect(() => {
    const dates = allAppointments?.map(
      (appointment) => appointment.appointmentDate
    );
    const filtered = dates.filter(
      (date, index) => dates.indexOf(date) === index
    );
    setAppointmentDates(filtered);
  }, [allAppointments]);

  // filter appointments based on DATE CHANGE
  const handleDateSelect = (e) => {
    if (e.target.value === "") {
      setSelectedDate("all");
    } else {
      setSelectedDate(e.target.value);
    }
  };

  // filter appointments based on PAYMENT STATUS
  const handlePaymentChange = (e) => {
    if (e.target.value === "") {
      setSelectedPayment("all");
    } else {
      setSelectedPayment(e.target.value);
    }
  };

  useEffect(() => {
    // filter appointments by date
    if (selectedDate === "all") {
      setFilteredAppointments(allAppointments && allAppointments);
    } else {
      const filterByDate = allAppointments?.filter(
        (appointment) => appointment.appointmentDate === selectedDate
      );
      setFilteredAppointments(filterByDate);
    }

    // filter appointments by payment
    if (filteredAppointments) {
      if (selectedPayment === "all") {
        setFilteredAppointmentsByPay(filteredAppointments);
      } else if (selectedPayment === "paid") {
        const paidAppointments = filteredAppointments.filter(
          (appointment) => appointment.payment?.status === "paid"
        );
        setFilteredAppointmentsByPay(paidAppointments);
      } else if (selectedPayment === "unpaid") {
        const unpaid = filteredAppointments.filter(
          (appointment) => appointment.payment == undefined
        );
        setFilteredAppointmentsByPay(unpaid);
      }
    }
  }, [selectedDate, allAppointments, selectedPayment, filteredAppointments]);

  // cancel appointment
  const handleCancelAppointment = (
    _id,
    serviceName,
    bookedSlotTime,
    bookedDate
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This appointment will be cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // remove appointment from appointments collection in db
        axiosInterceptor
          .delete(`http://localhost:5000/appointments/${_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // update(remove) bookedDates array in services collection
              axiosInterceptor
                .patch("http://localhost:5000/services/deleteDate", {
                  serviceName,
                  bookedSlotTime,
                  bookedDate,
                })
                .then((res) => {
                  if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Your appointment has been cancelled successfully",
                      showConfirmButton: false,
                      timer: 2500,
                    });
                  }
                });
            }
          });
      }
    });
  };

  return (
    <div className="p-12">
      <div className="flex justify-between items-center mb-5 px-5">
        <h3 className="text-2xl font-bold">
          My Appointments: {allAppointments.length}
        </h3>

        <div className="w-1/2 flex items-center justify-between">
          <Select
            label="Select Payment"
            className="max-w-[230px] font-bold text-black"
            size="sm"
            color="warning"
            onChange={handlePaymentChange}
          >
            <SelectItem key={"paid"} value={"paid"}>
              Paid
            </SelectItem>
            <SelectItem key={"unpaid"} value={"unpaid"}>
              Unpaid
            </SelectItem>
          </Select>

          <Select
            label="Select Date"
            className="max-w-[230px] font-bold text-black"
            size="sm"
            color="warning"
            onChange={handleDateSelect}
          >
            {appointmentDates?.map((date) => (
              <SelectItem key={date} value={date}>
                {date}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {dataLoading ? (
        <Spinner color="success" size="lg"></Spinner>
      ) : (
        <Table aria-label="Example static collection table" className="">
          <TableHeader>
            <TableColumn className="text-lg bg-green-600 py-3 text-white">
              #
            </TableColumn>
            <TableColumn className="text-lg bg-green-600 py-3 text-white">
              NAME
            </TableColumn>
            <TableColumn className="text-lg bg-green-600 py-3 text-white">
              SERVICE
            </TableColumn>
            <TableColumn className="text-lg bg-green-600 py-3 text-white">
              DATE
            </TableColumn>
            <TableColumn className="text-lg bg-green-600 py-3 text-white">
              TIME
            </TableColumn>
            <TableColumn className="text-lg bg-green-600 py-3 text-white">
              ACTION
            </TableColumn>
            <TableColumn className="text-lg bg-green-600 py-3 text-white">
              PAYMENT
            </TableColumn>
          </TableHeader>
          <TableBody>
            {filteredAppointmentsByPay?.map((appointment, idx) => (
              <TableRow key={appointment._id}>
                <TableCell className="text-md font-medium">{idx + 1}</TableCell>
                <TableCell className="text-md font-medium">
                  {appointment.name}
                </TableCell>
                <TableCell className="text-md font-medium">
                  {appointment?.service}
                </TableCell>
                <TableCell>{appointment.appointmentDate}</TableCell>
                <TableCell className="text-md font-medium">
                  {appointment.slotTime}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d5d53d"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="cursor-pointer"
                    >
                      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                      <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                    </svg>
                    {/* --------------------- */}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff5454"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="cursor-pointer"
                      onClick={() =>
                        handleCancelAppointment(
                          appointment._id,
                          appointment.service,
                          appointment.slotTime,
                          appointment.appointmentDate
                        )
                      }
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </div>
                </TableCell>

                <TableCell className="text-md">
                  {appointment?.payment?.status === "paid" ? (
                    <div>
                      <p className="font-bold">PAID</p>
                      <p className="text-success-500">
                        TnxID: {appointment.payment.transactionId}
                      </p>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-green-700 text-md text-white"
                      onClick={() => handlePay(appointment)}
                    >
                      Pay
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h5 className="text-xl font-semibold text-orange-600">
                  Hello, {selectedAppointment?.name}
                </h5>
              </ModalHeader>
              <ModalBody>
                <div>
                  <h6 className="text-lg font-semibold">
                    Please pay for {selectedAppointment?.service}
                  </h6>
                  <p className="mt-2 mb-4 text-gray-400">
                    Your appointment:{" "}
                    <span className="text-orange-500">
                      {selectedAppointment?.appointmentDate}
                    </span>{" "}
                    at {selectedAppointment?.slotTime}
                  </p>

                  <h6 className="text-lg font-semibold">
                    Your Bill: ${selectedAppointment?.price}
                  </h6>
                </div>

                <Divider className="my-3" />

                {/* payment method */}
                <Payment
                  price={selectedAppointment?.price}
                  appointmentId={selectedAppointment?._id}
                  serviceName={selectedAppointment?.service}
                />
                {/* ---------- */}

                <form className="appointment-form">
                  <Button color="danger" onPress={onClose}>
                    Close
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyAppointments;
