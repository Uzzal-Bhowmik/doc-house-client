import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Avatar,
} from "@nextui-org/react";
import { TiUserDeleteOutline } from "react-icons/ti";
import Swal from "sweetalert2";

const ManageDoctors = () => {
  const [axiosInterceptor] = useAxiosSecure();

  const { data: doctors = [], refetch } = useQuery(["allDoctors"], async () => {
    const res = await axiosInterceptor.get("/doctors");
    return res.data;
  });

  const handleDeleteDoctor = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInterceptor.delete(`/doctors/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User has been deleted successfully",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  console.log(doctors);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-7 pl-2">
        Total Doctors: {doctors.length}
      </h1>

      <div>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              #
            </TableColumn>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              PHOTO
            </TableColumn>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              NAME
            </TableColumn>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              SPECIALITY
            </TableColumn>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              ACTION
            </TableColumn>
          </TableHeader>
          <TableBody>
            {doctors?.map((doctor, idx) => (
              <TableRow key={doctor._id}>
                <TableCell className="text-lg">{idx + 1}</TableCell>
                <TableCell className="text-lg">
                  <Avatar src={doctor.img} />
                </TableCell>
                <TableCell className="text-lg">{doctor.name}</TableCell>
                <TableCell className="text-lg">
                  {doctor.specialization[0]}
                </TableCell>
                <TableCell className="text-lg">
                  <Button
                    color="danger"
                    variant="ghost"
                    onClick={() => handleDeleteDoctor(doctor._id)}
                  >
                    <TiUserDeleteOutline className="text-lg" /> Delete Doctor
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageDoctors;
