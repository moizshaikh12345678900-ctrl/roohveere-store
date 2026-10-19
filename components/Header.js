
"use client";

import Link from "next/link";

export default function Header({
  cartCount = 0,
  onOpenCart = () => {},
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f5e9ec] bg-white/95 backdrop-blur-md">
      <div
        className="
          grid h-[118px] w-full
          grid-cols-[150px_minmax(0,1fr)_56px]
          items-center gap-6 px-8
          lg:h-[130px] lg:grid-cols-[180px_minmax(0,1fr)_100px]
          lg:gap-[30px] lg:px-8
          md:px-5
          max-[560px]:h-[82px]
          max-[560px]:grid-cols-[73px_minmax(0,1fr)_40px]
          max-[560px]:gap-2
          max-[560px]:px-3
        "
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="RoohVeere home"
          className="
            flex w-[100px] flex-col items-center justify-center
            text-[#211a1b] no-underline
            max-[560px]:w-[70px]
          "
        >
          <span className="font-serif text-[27px] font-bold leading-[0.85] tracking-[-1.8px] max-[560px]:text-[21px]">
            ROOH
          </span>

          <span className="mt-1.5 font-serif text-[17px] font-semibold leading-none tracking-[5px] max-[560px]:text-[13px] max-[560px]:tracking-[3.5px]">
            VEERE
          </span>

          <span className="mt-2 whitespace-nowrap font-serif text-[8px] italic text-[#9a7a80] max-[560px]:mt-1.5 max-[560px]:text-[6px]">
            by Sirishti Chhabria
          </span>
        </Link>

        {/* Announcement Bar */}
        <div
          className="
            relative flex h-[52px] w-full max-w-[910px]
            justify-self-center overflow-hidden rounded-full
            border border-[#f8dfe5] bg-[#fffdfd]
            text-[#8d1239]
            shadow-[0_8px_28px_rgba(142,21,59,0.07)]
            lg:h-[58px]
            max-[900px]:h-[46px]
            max-[560px]:h-[40px]
          "
        >
          <div className="announcement-track flex w-max shrink-0 items-center gap-10 pl-6 text-[13px] sm:gap-12 sm:text-sm lg:text-[15px] max-[560px]:gap-5 max-[560px]:pl-4 max-[560px]:text-[10px]">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                aria-hidden={index === 1 ? "true" : undefined}
                className="flex shrink-0 items-center gap-10 sm:gap-12 max-[560px]:gap-5"
              >
                <span>Kiss Launch</span>
                <span className="text-[#d9a7b5]">◆</span>

                <strong className="font-semibold">
                  10% OFF DUO BUNDLES
                </strong>

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
          className="
            relative grid h-12 w-12 place-items-center
            justify-self-end rounded-xl
            border border-transparent bg-[#f4f5f7]
            text-[#4b5664]
            transition duration-200
            hover:border-[#ead1d9] hover:bg-[#fff0f4]
            hover:text-[#8d1239]
            active:scale-95
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[#8d1239]
            focus-visible:ring-offset-2
            max-[560px]:h-10 max-[560px]:w-10
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[22px] w-[22px] max-[560px]:h-5 max-[560px]:w-5"
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
                grid h-[21px] min-w-[21px] place-items-center
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
