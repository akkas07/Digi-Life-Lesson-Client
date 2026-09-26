import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    try {
      await auth.api.updateUser({
        headers: await headers(),
        body: { plan: "premium", isPremium: true },
      });
    } catch (error) {
      console.error("Failed to activate premium access", error);
    }

    return (
      <main className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center p-6 antialiased relative overflow-hidden">
        {/* Glowing Violet Decorative Background Effects to match your landing page */}
        <div className="absolute top-[-10%] left-[-10%] w-150 h-150 rounded-full bg-[#6366F1]/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 rounded-full bg-[#A855F7]/10 blur-[130px] pointer-events-none" />

        {/* Card Container (Matches your dark theme inputs/cards) */}
        <div className="max-w-112.5 w-full bg-[#131926] border border-gray-800/60 rounded-[32px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] px-8 py-12 text-center flex flex-col items-center relative z-10">
          {/* Violet/Purple Animated Icon Badge */}
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/30 mb-8 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <svg
              className="h-8 w-8 text-[#A855F7]"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
            Wisdom Unlocked!
          </h1>

          {/* Violet Accent Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6366F1]/10 text-[#A855F7] text-xs font-semibold tracking-wide uppercase mb-6 border border-[#6366F1]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-ping" />
            Payment Successful
          </div>

          <p className="text-gray-400 text-[15px] leading-relaxed max-w-85 mb-8">
            Thank you for investing in your journey. Your secure vault for
            storing personal growth insights is now completely active.
          </p>

          {/* Membership Premium Active Container */}
          <div className="w-full bg-[#1E2638]/50 rounded-2xl p-5 text-left border border-gray-800/80 flex items-start gap-4 mb-8">
            <div className="text-[#A855F7] bg-[#A855F7]/10 p-2.5 rounded-xl mt-0.5 border border-[#A855F7]/20">
              {/* Star/Sparkle Icon matching your upgrade logo */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499c.15-.426.755-.426.906 0l1.59 4.887a.45.45 0 00.428.308h5.143c.452 0 .639.577.273.843l-4.161 3.023a.45.45 0 00-.164.506l1.59 4.888c.15.426-.341.783-.707.54L12.23 15.33a.45.45 0 00-.53 0l-4.162 3.024c-.366.243-.857-.114-.707-.541l1.59-4.888a.45.45 0 00-.164-.506L4.032 9.541c-.366-.266-.18-.843.272-.843h5.143a.45.45 0 00.428-.308l1.59-4.887z"
                ></path>
              </svg>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-1">
                Premium Membership Active
              </h4>
              <p className="text-gray-400 text-xs leading-normal">
                Unlimited access to locked lessons and journals. A confirmation
                receipt has been sent to{" "}
                <span className="text-gray-200 font-medium">
                  {customerEmail}
                </span>
                .
              </p>
            </div>
          </div>

          {/* Action Button (Matches your exact purple button) */}
          <Link
            href="/public-lessons"
            className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white bg-[#6366F1] hover:bg-[#5356E2] font-semibold text-base transition-all duration-200 shadow-[0_4px_20px_rgba(99,102,241,0.3)] active:scale-[0.99] mb-5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
            Explore more lesson
          </Link>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Link
              href="/public-lessons"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2.5 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/20"
            >
              Explore Premium Lessons
            </Link>
            <Link
              href="/"
              className="inline-flex flex-1 items-center justify-center gap-2 text-gray-400 hover:text-white font-medium text-sm transition-colors duration-200"
            >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
