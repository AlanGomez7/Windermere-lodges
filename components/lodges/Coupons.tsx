import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { verifyCoupon } from "@/app/queries/order";
import { useAppContext } from "@/app/context/context";
import toast from "react-hot-toast";

export default function Coupons() {
  const [couponCode, setCouponCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

      {/* {!searchParams?.dates?.from && !searchParams?.dates?.to && (
        <p className="text-yellow-500 text-sm py-3">
          Please select your trip dates to apply a coupon!
        </p>
      )} */}

      <div className="flex gap-3">
        <input
          value={appliedCoupon?.code || couponCode}
          className="bg-secondary rounded-md focus:outline-emerald-600 w-3/4 lg:w-2/4 px-3 py-1"
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
  );
}
