import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuthContext from "../../../hooks/useAuthContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import dateFormat from "dateformat";

const PaymentHistory = () => {
  const { user } = useAuthContext();
  const [axiosInterceptor] = useAxiosSecure();
  const { data: payments = [] } = useQuery(["payments"], async () => {
    const res = await axiosInterceptor.get(`/payments?email=${user?.email}`);
    return res.data;
  });

  console.log(payments);
  return (
    <div>
      <h3 className="text-3xl font-bold ml-2 mb-8">
        Total Payments: {payments?.length}
      </h3>

      <div>
        <Table isStriped>
          <TableHeader className="bg-green-500">
            <TableColumn className="text-lg bg-success text-white">
              EMAIL
            </TableColumn>
            <TableColumn className="text-lg bg-success text-white">
              SERVICE
            </TableColumn>
            <TableColumn className="text-lg bg-success text-white">
              TOTAL PRICE
            </TableColumn>
            <TableColumn className="text-lg bg-success text-white">
              PAYMENT DATE
            </TableColumn>
            <TableColumn className="text-lg bg-success text-white">
              TRANSACTION ID
            </TableColumn>
          </TableHeader>
          <TableBody>
            {payments?.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell className="text-md font-medium">
                  {payment.email}
                </TableCell>
                <TableCell className="text-md font-medium">
                  {payment.serviceName}
                </TableCell>
                <TableCell className="text-md font-medium">
                  {payment.price}
                </TableCell>
                <TableCell className="text-md font-medium">
                  {dateFormat(payment?.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                </TableCell>
                <TableCell className="text-md font-medium">
                  {payment.transactionId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistory;
