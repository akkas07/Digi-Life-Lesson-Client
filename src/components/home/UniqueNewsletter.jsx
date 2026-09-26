"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Mail, CheckCircle2, Sparkles, ArrowRight, Gift, Terminal } from "lucide-react";

export default function UniqueNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
    }, 1200);
  };

  return (
    <section className="relative py-24 px-6 lg:px-16 bg-background overflow-hidden border-t border-default-100">
      {/* Background Cyber Mesh & Light Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-linear-to-r from-violet-500/10 to-cyan-500/10 rounded-full blur-[140px] -z-10" />

      {/* Main Center Container */}
      <div className="w-full max-w-4xl mx-auto relative">
        
        {/* Animated Inner Box */}
        <div className="relative p-8 md:p-12 rounded-[40px] border border-default-200/60 bg-default-50/10 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500">
          
          {/* Decorative Corner Icon */}
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Terminal size={180} />
          </div>

          {!isSubscribed ? (
            /* --- STATE 1: UN-SUBSCRIBED INPUT FORM --- */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-xs font-semibold text-violet-400">
                  <Sparkles size={12} />
                  <span>Weekly Philosophy Brief</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  Stay Updated with <br />
                  <span className="bg-linear-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Latest Wisdom</span>
                </h3>
                <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
                  Join 5,000+ intellectual minds mapping patterns. Zero spam. Unsubscribe with one click anytime.
                </p>
              </div>

              {/* Right Input Form */}
              <div className="lg:col-span-6 w-full">
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative p-2 rounded-[24px] border border-default-200/80 bg-background/60 backdrop-blur-md flex flex-col sm:flex-row gap-2 items-center shadow-xs focus-within:border-violet-500/50 transition-all">
                    <Input
                      type="email"
                      placeholder="Enter your private email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      variant="flat"
                      radius="full"
                      size="lg"
                      startContent={<Mail size={18} className="text-default-400 shrink-0" />}
                      className={{
                        base: "w-full bg-transparent",
                        mainWrapper: "h-full",
                        input: "text-sm text-foreground placeholder:text-default-400",
                        inputWrapper: "bg-transparent shadow-none data-[hover=true]:bg-transparent text-foreground h-12",
                      }}
                    />
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      radius="full"
                      className="w-full sm:w-auto px-6 h-12 font-bold bg-linear-to-r from-violet-500 via-purple-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:opacity-95 transition-opacity"
                      endContent={!isLoading && <ArrowRight size={16} />}
                    >
                      Subscribe
                    </Button>
                  </div>
                </form>
              </div>

            </div>
          ) : (
            /* --- STATE 2: TOTALLY UNIQUE SUCCESS BLOCK --- */
            <div className="text-center py-6 space-y-6 animate-scaleUp">
              
              {/* Dynamic Center Glowing Badge */}
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/5 animate-pulse">
                <CheckCircle2 size={32} />
              </div>

              {/* Custom Success Header */}
              <div className="space-y-2 max-w-lg mx-auto">
                <h4 className="text-2xl font-extrabold text-foreground tracking-tight">
                  Welcome to the Inner Circle!
                </h4>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  Your encrypted handshake is complete. We&apos;ve just dispatched a verification ticket along with our secret <span className="text-cyan-400 font-semibold">Mental Architecture&quot;</span> starter guide directly to:
                </p>
                
                {/* Visual Email Highlight Tag */}
                <div className="inline-block mt-2 px-4 py-1.5 rounded-xl border border-default-200 bg-background/80 font-mono text-xs text-violet-400 font-medium">
                  {email}
                </div>
              </div>

              {/* Unique Bonus Gift Call-Out Layout */}
              <div className="max-w-md mx-auto p-4 rounded-2xl border border-dashed border-emerald-500/20 bg-emerald-500/5 flex items-center gap-4 text-left">
                <div className="p-3 rounded-xl bg-emerald-500 text-background shrink-0">
                  <Gift size={20} />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-foreground">Immediate Perks Unlocked</h5>
                  <p className="text-[11px] text-default-400 leading-normal">
                    Check your updates folder. Your early access key code is bundled with your first breakdown module.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}