import React from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import { Avatar } from "@nextui-org/react";
import { FaCalendar, FaStar, FaWallet } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserHome = () => {
  const { user, isLoading } = useAuthContext();
  const [axiosInterceptor] = useAxiosSecure();

  // appointments data
  const { data: userStats = [] } = useQuery(
    ["userStats"],
    async () => {
      const res = await axiosInterceptor.get(
        `/dashboard/userhome?email=${user?.email}`
      );
      return res.data;
    },
    { enabled: !isLoading }
  );
  const { appointments, payments, reviews } = userStats;

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome, <span className="text-green-500">{user?.displayName}</span>
      </h1>

      <div className="flex mt-10">
        <div className="w-1/2 text-center space-y-5 py-24 bg-[#ffedd5] rounded-l-3xl">
          <Avatar
            isBordered
            color="success"
            className="w-32 h-32 text-large inline-block"
            src={user?.photoURL}
          />
          <h3 className="text-4xl font-bold">{user.displayName}</h3>
        </div>
        <div className="w-1/2 pl-20 py-24 border-l-4 border-warning-500 bg-[#fef9c3] rounded-r-3xl">
          <h3 className="text-4xl font-bold">Your Activities</h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-2 text-primary-500 text-xl font-semibold">
              <FaCalendar />
              <p>Appointments: {appointments}</p>
            </div>

            <div className="flex items-center gap-2 text-success-500 text-xl font-semibold">
              <FaWallet />
              <p>Payments: {payments}</p>
            </div>

            <div className="flex items-center gap-2 text-warning-500 text-xl font-semibold">
              <FaStar />
              <p>Reviews: {reviews}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
