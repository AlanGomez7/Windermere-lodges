import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { verifyCoupon } from "@/app/queries/order";
import { useAppContext } from "@/app/context/context";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function Coupons() {
  const [couponCode, setCouponCode] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { setAppliedCoupon, searchParams, appliedCoupon } = useAppContext();

  const handleSubmit = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    if (!searchParams?.dates?.from || !searchParams?.dates?.to) {
      toast.error("Please select your trip dates first");
      return;
    }

    try {
      setStatus("loading");
      const response = await verifyCoupon(couponCode);

      if (response) {
        setAppliedCoupon(response);
        setStatus("success");
        toast.success(`Coupon ${response.code} applied successfully`);
      } else {
        setStatus("error");
        toast.error("Invalid or expired coupon");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Something went wrong");
    } finally {
      setStatus("idle");
    }
  };

  const handleRemove = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setStatus("idle");
    toast.error("Coupon removed");
  };

  return (
    <>
      <div>
        {appliedCoupon && (
          <p className="text-green-700 text-sm py-3">
            Coupon <strong>{appliedCoupon.code}</strong> applied (
            {appliedCoupon.discountType === "PERCENTAGE"
              ? `${appliedCoupon.discountValue}% off`
              : `£${appliedCoupon.discountValue} off`}
            )
          </p>
        )}

        <div className="flex gap-3 w-full">
          <input
            value={appliedCoupon?.code || couponCode}
            className="bg-white rounded-md focus:outline-emerald-600 w-4/5 px-3 py-1"
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={!!appliedCoupon}
          />

          {appliedCoupon ? (
            <Button
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-50"
              onClick={handleRemove}
            >
              Remove
            </Button>
          ) : (
            <Button
              className="bg-emerald-600 hover:bg-emerald-500"
              onClick={handleSubmit}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Applying..." : "Apply Code"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

// {showDialog && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 sm:p-6">
//     <div
//       className="
//     fixed bottom-0 left-0 right-0 z-50
//     bg-white rounded-t-2xl shadow-2xl border border-gray-200
//     w-full max-h-[90vh] sm:max-h-fit p-6
//     sm:inset-0 sm:m-auto sm:max-w-2xl sm:rounded-2xl sm:p-10
//     flex flex-col
//     "
//       // style={{ scrollbarGutter: "stable", transform: "translateY(100%)" }}
//     >
//       <button
//         type="button"
//         className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         onClick={() => setShowDialog(false)}
//       >
//         <X className="w-6 h-6" />
//       </button>
//       <p className="py-4 text-xl">Apply coupon</p>

//       {/* Content */}

//     </div>
//   </div>
// )}
