import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getLodgeDetails } from "@/app/queries/properties";
import { findDays } from "@/lib/utils";
import { confirmBooking } from "@/lib/api";
import { createBooking } from "@/app/queries/order";

type booking = {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  mobile: string;
  arrivalDate: string;
  departureDate: string;
  adults: number | null;
  children: number | null;
  propertyId: string;
};

export async function POST(req: Request) {
  try {
    const { bookingDetails, orderDetails } = await req.json();
    const { guests, lodge, dates } = bookingDetails;

    if (!guests || !lodge || !dates) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const nights = findDays(dates.from, dates.to);

    const property = await getLodgeDetails(lodge?.refNo);

    if (!property) throw new Error("Lodge not found");

    const amount =
      property?.price * nights +
      guests.pets * property.pets_fee +
      property?.cleaning_fee;

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(orderDetails);
    console.log("________________________________________________________")
    console.log(bookingDetails);



    await createBooking(
      orderDetails,
      bookingDetails,
      null,
      paymentIntent.id,
      amount
    );

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Error creating payment intent" },
      { status: 500 }
    );
  }
}
