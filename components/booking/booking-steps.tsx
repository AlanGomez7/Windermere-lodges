"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface BookingStepsProps {
  currentStep: number;
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  const steps = [
    { id: 1, name: "Lodge Selection" },
    { id: 2, name: "Guest Information" },
    { id: 3, name: "Extras" },
    { id: 4, name: "Payment" },
    // { id: 4, name: "Confirmation" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="w-full">
          <nav aria-label="Progress">
            <ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
              {steps.map((step) => (
                <li key={step.id} className="md:flex-1">
                  <div
                    className={cn(
                      "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                      step.id < currentStep
                        ? "border-teal-600"
                        : step.id === currentStep
                        ? "border-teal-600"
                        : "border-gray-200"
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm font-medium",
                        step.id < currentStep
                          ? "text-teal-600"
                          : step.id === currentStep
                          ? "text-teal-600"
                          : "text-gray-500"
                      )}
                    >
                      <span className="flex items-center">
                        {step.id < currentStep ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white">
                            <Check className="h-3 w-3" />
                          </span>
                        ) : step.id === currentStep ? (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-teal-600 text-teal-600">
                            {step.id}
                          </span>
                        ) : (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 text-gray-500">
                            {step.id}
                          </span>
                        )}
                        <span className="ml-2">{step.name}</span>
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
