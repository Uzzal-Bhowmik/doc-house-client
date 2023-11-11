import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = ({ price, appointmentId, serviceName }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        price={price}
        appointmentId={appointmentId}
        serviceName={serviceName}
      />
    </Elements>
  );
};

export default Payment;
