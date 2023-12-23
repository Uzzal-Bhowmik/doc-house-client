import React, { useEffect, useState } from "react";
import "./AllAppointments.css";
import DynamicHelmet from "../../../component/DynamicHelmet/DynamicHelmet";
import useAppointments from "../../../hooks/useAppointments";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllAppointments = () => {
  const [userAppointments, refetch, isDataLoading] = useAppointments();
  const [axiosInterceptor] = useAxiosSecure();
  const [allAppointments, setAllAppointments] = useState([]);

  //   // sorting appointments by payment status
  const paidAppoints = userAppointments?.filter(
    (appoint) => appoint.payment?.status === "paid"
  );
  const unpaidAppoints = userAppointments?.filter(
    (appoint) => appoint.payment === undefined
  );

  useEffect(() => {
    setAllAppointments([...paidAppoints, ...unpaidAppoints]);
  }, [userAppointments]);

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
                      title: "The appointment has been cancelled successfully",
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
    <div>
      <DynamicHelmet pageName="All Appointments"></DynamicHelmet>

      {isDataLoading ? (
        <div className="flex justify-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <Table aria-label="Example static collection table" className="">
          <TableHeader>
            <TableColumn className="text-lg bg-primary-600 py-3 text-white">
              #
            </TableColumn>
            <TableColumn className="text-lg bg-primary-600 py-3 text-white">
              NAME
            </TableColumn>
            <TableColumn className="text-lg bg-primary-600 py-3 text-white">
              SERVICE
            </TableColumn>
            <TableColumn className="text-lg bg-primary-600 py-3 text-white">
              DATE
            </TableColumn>
            <TableColumn className="text-lg bg-primary-600 py-3 text-white">
              TIME
            </TableColumn>
            <TableColumn className="text-lg bg-primary-600 py-3 text-white">
              ACTION
            </TableColumn>
            <TableColumn className="text-lg bg-primary-600 py-3 text-white">
              PAYMENT
            </TableColumn>
          </TableHeader>

          <TableBody>
            {allAppointments?.map((appointment, idx) => (
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
                  <div className="flex justify-center">
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
                    <div>
                      <p className="font-bold text-red-400">UNPAID</p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AllAppointments;
