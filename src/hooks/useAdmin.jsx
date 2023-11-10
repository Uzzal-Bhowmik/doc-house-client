import React from "react";
import useAuthContext from "./useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import axios from "axios";

const useAdmin = () => {
  const [axiosInterceptor] = useAxiosSecure();
  const { user, isLoading } = useAuthContext();
  // console.log(user == null, isLoading)

  const { data: isAdmin = false, isLoading: adminLoading } = useQuery({
    queryKey: ["admin", user?.email],
    enabled:
      user != null &&
      !isLoading &&
      localStorage.getItem("doc-house-jwt-token") != null,
    queryFn: async () => {
      const res = await axiosInterceptor.get(`/users/admin/${user.email}`);
      return res.data.isAdmin;
    },
  });
  return [isAdmin, adminLoading];
};

export default useAdmin;
