"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/app/context/context";
import { confirmBooking } from "@/lib/api";
import toast from "react-hot-toast";

interface ExtrasProps {
  onContinue: (data: any) => void;
  onBack?: () => void;
  bookingDetails: any;
  isActive: boolean;
  setCurrentStep: () => void;
}

export function Extras({
  onBack,
  bookingDetails,
  isActive,
  setCurrentStep,
}: ExtrasProps) {
  const { orderDetails, searchParams } = useAppContext();
  const [extras, setExtras] = useState<any[]>(bookingDetails.extras || []);


  const availableExtras = [
    {
      id: "welcome-hamper",
      name: "Welcome Hamper",
      description: "A selection of local produce, snacks, and drinks",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "breakfast-basket",
      name: "Breakfast Basket",
      description:
        "Fresh local ingredients for a full English breakfast delivered daily",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "champagne",
      name: "Champagne & Chocolates",
      description:
        "Bottle of premium champagne with luxury handmade chocolates",
      price: 55,
      image:
        "https://images.unsplash.com/photo-1567013275689-c179a874478f?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "spa-package",
      name: "In-Lodge Spa Package",
      description: "Luxurious spa treatments in the comfort of your lodge",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "bbq-pack",
      name: "BBQ Pack",
      description:
        "Premium meat selection with all accompaniments for a perfect BBQ",
      price: 65,
      image:
        "https://images.unsplash.com/photo-1529350525428-32626f3db2af?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "anniversary",
      name: "Anniversary/Birthday Package",
      description: "Decorations, cake, and a special gift for your celebration",
      price: 75,
      image:
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=300&auto=format&fit=crop",
    },
  ];

  const toggleExtra = (extraId: string) => {
    setExtras((prev) => {
      const isSelected = prev.some((e) => e.id === extraId);

      if (isSelected) {
        return prev.filter((e) => e.id !== extraId);
      } else {
        const extraToAdd = availableExtras.find((e) => e.id === extraId);
        return [...prev, extraToAdd];
      }
    });
  };

  const isExtraSelected = (extraId: string) => {
    return extras.some((e) => e.id === extraId);
  };

  const handleContinue = async () => {
    
    console.log({ form: orderDetails, bookingDetails })
    const response = await confirmBooking({ form: orderDetails, searchParams });

    if(response.ok){
      toast.success(response.message)
      setCurrentStep();
    }else{
      toast.error(response.message)
    }
  };

  return (
    <section
      className={`px-16 mb-5 min-h-screen flex justify-center ${
        isActive ? "block" : "hidden"
      }`}
    >
      <div className="container">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enhance Your Stay</CardTitle>
              <CardDescription>
                Add these optional extras to make your stay even more special
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableExtras.map((extra) => (
                  <div
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`cursor-pointer rounded-lg border p-4 transition-all ${
                      isExtraSelected(extra.id)
                        ? "border-teal-600 bg-teal-50"
                        : "hover:border-gray-300"
                    }`}
                  >
                    <div className="aspect-square w-full overflow-hidden rounded-md mb-3">
                      <img
                        src={extra.image || "/placeholder.svg"}
                        alt={extra.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{extra.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {extra.description}
                        </p>
                      </div>
                      <div className="text-teal-600 font-bold">
                        £{extra.price}
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button
                        variant={
                          isExtraSelected(extra.id) ? "default" : "outline"
                        }
                        className={`w-full ${
                          isExtraSelected(extra.id)
                            ? "bg-teal-600 hover:bg-teal-700"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExtra(extra.id);
                        }}
                      >
                        {isExtraSelected(extra.id)
                          ? "Selected"
                          : "Add to Booking"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

    

          <div className="flex justify-between">
            <Button onClick={onBack} variant="outline">
              Back
            </Button>
            <Button
              onClick={handleContinue}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// try {
//   const result = await fetch(
//     "http://localhost:3001/api/order/confirm-order",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ form: orderDetails, searchParams }),
//     }
//   );

//   console.log(result);
//   // Reload the list
// } catch (error) {
//   toast.error(error instanceof Error ? error.message : "Failed to Book");
// }
