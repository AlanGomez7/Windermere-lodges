import { auth } from "@/auth";
import BookingWrapper from "@/components/booking/booking-wrapper";
import Footer from "@/components/footer";

export default async function BookingPage() {
  const session = await auth()
  return (
    <>
      <BookingWrapper auth={session}/>
      <Footer />
    </>
  );
}
