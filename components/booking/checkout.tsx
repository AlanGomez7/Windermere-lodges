"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useAppContext } from "@/app/context/context";
import { updateOrderPayment } from "@/lib/api";
import { useRouter } from "next/navigation";
import PaymentError from "../ui/payment-error";
import BookingTimer from "./timer";

const CheckoutPage = ({
  amount,
  setCurrentStep,
  bookingDetails,
  isActive,
  orderDetails,
}: {
  amount: number;
  isActive: boolean;
  setCurrentStep: any;
  bookingDetails: any;
  orderDetails: any;
}) => {
  const { setOrderDetails, setOrderSuccess } = useAppContext();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [errorModal, setErrorModal] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [elementReady, setElementReady] = useState(false);

  useEffect(() => {
    if (orderDetails) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingDetails, orderDetails }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [amount, bookingDetails, orderDetails]);





  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);
    // Wait for PaymentElement to be mounted
    if (!elementReady) {
      setErrorMessage("Payment form is still loading, please wait.");
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
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

      setOrderSuccess(response);
      setOrderDetails({
        dates: undefined,
        guests: { adults: 2, children: 0, pets: 0, infants: 0, teens: 0 },
        lodge: undefined,
        nights: undefined,
        contactInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          postalCode: "",
          country: "",
          specialRequests: "",
        },
      });
      setCurrentStep();
      setLoading(false);
    }
  };


  if (!orderDetails) {
    return <>loading....</>;
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <BookingTimer isActive={isActive} id={bookingDetails.lodge.refNo}/>

      <PaymentError setShowDialog={setErrorModal} showDialog={errorModal} />
      {/* <Button onClick={()=>setCurrentStep()}>back</Button> */}
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        <PaymentElement onReady={() => setElementReady(true)} />

        {errorMessage && (
          <div className="text-red-600 text-lg mt-2">{errorMessage}</div>
        )}

        <button
          disabled={!stripe || loading || !elementReady}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pay £${amount}` : "Processing..."}
        </button>
      </form>
    </>
  );
};

export default CheckoutPage;
