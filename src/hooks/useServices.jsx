import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useServices = () => {
  const { data: services = [], refetch } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axios.get(
        "https://doc-house-server.onrender.com/services"
      );
      return res.data;
    },
  });

  return [services, refetch];
};

export default useServices;
