import React from "react";
import useAuthContext from "./useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, isLoading } = useAuthContext();

  const { data: isAdmin = false, isLoading: adminLoading } = useQuery({
    queryKey: ["admin"],
    enabled: !isLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/admin/${user?.email}`);
      return res.data.isAdmin;
    },
  });
  return [isAdmin, adminLoading];
};

export default useAdmin;
