import React from "react";
import useAuthContext from "./useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, isLoading } = useAuthContext();

  const { data: isAdmin } = useQuery({
    queryKey: ["admin"],
    enabled: !isLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin?email=${user?.email}`);
      console.log(res.data);
    },
  });

  return [isAdmin];
};

export default useAdmin;
