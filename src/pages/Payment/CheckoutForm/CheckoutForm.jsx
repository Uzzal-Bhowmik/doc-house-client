import React, { useEffect, useState } from "react";
import "./CheckoutForm.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuthContext from "../../../hooks/useAuthContext";
import { BiBadgeCheck } from "react-icons/bi";
import useAppointments from "../../../hooks/useAppointments";

const CheckoutForm = ({ price, appointmentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuthContext();
  const [axiosInterceptor] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [, refetch] = useAppointments();

  useEffect(() => {
    axiosInterceptor
      .post("/create-payment-intent", { price: price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosInterceptor, price]);

  if (!clientSecret) return;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setPaymentProcessing(true);

    const card = elements.getElement(CardElement);
    if (card == null) return;

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      console.log("[payment method error]", paymentMethodError);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      return;
    }
    setPaymentProcessing(false);

    if (paymentIntent.status === "succeeded") {
      // procedure of adding payment info to database
      /**
       * 1. add payment status (paid, transactionId) in the selected appointment document
       * 2. add payment info to payments collection for "payment history" route
       * 3. refetch appointments(of logged in user) to get payment status(if paid) to non-disable the 'book now' button.
       */
      setTransactionId(paymentIntent.id);

      axiosInterceptor
        .patch(`/appointments/${appointmentId}`, {
          payment: { status: "paid", transactionId: paymentIntent.id },
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            axiosInterceptor
              .post("/payments", {
                name: user?.name,
                email: user?.email,
                appointmentId,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
              })
              .then((res) => {
                if (res.data.insertedId) {
                  refetch();
                }
              });
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="border-2 p-4 rounded-md hover:border-blue-500 transition-all duration-300"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      {!transactionId ? (
        <button
          type="submit"
          disabled={!stripe || !elements || paymentProcessing}
          className="mt-3 mb-5 border w-24 h-10 bg-primary text-white"
        >
          Pay
        </button>
      ) : (
        <div className="flex items-center gap-3 mb-5 mt-3">
          <button className="w-24 h-10 text-green-600" disabled>
            Paid
          </button>
          <BiBadgeCheck className="text-success-500 w-7 h-7" />
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
