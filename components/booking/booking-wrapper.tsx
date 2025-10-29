"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { GuestInformation } from "@/components/booking/guest-information";
import { useAppContext } from "../../app/context/context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { MapPin } from "lucide-react";
import GuestInformationSkeleton from "../ui/shimmers/info-shimmer";

export default function BookingWrapper({ auth }: { auth: any }) {
  const { searchParams, setDetails } = useAppContext();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [orderDetails, setOrderDetails] = useState<any>();
  const [loading, setLoading] = useState(false);

  function formatLocalDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    setLoading(true);

    if (!searchParams?.dates) {
      router.replace("/our-lodges");
      return;
    }

    try {
      const detailsStr = localStorage.getItem("order");
      let details: any = detailsStr ? JSON.parse(detailsStr) : {};

      // Format dates as local YYYY-MM-DD to prevent timezone shifts
      const fromLocal = formatLocalDate(new Date(searchParams.dates.from));
      const toLocal = formatLocalDate(new Date(searchParams.dates.to));

      details = { ...details, dates: { from: fromLocal, to: toLocal } };
      // localStorage.setItem("order", JSON.stringify(details));
      setDetails(details);
      setOrderDetails(details);
    } catch (err) {
      console.error("Error parsing/saving order in localStorage", err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  if (!orderDetails) {
    return <GuestInformationSkeleton />; // or redirect
  }

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Book Your Stay"
        description="Secure your perfect Lake District getaway"
        backgroundImage={orderDetails?.lodge?.images[2] || "/placeholder.jpg"}
      />
      <div className="p-2 lg:px-28 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 bg-white"
              onClick={() => router.push("/our-lodges")}
              aria-label="Go back to our lodges"
            >
              <Icons.chevronLeft className="h-6 w-6" />
            </Button>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl text-gray-800">
                {orderDetails?.lodge.nickname}
              </h1>
              <p className="text-sm text-gray-600 flex pt-4">
                <MapPin className="mr-2 h-5 w-5 text-emerald-400 flex-shrink-0" />

                {orderDetails?.lodge.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <BookingSteps currentStep={currentStep} /> */}

      {!orderDetails ? (
        <GuestInformationSkeleton />
      ) : (
        <GuestInformation
          bookingDetails={orderDetails}
          onBack={() => setCurrentStep((s) => s - 1)}
          isActive={currentStep === 2}
          setCurrentStep={() => setCurrentStep(currentStep + 1)}
        />
      )}
    </main>
  );
}
