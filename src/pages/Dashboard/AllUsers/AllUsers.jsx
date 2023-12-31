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
} from "@nextui-org/react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { RiAdminLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  // const [allUsers, setAllUsers] = useState([]);
  const [axiosInterceptor] = useAxiosSecure();

  // useEffect(() => {
  //   axiosInterceptor.get("/users").then((res) => setAllUsers(res.data));
  // }, [axiosInterceptor]);

  const { data: allUsers = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosInterceptor.get("/users");
    return res.data;
  });

  const handleMakeAdmin = (_id) => {
    axiosInterceptor.patch(`/users/${_id}`, { role: "admin" }).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User has been upgraded to Admin Role",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleDeleteUser = (_id) => {
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
        axiosInterceptor.delete(`/users/${_id}`).then((res) => {
          console.log(res.data);
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

  console.log(allUsers);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-7 pl-2">
        Total Users: {allUsers.length}
      </h3>
      <div>
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              #
            </TableColumn>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              NAME
            </TableColumn>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              EMAIL
            </TableColumn>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              SET ROLE
            </TableColumn>
            <TableColumn className="text-xl bg-primary-600 text-white py-3">
              DELETE
            </TableColumn>
          </TableHeader>
          <TableBody>
            {allUsers?.map((user, idx) => (
              <TableRow key={user._id}>
                <TableCell className="text-lg">{idx + 1}</TableCell>
                <TableCell className="text-lg">{user.name}</TableCell>
                <TableCell className="text-lg">{user.email}</TableCell>
                <TableCell className="text-lg">
                  {user.role !== "admin" && (
                    <Button
                      color="primary"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      <RiAdminLine className="text-lg" /> Make Admin
                    </Button>
                  )}
                </TableCell>
                <TableCell className="text-lg">
                  <Button
                    color="danger"
                    variant="ghost"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <TiUserDeleteOutline className="text-lg" /> Delete User
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

export default AllUsers;
