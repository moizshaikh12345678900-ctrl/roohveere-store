"use client";
import { useMemo, useState } from "react";
import { products } from "../lib/products";

const money = (n) => `PKR ${Number(n).toLocaleString("en-PK")}`;

export default function ProductSection({ onAddToCart = () => {}, onViewProduct = () => {} }) {
  const [category, setCategory] = useState("All");

  const categories = ["All", "For Her", "For Him"];

  const filtered = useMemo(
    () => (category === "All" ? products : products.filter((p) => p.category === category)),
    [category]
  );

  return (
    <section className="bg-[#fff6f6] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Category Tabs */}
        <div className="flex items-center space-x-6 mb-8 text-sm font-medium">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-md transition-colors ${
                category === c
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black bg-transparent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-[#fff0f3] border border-gray-300 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between text-center p-0"
            >
              {/* Product Image Box */}
              <div
                className="w-full h-56 bg-gray-100 overflow-hidden cursor-pointer"
                onClick={() => onViewProduct(p)}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-5 flex flex-col items-center flex-grow justify-between">
                <div>
                  <h3
                    onClick={() => onViewProduct(p)}
                    className="font-serif text-lg font-bold text-gray-900 cursor-pointer hover:underline mb-1"
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs font-semibold text-gray-800 mb-4">
                    {money(p.price)}
                  </p>
                </div>

                {/* Golden Gradient Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(p)}
                  className="w-full py-2.5 rounded-md text-white font-medium text-sm bg-gradient-to-r from-[#d8b073] to-[#c69a58] hover:opacity-95 transition-opacity shadow-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}