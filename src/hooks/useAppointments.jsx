import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuthContext from "./useAuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useAppointments = () => {
  const { user, isLoading } = useAuthContext();
  const [axiosInterceptor] = useAxiosSecure();

  const { data: userAppointments = [], refetch } = useQuery(
    ["myAppointments"],
    async () => {
      const res = await axiosInterceptor.get(
        `/appointments?email=${user?.email}`
      );
      return res.data;
    },
    { enabled: !isLoading }
  );

  return [userAppointments, refetch];
};

export default useAppointments;
