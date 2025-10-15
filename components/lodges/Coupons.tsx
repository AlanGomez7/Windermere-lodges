import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { verifyCoupon } from "@/app/queries/order";
import { useAppContext } from "@/app/context/context";

export default function Coupons() {
  const [coupon, setCoupon] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { setAppliedCoupon, searchParams, appliedCoupon } = useAppContext();

  type CouponType = {
    id: string;
    description: string;
    code: string;
    discountType: string;
    discountValue: number;
    maxUsesPerUser: number;
    expiresAt: Date | null;
    isActive: boolean;
  } | null;

  useEffect(() => {
    setError(false);
    setSuccess(false);
  }, [searchParams]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    try {
      const response: CouponType = await verifyCoupon(coupon);
      console.log(response);

      if (response) {
        setAppliedCoupon(response);
        setSuccess(true);
        setCoupon(response);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <p className="text-red-500 text-sm py-3">Invalid Coupon code</p>
      )}

      {success && (
        <p className="text-green-700 text-sm py-3">
          Coupon code {coupon.code} applied{" "}
        </p>
      )}

      {!searchParams?.dates?.from &&
        !searchParams?.dates?.to &&
        !appliedCoupon && (
          <p className="text-yellow-500 text-sm py-3">
            Please select your trip days to apply coupon!
          </p>
        )}

      <div className="flex gap-5 ">
        <input
          value={appliedCoupon?.code || coupon || ""}
          className="bg-secondary rounded-md focus:outline-emerald-600 w-3/4 lg:w-2/4 px-3"
          onChange={(e) => setCoupon(e.target.value)}
          disabled={
            (!searchParams?.dates?.from && !searchParams?.dates?.to) ||
            appliedCoupon?.code
          }
        />

        <Button
          className="bg-emerald-600 hover:bg-emerald-500"
          onClick={handleSubmit}
          disabled={
            (!searchParams?.dates?.from && !searchParams?.dates?.to) ||
            appliedCoupon?.code
          }
        >
          Apply code
        </Button>
      </div>
    </>
  );
}
