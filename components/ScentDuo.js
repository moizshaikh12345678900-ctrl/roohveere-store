"use client";

import { useState } from "react";
import { products } from "../lib/products";

const money = (n) => `PKR ${Number(n).toLocaleString("en-PK")}`;

export default function ScentDuo({
  onAddToCart = () => {},
  onViewProduct = () => {},
  onOpenCart = () => {},
}) {
  const [index, setIndex] = useState(0);

  if (!products?.length) return null;

  const a = products[index % products.length];
  const b = products[(index + 1) % products.length];

  const change = (step) => {
    setIndex(
      (current) => (current + step + products.length) % products.length
    );
  };

  const bundleTotal = Number(a.price) + Number(b.price);
  const bundlePrice = Math.round(bundleTotal * 0.9);
  const savings = bundleTotal - bundlePrice;

  const claimDuo = () => {
    onAddToCart(a);
    onAddToCart(b);
    onOpenCart();
  };

  return (
    <section
      id="duos"
      className="bg-[#fff7f7] px-4 py-16 sm:px-6 lg:px-8 font-sans"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="inline-block rounded-full border border-[#f0d5dc] bg-white px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-[#a53b59] uppercase shadow-sm">
            SIGNATURE BUNDLES
          </span>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[#2e1f26]">
            Better Together: Scent Duos
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-xs sm:text-sm text-[#7a686d] leading-relaxed">
            Discover the art of scent layering. Pair our newest launches, or mix and match your favorites to unlock a permanent 10% bundle discount.
          </p>
        </div>

        {/* Three Columns Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
          
          {/* Left Product Card (For Her) */}
          <article className="relative flex flex-col overflow-hidden rounded-xl border border-[#e8d2d6] bg-white shadow-sm transition hover:shadow-md">
            <div className="relative">
              <span className="absolute left-3 top-3 z-10 rounded bg-[#a53b59] px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] text-white">
                FOR HER
              </span>
              
              {/* Previous Arrow Button on Image */}
              <button
                type="button"
                onClick={() => change(-1)}
                aria-label="Previous fragrance"
                className="absolute left-3 bottom-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-[#8d1239] text-white text-base shadow transition hover:opacity-9id"
              >
                ‹
              </button>

              {/* Next Arrow Button on Image */}
              <button
                type="button"
                onClick={() => change(1)}
                aria-label="Next fragrance"
                className="absolute right-3 bottom-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-[#8d1239] text-white text-base shadow transition hover:opacity-90"
              >
                ›
              </button>

              <div
                onClick={() => onViewProduct(a)}
                className="h-[280px] w-full bg-[#faf4f1] cursor-pointer overflow-hidden flex items-center justify-center p-4"
              >
                <img
                  src={a.image}
                  alt={a.name}
                  className="h-full w-full object-contain object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-between p-5 text-center">
              <div>
                <span className="text-[9px] font-semibold tracking-[0.15em] text-[#9b8189] uppercase">
                  EAU DE PARFUM
                </span>
                <h3
                  onClick={() => onViewProduct(a)}
                  className="mt-1 font-serif text-xl font-medium text-[#2e1f26] cursor-pointer hover:text-[#a53b59]"
                >
                  {a.name}
                </h3>
                <p className="mt-1 text-xs text-[#8a757b]">
                  {a.description}
                </p>
              </div>

              <div className="mt-4 w-full pt-3 border-t border-[#f2e6e8]">
                <strong className="text-sm font-bold text-[#8d1239]">
                  {money(a.price)}
                </strong>
              </div>
            </div>
          </article>

          {/* Center Bundle Offer Box */}
          <article className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#e8d2d6] bg-white p-6 shadow-md text-center">
            <div>
              <h3 className="font-serif italic text-xl text-[#8d1239]">
                Perfect Pairs Bundle
              </h3>
              <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-[#8a757b] uppercase">
                BUY ANY 2 SCENTS
              </p>

              {/* Red Discount Banner */}
              <div className="mt-5 rounded-lg bg-[#8d1239] py-5 px-4 text-white shadow">
                <span className="text-[9px] font-medium tracking-[0.15em] uppercase text-white/80">
                  Get
                </span>
                <p className="font-serif text-3xl font-bold mt-1">10% OFF</p>
                <p className="mt-1 text-[9px] tracking-[0.15em] uppercase text-white/90">
                  UNLOCK YOUR DUO DISCOUNT
                </p>
              </div>
            </div>

            {/* Pricing details */}
            <div className="my-5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#8a757b]">
                <span>Subtotal:</span>
                <del>{money(bundleTotal)}</del>
              </div>

              <div className="flex items-center justify-between text-[#2e1f26] font-medium">
                <span>Bundle Price (10% OFF):</span>
                <strong className="text-sm text-[#8d1239]">
                  {money(bundlePrice)}
                </strong>
              </div>

              <div className="flex items-center justify-between text-[#2e7d32] bg-[#f0f9f1] px-3 py-2 rounded-md">
                <span>Your Total Savings:</span>
                <strong className="font-bold">{money(savings)}</strong>
              </div>
            </div>

            {/* Claim Duo Button */}
            <button
              type="button"
              onClick={claimDuo}
              className="w-full rounded-lg bg-[#8d1239] py-3 text-xs font-semibold tracking-wider text-white shadow transition hover:bg-[#70102e] active:scale-[0.98]"
            >
              Claim This Duo
            </button>
          </article>

          {/* Right Product Card (For Him) */}
          <article className="relative flex flex-col overflow-hidden rounded-xl border border-[#d5e0d7] bg-white shadow-sm transition hover:shadow-md">
            <div className="relative">
              <span className="absolute left-3 top-3 z-10 rounded bg-[#2e6b43] px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] text-white">
                FOR HIM
              </span>

              {/* Previous Arrow Button on Image */}
              <button
                type="button"
                onClick={() => change(-1)}
                aria-label="Previous fragrance"
                className="absolute left-3 bottom-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-[#2e6b43] text-white text-base shadow transition hover:opacity-90"
              >
                ‹
              </button>

              {/* Next Arrow Button on Image */}
              <button
                type="button"
                onClick={() => change(1)}
                aria-label="Next fragrance"
                className="absolute right-3 bottom-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-[#2e6b43] text-white text-base shadow transition hover:opacity-90"
              >
                ›
              </button>

              <div
                onClick={() => onViewProduct(b)}
                className="h-[280px] w-full bg-[#f1f3ee] cursor-pointer overflow-hidden flex items-center justify-center p-4"
              >
                <img
                  src={b.image}
                  alt={b.name}
                  className="h-full w-full object-contain object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-between p-5 text-center">
              <div>
                <span className="text-[9px] font-semibold tracking-[0.15em] text-[#788a79] uppercase">
                  EAU DE PARFUM
                </span>
                <h3
                  onClick={() => onViewProduct(b)}
                  className="mt-1 font-serif text-xl font-medium text-[#2e1f26] cursor-pointer hover:text-[#2e6b43]"
                >
                  {b.name}
                </h3>
                <p className="mt-1 text-xs text-[#8a757b]">
                  {b.description}
                </p>
              </div>

              <div className="mt-4 w-full pt-3 border-t border-[#e8f0e9]">
                <strong className="text-sm font-bold text-[#2e6b43]">
                  {money(b.price)}
                </strong>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}