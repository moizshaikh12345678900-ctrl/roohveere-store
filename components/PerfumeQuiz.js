"use client";

import { useState } from "react";
import { products } from "../lib/products";

const money = (n) => `PKR ${Number(n).toLocaleString("en-PK")}`;

export default function PerfumeQuiz({
  onAddToCart = () => {},
  onViewProduct = () => {},
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState("");
  const [mood, setMood] = useState("");

  const optionsStep1 = ["For Her", "For Him", "Unisex"];

  const optionsStep2 = [
    { v: "Rose", t: "Romantic & soft", detail: "Floral, delicate and graceful" },
    { v: "Woody", t: "Warm & confident", detail: "Earthy, rich and sophisticated" },
    { v: "Amber", t: "Deep & mysterious", detail: "Warm, sensual and captivating" },
  ];

  const match =
    products.find(
      (p) =>
        p.category === gender &&
        p.notes?.toLowerCase().includes(mood.toLowerCase())
    ) ||
    products.find((p) => p.category === gender) ||
    products[0];

  const closeQuiz = () => setOpen(false);

  const startQuiz = () => {
    setGender("");
    setMood("");
    setStep(0);
    setOpen(true);
  };

  return (
    <>
      {/* Fixed bottom-right toggle button */}
      <button
        type="button"
        onClick={startQuiz}
        aria-expanded={open}
        aria-label="Find your perfect fragrance"
        className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-full border border-[#f0d6de] bg-white py-2 pl-4 pr-2 text-left text-[#8d1239] shadow-[0_8px_28px_rgba(73,19,42,0.16)] transition-all duration-300 hover:-translate-y-1 sm:bottom-6 sm:right-6 sm:gap-4 sm:pl-5"
      >
        <span className="flex flex-col">
          <span className="text-[11px] font-semibold sm:text-xs">
            Find the Perfect Gift?
          </span>
          <span className="mt-0.5 text-[9px] font-normal text-[#9c7b85]">
            Take our scent quiz
          </span>
        </span>

        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#8d1239] text-lg text-white">
          ♡
        </span>
      </button>

      {/* Quiz Panel Positioned Exact Like Image */}
      {open && (
        <>
          {/* Backdrop for outside click */}
          <button
            type="button"
            aria-label="Close quiz backdrop"
            onClick={closeQuiz}
            className="fixed inset-0 z-[90] cursor-default bg-black/10"
          />

          <aside
            role="dialog"
            aria-modal="true"
            className="fixed bottom-[85px] right-4 sm:right-6 z-[100] w-[calc(100vw-32px)] max-w-[320px] sm:max-w-[340px] rounded-2xl border border-[#f2e2e5] bg-white p-6 shadow-[0_12px_45px_rgba(0,0,0,0.12)] text-[#35232b] transition-all"
          >
            {/* Close Cross Button at Top Right */}
            <button
              type="button"
              onClick={closeQuiz}
              aria-label="Close quiz"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg leading-none"
            >
              ✕
            </button>

            {/* STEP 0: Exact Matching Intro Screen */}
            {step === 0 && (
              <div className="text-center pt-2 pb-1">
                {/* Envelope Icon Box */}
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#fde8ed] text-2xl">
                  💌
                </div>

                <h3 className="font-serif text-xl font-medium text-[#8d1239] mb-2">
                  Let Sirishti Help.
                </h3>

                <p className="text-xs text-[#736066] leading-relaxed mb-6 px-1">
                  Answer 2 quick questions and I&apos;ll hand-pick the scent that matches their soul perfectly.
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-3 rounded-md bg-[#8d1239] text-white font-semibold text-xs tracking-wide shadow-sm hover:bg-[#70102e] transition-colors"
                >
                  Start the Quiz
                </button>
              </div>
            )}

            {/* STEP 1: Question 01 */}
            {step === 1 && (
              <div className="text-left pt-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#a06c77]">
                  QUESTION 01 / 02
                </span>

                <h3 className="font-serif text-lg font-medium text-[#35232b] mt-1 mb-1">
                  Who are we finding a scent for?
                </h3>

                <p className="text-xs text-[#927f83] mb-4">
                  Every soul has its own signature.
                </p>

                <div className="space-y-2 mb-5">
                  {optionsStep1.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setGender(option)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                        gender === option
                          ? "border-[#8d1239] bg-[#fff1f4] text-[#8d1239]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span>{option}</span>
                      <span>↗</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="w-1/3 py-2 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!gender}
                    onClick={() => setStep(2)}
                    className="w-2/3 py-2 rounded-md bg-[#8d1239] text-white text-xs font-semibold disabled:opacity-40 hover:bg-[#70102e]"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Question 02 */}
            {step === 2 && (
              <div className="text-left pt-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#a06c77]">
                  QUESTION 02 / 02
                </span>

                <h3 className="font-serif text-lg font-medium text-[#35232b] mt-1 mb-1">
                  What feeling should it leave?
                </h3>

                <p className="text-xs text-[#927f83] mb-4">
                  Choose the mood that feels right.
                </p>

                <div className="space-y-2 mb-5">
                  {optionsStep2.map((option) => (
                    <button
                      type="button"
                      key={option.v}
                      onClick={() => setMood(option.v)}
                      className={`w-full flex flex-col text-left px-3.5 py-2 rounded-lg border text-xs transition-all ${
                        mood === option.v
                          ? "border-[#8d1239] bg-[#fff1f4] text-[#8d1239]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <span className="font-semibold">{option.t}</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">{option.detail}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-2 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!mood}
                    onClick={() => setStep(3)}
                    className="w-2/3 py-2 rounded-md bg-[#8d1239] text-white text-xs font-semibold disabled:opacity-40 hover:bg-[#70102e]"
                  >
                    Reveal Scent →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Result Screen */}
            {step === 3 && match && (
              <div className="text-center pt-1">
                <span className="inline-block rounded-full bg-[#fff0f3] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-[#a53b59] mb-2">
                  YOUR SOULFUL MATCH
                </span>

                <div
                  onClick={() => {
                    onViewProduct(match);
                    setOpen(false);
                  }}
                  className="mx-auto h-36 w-36 bg-[#f7efeb] rounded-lg overflow-hidden my-2 cursor-pointer p-2 flex items-center justify-center"
                >
                  <img src={match.image} alt={match.name} className="max-h-full object-contain" />
                </div>

                <h4 className="font-serif text-lg font-medium text-[#35232b]">{match.name}</h4>
                <p className="text-xs text-[#927f83] line-clamp-2 mt-1">{match.description}</p>
                <strong className="block text-sm text-[#8d1239] mt-2 mb-3">{money(match.price)}</strong>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(match);
                    setOpen(false);
                  }}
                  className="w-full py-2.5 rounded-md bg-[#8d1239] text-white font-semibold text-xs shadow-sm hover:bg-[#70102e]"
                >
                  Add to Bag
                </button>

                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="mt-2 text-[11px] text-[#8d1239] hover:underline block mx-auto"
                >
                  Retake quiz
                </button>
              </div>
            )}
          </aside>
        </>
      )}
    </>
  );
}
