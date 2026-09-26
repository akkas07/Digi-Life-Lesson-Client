import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/actions/core/getSession";


export async function POST() {


  try {
    const headersList = await headers();
    // Fallback to localhost if the origin header is missing
    const origin = headersList.get("origin");

      const user = await getSession();
     
    

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price: "price_1TmmtK1MJV9EmRaZJ51RaOhP",
          quantity: 1,
        },
      ],
      mode: "payment", // Change 'subscription' to 'payment'
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
