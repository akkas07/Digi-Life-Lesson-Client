"use client";

import { useState } from "react";
import { LogoGithub } from "@gravity-ui/icons";
import { FaTwitter } from "react-icons/fa";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";
import { Globe, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <footer className="relative bg-[#0c0c0b]  text-white border-t border-default-100/10  pt-16 pb-8 px-6 lg:px-16 overflow-hidden">
      {/* Background Subtle Grid or Glow Effect */}
      <div className="" />
      <div className="absolute bottom-0 right-0 w-100 h-75 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto z-10">
        {/* Top Section: Brand & Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-default-200/5">
          {/* Brand Info (4 Columns) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="font-bold text-xl flex items-center gap-2 bg-linear-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent"
              >
                ✨{" "}
                <span className="tracking-tight  bg-linear-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                  Digital Life Lessons
                </span>
              </Link>
            </div>

            <p className="text-sm leading-relaxed max-w-sm text-white/80">
              Preserve and share your life&lsquo;s greatest lessons with a
              global community of learners and educators. Your personal wisdom
              journal, secured forever.
            </p>

            {/* Social Icons Container */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="p-2.5 rounded-xl bg-[#241F18]/40 border border-default-200/5 text-white/80 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-[#241F18]/40 border border-default-200/5 text-white/80 hover:text-pink-400 hover:border-pink-400/30 transition-all duration-300"
              >
                <BsInstagram size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-[#241F18]/40 border border-default-200/5 text-white/80 hover:text-blue-400 hover:border-blue-400/30 transition-all duration-300"
              >
                <LiaLinkedin size={18} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="p-2.5 rounded-xl bg-[#241F18]/40 border border-default-200/5 text-white/80 hover:text-red-400 hover:border-red-400/30 transition-all duration-300"
              >
                <BsYoutube size={18} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="p-2.5 rounded-xl bg-[#241F18]/40 border border-default-200/5 text-white/80 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <LogoGithub size={18} />
              </a>
            </div>
          </div>

          {/* Links Columns (7 Columns Total Split into 3 Nav Blocks) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            {/* Platform Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase border-l-2 border-purple-500 pl-2">
                Platform
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Lessons
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase border-l-2 border-violet-500 pl-2">
                Company
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Help & Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-mono font-bold tracking-widest text-violet-500 uppercase border-l-2 border-violet-500 pl-2">
                Legal
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Cookie Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F3EAD8] transition-colors"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Middle Section: Integrated Newsletter Form Row */}
        <div className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-default-200/5 text-left">
          <div className="space-y-1">
            <h5 className="text-sm font-semibold text-white/90 tracking-wide uppercase border-l-2 border-purple-500 pl-2">
              Subscribe to our newsletter
            </h5>
            <p className="text-xs text-gray-400 max-w-sm">
              Get weekly trending wisdom and system log updates straight to your
              mailbox.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="w-full md:w-auto max-w-md flex flex-col sm:flex-row gap-2"
            noValidate
          >
            <div className="relative flex-1 sm:w-64">
              <input
                type="email"
                placeholder="digiLesson@digitalLife.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status) setStatus(null);
                }}
                className="w-full  border border-default-200/10 rounded-xl px-4 py-2.5 pl-10 text-sm text-gray-400 placeholder-gray-400 focus:outline-hidden focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
            <button
              type="submit"
              className="bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-purple-600/10 active:scale-[0.98] cursor-pointer"
            >
              Join
            </button>
          </form>
        </div>

        {/* Bottom Section: Copyright & Regional selectors */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <p>© 2026 Digital Life Lessons, Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 hover:text-white/80 transition-colors cursor-pointer">
              <Globe size={14} />
              <span>English</span>
            </button>
            <button className="hover:text-white/80 transition-colors cursor-pointer">
              Worldwide
            </button>
          </div>
        </div>
      </div>

      {/* Floating Status Toast Notification */}
      {status === "success" && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 px-4 py-3 rounded-xl text-xs font-mono shadow-xl backdrop-blur-md animate-fadeIn">
          ✓ Thanks for subscribing! Check your inbox.
        </div>
      )}
      {status === "error" && (
        <div className="fixed bottom-5 right-5 z-50 bg-rose-950/90 text-rose-300 border border-rose-500/30 px-4 py-3 rounded-xl text-xs font-mono shadow-xl backdrop-blur-md animate-fadeIn">
          ✕ Please enter a valid email address.
        </div>
      )}
    </footer>
  );
}
