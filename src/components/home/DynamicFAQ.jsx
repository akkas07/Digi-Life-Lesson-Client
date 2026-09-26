"use client";

import { Accordion, AccordionItem, Button } from "@heroui/react";
import { HelpCircle, MessageSquare, ArrowUpRight, ShieldCheck, Sparkles, Sliders, Key } from "lucide-react";

const faqData = [
  {
    id: "1",
    question: "How does the AI extract insights from my journal?",
    answer: "Our advanced processing system securely analyzes your daily entry structures, extracts behavioral patterns, and cross-references your philosophy to pinpoint mental milestones and consistency metrics without reading raw private details.",
    icon: <Sparkles className="text-violet-400" size={18} />
  },
  {
    id: "2",
    question: "What makes the database zero-knowledge secured?",
    answer: "Every lesson is encrypted client-side using military-grade AES-256 before hitting the server. This means only you possess the master decryption key, keeping your personal vulnerability entirely hidden from everyone—including us.",
    icon: <Key className="text-orange-400" size={18} />
  },
  {
    id: "3",
    question: "Can I selectively share a breakthrough with friends?",
    answer: "Yes. By default, your vault is entirely isolated. However, if you find a lesson that can compound someone else's growth, you can generate a cryptographically signed public link with single-click precision.",
    icon: <ShieldCheck className="text-emerald-400" size={18} />
  },
  {
    id: "4",
    question: "How does the platform prevent repetition of errors?",
    answer: "When starting a new challenging project, you can toggle the 'Pattern Alarm' feature. It surfaces targeted notifications containing lessons you documented during previous historical failures so you can sidestep structural traps.",
    icon: <Sliders className="text-cyan-400" size={18} />
  }
];

export default function DynamicFAQ() {
  return (
    <section className="relative py-24 px-6 lg:px-16 bg-background overflow-hidden border-t border-default-100">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-125 h-125 bg-violet-500/5 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 left-10 w-75 h-75 bg-orange-500/5 rounded-full blur-[120px] -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Call-To-Action Box */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/10 text-xs font-semibold text-violet-400">
                <HelpCircle size={14} />
                <span>Intellectual Hub</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                Answering Your <br />
                <span className="bg-linear-to-r from-violet-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">Curiosities</span>
              </h2>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                Got edge cases on mind? Dive into the deep technical core mechanics of how our private thought vault system alters your cognitive patterns.
              </p>
            </div>

            {/* Live Support Box */}
            <div className="p-6 rounded-[28px] border border-default-200/50 bg-default-50/10 backdrop-blur-md relative overflow-hidden group shadow-lg">
              <div className="absolute -right-6 -bottom-6 p-6 rounded-full bg-linear-to-br from-violet-500/10 to-indigo-500/0 text-violet-500/20 scale-150 group-hover:scale-175 transition-transform duration-500">
                <MessageSquare size={48} />
              </div>
              
              <div className="space-y-4 relative z-10">
                <h4 className="text-base font-bold text-foreground">Still scratching your head?</h4>
                <p className="text-xs text-default-400 leading-relaxed">
                  Our core architectural engineers can decode your infrastructure or cryptography inquiries in real time.
                </p>
                <Button
                  radius="full"
                  size="sm"
                  className="font-semibold bg-linear-to-r from-violet-500 to-indigo-600 text-white shadow-md shadow-indigo-500/10 hover:opacity-95 transition-opacity mt-2"
                  endContent={<ArrowUpRight size={14} />}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Custom Accordions */}
          <div className="lg:col-span-8 w-full">
            <Accordion 
              variant="light"
              className="px-0 gap-4 flex flex-col"
              itemClasses={{
                base: "w-full p-5 md:p-6 rounded-[24px] border border-default-200/50 bg-default-50/10 backdrop-blur-md shadow-xs hover:border-default-300 transition-all duration-300 data-[open=true]:border-violet-500/30 data-[open=true]:bg-default-50/30",
                title: "text-sm md:text-base font-bold text-foreground/90 transition-colors data-[open=true]:text-violet-400",
                trigger: "py-0 gap-3 flex items-center justify-between",
                indicator: "text-default-400 data-[open=true]:text-violet-400 transition-transform duration-300",
                content: "text-xs md:text-sm text-foreground/60 leading-relaxed pt-4 border-t border-default-100/50 mt-4"
              }}
            >
              {faqData.map((item) => (
                <AccordionItem
                  key={item.id}
                  aria-label={item.question}
                  title={
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="p-2 rounded-xl bg-background border border-default-200/60 shadow-xs">
                        {item.icon}
                      </div>
                      <span>{item.question}</span>
                    </div>
                  }
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}