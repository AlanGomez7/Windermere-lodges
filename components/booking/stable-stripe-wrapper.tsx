"use client";
import { Elements } from "@stripe/react-stripe-js";
import { ElementsDebugger } from "../debugger";
import CheckoutPage from "./checkout";
import toast from "react-hot-toast";

export function StableStripeElements({
  stripePromise,
  auth,
  bookingDetails,
  orderDetails,
  amount,
}: any) {
  return amount <= 0 ? (
    <>
    </>
  ) : (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: amount * 100,
        currency: "gbp",
      }}
    >
      {/* <ElementsDebugger> */}
      <CheckoutPage
        auth={auth}
        isActive={true}
        bookingDetails={bookingDetails}
        orderDetails={orderDetails}
        amount={amount}
      />
      {/* </ElementsDebugger> */}
    </Elements>
  );
}
