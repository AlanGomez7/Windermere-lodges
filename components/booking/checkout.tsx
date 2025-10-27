"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useAppContext } from "@/app/context/context";
import { updateOrderPayment } from "@/lib/api";
import PaymentError from "../ui/payment-error";
import BookingTimer from "./timer";
import toast from "react-hot-toast";
import { updateCouponUse } from "@/app/queries/order";

const CheckoutPage = ({
  amount,
  auth,
  setCurrentStep,
  bookingDetails,
  isActive,
  orderDetails,
  clientSecret,
}: {
  amount: number;
  auth: any;
  isActive: boolean;
  setCurrentStep: any;
  bookingDetails: any;
  orderDetails: any;
  clientSecret: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const { setOrderSuccess, appliedCoupon } = useAppContext();


  const [errorMessage, setErrorMessage] = useState<string>();
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    // if (!elementReady) {
    //   setErrorMessage("Payment form is still loading, please wait.");
    //   setLoading(false);
    //   return;
    // }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // Get clientSecret from Elements context; already initialized upstream
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorModal(true);
    } else {
      const response = await updateOrderPayment({
        orderDetails,
        bookingDetails,
        stripeId: paymentIntent.id,
        status: "SUCCESSFUL",
      });

      if (auth && appliedCoupon) {
        const couponRes = await updateCouponUse(appliedCoupon, auth.user);
        if (!couponRes) {
          toast("Invalid Coupon");
          return;
        }
      }

      if (!response?.ok) {
        toast("Something went wrong");
        return;
      }

      setOrderSuccess(response);
      setCurrentStep();
      setLoading(false);
    }
  };

  //   if (!stripe || !elements) {
  //   return (
  //     <div className="p-4 text-gray-500 text-center">
  //       Payment form failed to load. Please refresh the page.
  //     </div>
  //   );
  // }

  return (
    <>
      <BookingTimer isActive={isActive} id={bookingDetails?.lodge?.refNo} />
      <PaymentError setShowDialog={setErrorModal} showDialog={errorModal} />
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        <PaymentElement onReady={()=>console.log("form ready")}/>

        {errorMessage && (
          <div className="text-red-600 text-lg mt-2">{errorMessage}</div>
        )}
        <button className="text-white w-full p-5 bg-button mt-2 rounded-md font-bold">
          {!loading ? `Pay £${amount}` : "Processing..."}
        </button>
      </form>
    </>
  );
};

export default CheckoutPage;
