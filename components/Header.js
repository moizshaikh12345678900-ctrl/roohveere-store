"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header({
  cartCount = 0,
  onOpenCart = () => {},
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-[#f5e9ec]/60 bg-white/55 shadow-[0_4px_24px_rgba(73,19,42,0.05)] backdrop-blur-xl backdrop-saturate-150"
          : "border-[#f5e9ec] bg-white"
      }`}
    >
      <div
        className={`
          grid w-full items-center gap-4 px-5
          grid-cols-[110px_minmax(0,1fr)_44px]
          transition-[height] duration-300
          lg:grid-cols-[130px_minmax(0,1fr)_52px] lg:gap-6 lg:px-8
          max-[560px]:grid-cols-[62px_minmax(0,1fr)_36px]
          max-[560px]:gap-2 max-[560px]:px-3
          ${
            scrolled
              ? "h-[66px] lg:h-[70px] max-[560px]:h-[58px]"
              : "h-[84px] lg:h-[92px] max-[560px]:h-[68px]"
          }
        `}
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="RoohVeere home"
          className="
            flex w-[88px] flex-col items-center justify-center
            text-[#211a1b] no-underline
            max-[560px]:w-[60px]
          "
        >
          <span className="font-serif text-[21px] font-bold leading-[0.85] tracking-[-1.2px] max-[560px]:text-[16px] max-[560px]:tracking-[-0.8px]">
            ROOH
          </span>

          <span className="mt-1 font-serif text-[12px] font-semibold leading-none tracking-[4px] max-[560px]:text-[9px] max-[560px]:tracking-[2.5px]">
            VEERE
          </span>

          <span className="mt-1.5 whitespace-nowrap font-serif text-[7px] italic text-[#9a7a80] max-[560px]:mt-1 max-[560px]:text-[5px]">
            by Sirishti Chhabria
          </span>
        </Link>

        {/* Announcement Bar */}
        <div
          className={`
            relative flex w-full max-w-[820px]
            justify-self-center overflow-hidden rounded-full
            border text-[#8d1239]
            transition-[background-color,border-color,box-shadow,height] duration-300
            h-[40px] lg:h-[44px] max-[560px]:h-[32px]
            ${
              scrolled
                ? "border-[#f8dfe5]/70 bg-white/50 shadow-none"
                : "border-[#f8dfe5] bg-[#fffdfd] shadow-[0_4px_16px_rgba(142,21,59,0.05)]"
            }
          `}
        >
          <div className="announcement-track flex w-max shrink-0 items-center gap-8 pl-5 text-[12px] sm:gap-10 sm:text-[13px] max-[560px]:gap-4 max-[560px]:pl-3 max-[560px]:text-[10px]">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                aria-hidden={index === 1 ? "true" : undefined}
                className="flex shrink-0 items-center gap-8 sm:gap-10 max-[560px]:gap-4"
              >
                <span>Kiss Launch</span>
                <span className="text-[#d9a7b5]">◆</span>

                <strong className="font-semibold">10% OFF DUO BUNDLES</strong>

                <span className="text-[#d9a7b5]">◆</span>
                <span>
                  <strong className="mr-1 font-semibold">NEW</strong>
                  Desire &amp; Luna Kiss Launch
                </span>

                <span className="text-[#d9a7b5]">◆</span>
                <span>Rooted In Soul, Worn With Pride</span>

                <span className="text-[#d9a7b5]">◆</span>
                <strong className="font-semibold">
                  Complimentary gift packaging
                </strong>

                <span className="text-[#d9a7b5]">◆</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Button */}
        <button
          type="button"
          onClick={onOpenCart}
          aria-label={`Open shopping bag${
            cartCount > 0 ? `, ${cartCount} items` : ""
          }`}
          className={`
            relative grid h-10 w-10 place-items-center
            justify-self-end rounded-xl
            border border-transparent
            text-[#4b5664]
            transition duration-200
            hover:border-[#ead1d9] hover:bg-[#fff0f4]
            hover:text-[#8d1239]
            active:scale-95
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[#8d1239]
            focus-visible:ring-offset-2
            max-[560px]:h-9 max-[560px]:w-9
            ${scrolled ? "bg-white/50" : "bg-[#f4f5f7]"}
          `}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 max-[560px]:h-[18px] max-[560px]:w-[18px]"
            aria-hidden="true"
          >
            <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6" />
            <circle cx="10" cy="20" r="1.2" />
            <circle cx="18" cy="20" r="1.2" />
          </svg>

          {cartCount > 0 && (
            <span
              className="
                absolute -right-1.5 -top-1.5
                grid h-[18px] min-w-[18px] place-items-center
                rounded-full bg-[#8d1239] px-1
                text-[10px] font-bold text-white
                ring-2 ring-white
              "
            >
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}