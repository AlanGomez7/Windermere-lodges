"use client";
import { Elements } from "@stripe/react-stripe-js";
import { ElementsDebugger } from "../debugger";
import CheckoutPage from "./checkout";

export function StableStripeElements({
  stripePromise,
  auth,
  bookingDetails,
  orderDetails,
  amount,
}: any) {
  return (
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
