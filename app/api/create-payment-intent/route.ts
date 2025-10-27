import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { getLodgeDetails } from "@/app/queries/properties";
import { calculatePrices, findDays, findDiscountAmount } from "@/lib/utils";
import { createBooking, verifyCoupon } from "@/app/queries/order";

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

console.log(process.env.STRIPE_SECRET_KEY)

export async function POST(req: Request) {
  try {
    console.log(stripe)
    const { bookingDetails, orderDetails, appliedCoupon } = await req.json();
    const { guests, lodge, dates } = bookingDetails;

    if (!guests || !lodge || !dates) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    let coupon = null;

    if (appliedCoupon) {
      coupon = await verifyCoupon(appliedCoupon?.code);
    }

    const nights = findDays(dates.from, dates.to);
    const property = await getLodgeDetails(lodge?.refNo);

    if (!property) throw new Error("Lodge not found");

    let amount = 1;

    if (coupon) {
      amount =
        findDiscountAmount(appliedCoupon, property?.price) +
        guests.pets * property.pets_fee +
        property?.cleaning_fee;
    } else {
      amount =
        calculatePrices(dates, property) +
        guests.pets * property.pets_fee +
        property?.cleaning_fee;
    }

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

    console.log(paymentIntent)


    await createBooking(
      orderDetails,
      bookingDetails,
      appliedCoupon?.code ?? null,
      null,
      paymentIntent?.id,
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
