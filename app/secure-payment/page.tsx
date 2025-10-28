import { auth } from "@/auth";
import StripePayment from "@/components/booking/stripe-payment";

export default async function PaymentWrapper() {
    
  const session = await auth();
  return (
    <>
      <StripePayment auth={session} />
    </>
  );
}
