"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "../lib/products";

const money = (n) => `PKR ${Number(n).toLocaleString("en-PK")}`;

export default function ProductSection({
  onAddToCart = () => {},
}) {
  const [category, setCategory] = useState("All");

  const categories = ["All", "For Her", "For Him"];

  const filtered = useMemo(() => {
    return category === "All"
      ? products
      : products.filter((p) => p.category === category);
  }, [category]);

  return (
    <section
      id="products"
      className="min-h-screen scroll-mt-24 bg-[#fff6f6] px-4 py-12 font-sans sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-[#8d1239]">
            The Fragrance Collection
          </p>

          <h2 className="font-serif text-3xl text-[#35232b] sm:text-4xl">
            Find Your Signature Scent
          </h2>

          <p className="mt-3 text-sm text-[#927f83]">
            Discover a fragrance that tells your story.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
                category === c
                  ? "bg-[#8d1239] text-white shadow-md"
                  : "border border-[#ead6dc] bg-white text-[#6e515b] hover:border-[#8d1239]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-[#f0dfe3] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(73,19,42,0.10)]"
            >
              {/* Image: clicking opens the actual product page */}
              <Link
                href={`/product/${encodeURIComponent(p.id)}`}
                aria-label={`View details for ${p.name}`}
                className="block"
              >
                <div className="relative h-72 w-full overflow-hidden bg-[#fff0f3] sm:h-80">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain object-center p-4 transition-transform duration-500 group-hover:scale-105 sm:p-6"
                  />

                
                </div>
              </Link>

              {/* Product information */}
              <div className="p-5 text-center">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#ad8792]">
                  {p.category}
                </p>

                <Link
                  href={`/product/${encodeURIComponent(p.id)}`}
                  className="font-serif text-xl text-[#35232b] transition-colors hover:text-[#8d1239]"
                >
                  {p.name}
                </Link>

                <p className="mb-4 mt-2 text-sm font-semibold text-[#8d1239]">
                  {money(p.price)}
                </p>

                <div className="flex gap-2">
                  <Link
                    href={`/product/${encodeURIComponent(p.id)}`}
                    className="flex flex-1 items-center justify-center rounded-lg border border-[#8d1239] py-3 text-xs font-semibold text-[#8d1239] transition-colors hover:bg-[#fff1f4]"
                  >
                    View Details
                  </Link>

                  <button
                    type="button"
                    onClick={() => onAddToCart(p)}
                    className="flex-1 rounded-lg bg-[#8d1239] px-2 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#70102e]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty category state */}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-[#927f83]">
            No fragrances found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
