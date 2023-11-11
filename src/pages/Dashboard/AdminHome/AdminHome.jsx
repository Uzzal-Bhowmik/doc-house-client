import React from "react";
import doctors from "../../../assets/doctor.png";
import appointments from "../../../assets/appointment.png";
import patients from "../../../assets/patients.png";
import { Divider } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// pie chart settings
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AdminHome = () => {
  const [axiosInterceptor] = useAxiosSecure();
  const { data: adminStats = [] } = useQuery(["admin-stats"], async () => {
    const res = await axiosInterceptor.get("/dashboard/adminhome");
    return res.data;
  });
  const {
    doctorCount,
    patientCount,
    appointmentCount,
    paymentCount,
    patientCountsByYear,
  } = adminStats;

  const sortedYear = patientCountsByYear?.sort((a, b) => a.year - b.year);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center gap-8">
        <div className="bg-white rounded-xl w-full p-6">
          <div>
            <div className="flex items-center gap-5">
              <img src={doctors} alt="" />
              <p className="text-3xl font-bold">{doctorCount}</p>
            </div>

            <Divider className="mt-8 mb-3 h-1 rounded-xl bg-[#ffe6eb]" />

            <h4 className="font-bold text-2xl">Doctors</h4>
          </div>
        </div>
        <div className="bg-white rounded-xl w-full p-6">
          <div>
            <div className="flex items-center gap-5">
              <img src={patients} alt="" />
              <p className="text-3xl font-bold">{patientCount}</p>
            </div>

            <Divider className="mt-8 mb-3 h-1 rounded-xl bg-[#f2f7eb]" />

            <h4 className="font-bold text-2xl">Patients</h4>
          </div>
        </div>

        <div className="bg-white rounded-xl w-full p-6">
          <div>
            <div className="flex items-center gap-5">
              <img src={appointments} alt="" />
              <p className="text-3xl font-bold">{appointmentCount}</p>
            </div>

            <Divider className="mt-8 mb-3 h-1 rounded-xl bg-[#fff8eb]" />

            <h4 className="font-bold text-2xl">Appointments</h4>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex mt-8 items-center gap-10">
        <div className="w-1/2 p-7 bg-white rounded-xl">
          <h4 className="text-2xl font-bold text-gray-500">Patients</h4>
          <Divider className="mt-2 mb-5" />

          <AreaChart
            width={500}
            height={400}
            data={sortedYear}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
              name="Patients Count By Year"
            />
          </AreaChart>
        </div>

        <div className="w-1/2 p-7 bg-white rounded-xl">
          <h4 className="text-2xl font-bold text-gray-500">
            Appointment Payment
          </h4>
          <Divider className="mt-2 mb-5" />

          <PieChart width={400} height={400}>
            <Pie
              data={paymentCount}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {paymentCount?.map((entry, index) => (
                <Cell
                  name={entry.status}
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
