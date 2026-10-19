"use client";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-[#fff7f8] font-sans text-center py-14 px-4 sm:px-6">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        
        {/* Italic Top Text */}
        <p className="font-serif italic text-sm text-[#4c342b] mb-4">
          Join our circle — stories, scents, and soulful drops.
        </p>

        {/* Subscribe Form */}
        <form
          className="w-full max-w-[420px] space-y-3 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setDone(true);
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Your email address"
            className="w-full px-4 py-3 bg-white border border-[#d8c2c5] rounded-md text-xs text-[#2c1d18] focus:outline-none focus:border-[#8d1239]"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-md text-[#2c1d18] font-semibold text-xs bg-gradient-to-r from-[#dec396] to-[#cba672] hover:opacity-95 transition-opacity shadow-sm"
          >
            {done ? "Subscribed ✓" : "Subscribe"}
          </button>
        </form>

        {/* Email & Note */}
        <div className="text-xs text-[#4c342b] mb-6 space-y-1">
          <a
            href="mailto:hello@roohveere.com"
            className="font-bold hover:underline inline-block"
          >
            hello@roohveere.com
          </a>
          <span className="text-[#88747a]"> — we&apos;re here with heart and intention</span>
        </div>

        {/* Social Icons (Instagram, Facebook, WhatsApp) */}
        <div className="flex items-center justify-center gap-6 mb-8 text-[#2c1d18]">
          <a
            href="https://www.instagram.com/roohveere/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-[#8d1239] transition-colors"
          >
            {/* Instagram Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>

          <a
            href="https://www.facebook.com/people/Rooh-Veere/61577770144355/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="hover:text-[#8d1239] transition-colors"
          >
            {/* Facebook Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>

          <a
            href="https://wa.me/923122344718?text=Hello%20Rooh%20Veere"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="hover:text-[#8d1239] transition-colors"
          >
            {/* WhatsApp Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <small className="text-[11px] text-[#88747a]">
          © 2026 RoohVeere By Sirishti Chhabria. All rights reserved.
        </small>

      </div>
    </footer>
  );
}
