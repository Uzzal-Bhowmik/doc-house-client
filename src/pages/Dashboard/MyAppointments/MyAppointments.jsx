import React, { useEffect, useState } from "react";
import "./MyAppointments.css";
import useAuthContext from "../../../hooks/useAuthContext";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAppointments = () => {
  const { user } = useAuthContext();
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointmentDates, setAppointmentDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("all");
  const [appointmentsDidUpdate, setAppointmentsDidUpdate] = useState(false);
  const [axiosInterceptor] = useAxiosSecure();

  // load user appointments data
  useEffect(() => {
    axiosInterceptor.get(`/appointments?email=${user?.email}`).then((res) => {
      setAllAppointments(res.data);
    });
  }, [user, appointmentsDidUpdate, axiosInterceptor]);

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

  // set filtered appointments based on date change
  const handleDateSelect = (e) => {
    if (e.target.value === "") {
      setSelectedDate("all");
    } else {
      setSelectedDate(e.target.value);
    }
  };

  useEffect(() => {
    if (selectedDate === "all") {
      setFilteredAppointments(allAppointments);
    } else {
      const filterByDate = allAppointments.filter(
        (appointment) => appointment.appointmentDate === selectedDate
      );
      setFilteredAppointments(filterByDate);
    }
  }, [selectedDate, allAppointments]);

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
        fetch(`http://localhost:5000/appointments/${_id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // update(remove) bookedDates array in services collection
              axios
                .patch("http://localhost:5000/services/deleteDate", {
                  serviceName,
                  bookedSlotTime,
                  bookedDate,
                })
                .then((res) => {
                  if (res.data.modifiedCount > 0) {
                    setAppointmentsDidUpdate(!appointmentsDidUpdate);
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
        <h3 className="text-2xl font-bold">My Appointments</h3>

        <Select
          label="Select Date"
          className="max-w-[230px] font-bold text-black"
          variant="faded"
          size="sm"
          onChange={handleDateSelect}
        >
          {appointmentDates?.map((date) => (
            <SelectItem key={date} value={date}>
              {date}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Table aria-label="Example static collection table" className="">
        <TableHeader>
          <TableColumn className="text-lg">#</TableColumn>
          <TableColumn className="text-lg">NAME</TableColumn>
          <TableColumn className="text-lg">SERVICE</TableColumn>
          <TableColumn className="text-lg">DATE</TableColumn>
          <TableColumn className="text-lg">TIME</TableColumn>
          <TableColumn className="text-lg">ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredAppointments?.map((appointment, idx) => (
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
                    width="20"
                    height="20"
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
                    width="20"
                    height="20"
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyAppointments;
