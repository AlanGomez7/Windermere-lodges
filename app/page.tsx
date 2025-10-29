import { Hero } from "@/components/hero";
import { BookingSection } from "@/components/booking-section";
import { FeaturedLodges } from "@/components/featured-lodges";
import { Amenities } from "@/components/amenities";
import { Activities } from "@/components/activities";
import { Testimonials } from "@/components/testimonials";
import Footer from "@/components/footer";
import { fetchProperties } from "@/lib/api";
import CookieModal from "@/components/ui/cookie-modal";

export default async function Home() {
  const lodges = await fetchProperties();

  return (
    <>
      <CookieModal/>
      <Hero />
      <BookingSection lodges={lodges} />
      <FeaturedLodges lodges={lodges} />
      <Amenities />
      <Activities />
      <Testimonials />
      <Footer />
    </>
  );
}
