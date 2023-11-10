import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [axiosInterceptor] = useAxiosSecure();

  useEffect(() => {
    axiosInterceptor.get("/users").then((res) => console.log(res.data));
  }, [axiosInterceptor]);

  return (
    <div>
      <h3>these are all the users</h3>
    </div>
  );
};

export default AllUsers;
