import { NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    let product = null;
    // if (productId) {
    //   product = products.find(p => p.id === productId);
    //   if (!product) {
    //     return NextResponse.json(
    //       { error: 'Product not found' },
    //       { status: 404 }
    //     );
    //   }
    // }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    //   metadata: product ? {
    //     productId: product.id,
    //     productName: product.name,
    //   } : undefined,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
} 