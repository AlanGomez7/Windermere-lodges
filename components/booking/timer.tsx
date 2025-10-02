"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingTimer({ isActive, id }: { isActive: boolean, id:string }) {
  const TIMER_DURATION = 2 * 60; // 2 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [expired, setExpired] = useState(false);
  const router = useRouter();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!isActive) return;
    setTimeLeft(TIMER_DURATION);
    setExpired(false);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  // Redirect a few seconds after expired
  useEffect(() => {
    if (expired) {
      const timeout = setTimeout(() => {
        // router.replace(`/our-lodges/${id}`); // go home
      }, 3000); // wait 3 seconds
      return () => clearTimeout(timeout);
    }
  }, [expired, router]);

  return (
    <div className="w-full flex justify-center mb-6">
      {!expired ? (
        <div
          className={`px-6 py-3 rounded-lg text-lg font-semibold shadow flex items-center gap-3 ${
            timeLeft <= 60
              ? "bg-orange-200 text-orange-800 animate-pulse border-2 border-orange-500"
              : "bg-red-100 text-red-700"
          }`}
        >
          <span role="img" aria-label="warning" className="text-2xl">
            ⏰
          </span>
          {timeLeft <= 60 ? (
            <span>
              Hurry! Only{" "}
              <span className="font-bold">{formatTime(timeLeft)}</span> left to
              complete your payment and secure your booking.
            </span>
          ) : (
            <span>
              Complete your payment within{" "}
              <span className="font-bold">{formatTime(timeLeft)}</span> to
              secure your booking!
            </span>
          )}
        </div>
      ) : (
        <div className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg text-lg font-semibold shadow">
          Session expired. Your booking was not secured. Redirecting to home...
        </div>
      )}
    </div>
  );
}
