import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/users").then((res) => console.log(res.data));
  }, [axiosSecure]);

  return (
    <div>
      <h3>these are all the users</h3>
    </div>
  );
};

export default AllUsers;
