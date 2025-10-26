"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingTimer({
  isActive,
  id,
}: {
  isActive: boolean;
  id: string;
}) {
  const TIMER_DURATION = 5 * 60; // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [expired, setExpired] = useState(false);
  const router = useRouter();

  // store start time and interval reference between renders
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // store timestamp when the timer starts
    startTimeRef.current = Date.now();
    setTimeLeft(TIMER_DURATION);
    setExpired(false);

    intervalRef.current = setInterval(() => {
      if (!startTimeRef.current) return;

      // calculate elapsed time since start in seconds
      const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = TIMER_DURATION - elapsedSeconds;

      if (remaining <= 0) {
        clearInterval(intervalRef.current!);
        setTimeLeft(0);
        setExpired(true);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    // cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  // redirect after expiration
  useEffect(() => {
    if (expired) {
      const timeout = setTimeout(() => {
        router.replace(`/our-lodges/${id}`);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [expired, router, id]);

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
