"use client";

import { useEffect, useMemo, useState } from "react";
import { products } from "../lib/products";

const money = (n) => `PKR ${Number(n).toLocaleString("en-PK")}`;

const HER = ["women", "woman", "female", "for her"];
const HIM = ["men", "man", "male", "for him"];

const GENDER_OPTIONS = ["For Her", "For Him"];

const MOOD_OPTIONS = [
  { v: "Rose", t: "Romantic & soft", detail: "Floral, delicate and graceful" },
  { v: "Woody", t: "Warm & confident", detail: "Earthy, rich and sophisticated" },
  { v: "Amber", t: "Deep & mysterious", detail: "Warm, sensual and captivating" },
];

const MOOD_PATTERNS = {
  Rose: /rose|floral|jasmine|flower/,
  Woody: /woody|wood|cedar|sandalwood|oud|vetiver/,
  Amber: /amber|warm|musk|vanilla|spicy|oriental/,
};

const categoryOf = (p) => String(p.category || "").toLowerCase();

function findMatch(gender, mood) {
  const list = gender === "For Her" ? HER : HIM;
  const forGender = products.filter((p) => list.includes(categoryOf(p)));
  const pattern = MOOD_PATTERNS[mood];

  return (
    forGender.find((p) =>
      pattern?.test(String(p.notes || p.description || "").toLowerCase())
    ) ||
    forGender[0] ||
    products[0]
  );
}

const primaryBtn =
  "rounded-lg bg-[#8d1239] text-sm font-medium text-white transition-colors hover:bg-[#70102e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d1239] disabled:cursor-not-allowed disabled:opacity-40";

const ghostBtn =
  "rounded-lg border border-[#ead9dd] text-sm text-[#6b5860] transition-colors hover:bg-[#faf5f6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d1239]";

function Choice({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d1239] ${
        selected
          ? "border-[#8d1239] bg-[#fff4f6]"
          : "border-[#ead9dd] bg-white hover:border-[#d7aab7]"
      }`}
    >
      <span
        className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors ${
          selected ? "border-[#8d1239] bg-[#8d1239]" : "border-[#d2bcc2]"
        }`}
      >
        {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      <span className="flex flex-col">{children}</span>
    </button>
  );
}

function Progress({ step }) {
  return (
    <div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
      {[1, 2].map((n) => (
        <span
          key={n}
          className={`h-1 w-8 rounded-full transition-colors ${
            n <= step ? "bg-[#8d1239]" : "bg-[#f0e1e5]"
          }`}
        />
      ))}
      <span className="ml-2 text-xs text-[#a08890]">
        {step} of 2
      </span>
    </div>
  );
}

export default function PerfumeQuiz({
  onAddToCart = () => {},
  onViewProduct = () => {},
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState("");
  const [mood, setMood] = useState("");

  const match = useMemo(() => findMatch(gender, mood), [gender, mood]);

  const closeQuiz = () => setOpen(false);

  const resetQuiz = () => {
    setGender("");
    setMood("");
    setStep(0);
  };

  const startQuiz = () => {
    resetQuiz();
    setOpen(true);
  };

  // Close with Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <style>{`
        @keyframes quizSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes quizContentIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-quiz-anim] { animation: none !important; }
        }
      `}</style>

      {/* Floating button */}
      <button
        type="button"
        onClick={startQuiz}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-expanded={open}
        aria-label="Find the perfect gift"
        className="fixed bottom-5 right-5 z-[100] flex items-center rounded-full border border-[#f0d6de] bg-white p-1.5 text-[#8d1239] shadow-[0_6px_20px_rgba(73,19,42,0.12)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(73,19,42,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8d1239] sm:bottom-6 sm:right-6"
      >
        <span
          className={`overflow-hidden whitespace-nowrap text-left transition-all duration-300 ease-out ${
            hovered
              ? "max-w-[180px] pl-3 pr-3 opacity-100"
              : "max-w-0 pl-0 pr-0 opacity-0"
          }`}
        >
          <span className="block text-xs font-semibold">
            Find the perfect gift
          </span>
          <span className="block text-[11px] text-[#9c7b85]">
            Take our scent quiz
          </span>
        </span>

        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#8d1239] text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 2.6 5 6 5c2 0 3.3 1.1 4 2.2h4C14.7 6.1 16 5 18 5c3.4 0 5.1 3.5 3.6 6.8C19.5 16.4 12 21 12 21z" />
          </svg>
        </span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close quiz"
            tabIndex={-1}
            onClick={closeQuiz}
            className="fixed inset-0 z-[90] cursor-default bg-black/10"
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Find your perfect fragrance"
            data-quiz-anim
            style={{ animation: "quizSlideIn 0.3s ease-out" }}
            className="fixed bottom-[84px] right-4 z-[100] w-[calc(100vw-32px)] max-w-[340px] rounded-2xl border border-[#f2e2e5] bg-white p-6 text-[#35232b] shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:right-6"
          >
            <button
              type="button"
              onClick={closeQuiz}
              aria-label="Close quiz"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-base text-[#b5a2a8] transition-colors hover:bg-[#faf5f6] hover:text-[#6b5860]"
            >
              ✕
            </button>

            {/* Intro */}
            {step === 0 && (
              <div
                data-quiz-anim
                style={{ animation: "quizContentIn 0.25s ease-out" }}
                className="py-1 text-center"
              >
                <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#fde8ed] text-2xl">
                  💌
                </div>

                <h3 className="mb-2 font-serif text-xl font-medium text-[#8d1239]">
                  Let Sirishti help
                </h3>

                <p className="mx-auto mb-6 max-w-[250px] text-sm leading-relaxed text-[#736066]">
                  Answer two quick questions and we&apos;ll pick the scent that
                  suits them best.
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`${primaryBtn} w-full py-3`}
                >
                  Start the quiz
                </button>
              </div>
            )}

            {/* Question 1 */}
            {step === 1 && (
              <div
                data-quiz-anim
                style={{ animation: "quizContentIn 0.25s ease-out" }}
              >
                <Progress step={1} />

                <h3 className="mb-1 font-serif text-lg font-medium">
                  Who is the scent for?
                </h3>
                <p className="mb-4 text-sm text-[#927f83]">
                  Every person has their own signature.
                </p>

                <div className="mb-5 space-y-2">
                  {GENDER_OPTIONS.map((option) => (
                    <Choice
                      key={option}
                      selected={gender === option}
                      onClick={() => setGender(option)}
                    >
                      <span
                        className={`text-sm font-medium ${
                          gender === option ? "text-[#8d1239]" : "text-[#4a3840]"
                        }`}
                      >
                        {option}
                      </span>
                    </Choice>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className={`${ghostBtn} w-1/3 py-2.5`}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!gender}
                    onClick={() => setStep(2)}
                    className={`${primaryBtn} w-2/3 py-2.5`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Question 2 */}
            {step === 2 && (
              <div
                data-quiz-anim
                style={{ animation: "quizContentIn 0.25s ease-out" }}
              >
                <Progress step={2} />

                <h3 className="mb-1 font-serif text-lg font-medium">
                  What feeling should it leave?
                </h3>
                <p className="mb-4 text-sm text-[#927f83]">
                  Pick the mood that feels right.
                </p>

                <div className="mb-5 space-y-2">
                  {MOOD_OPTIONS.map((option) => (
                    <Choice
                      key={option.v}
                      selected={mood === option.v}
                      onClick={() => setMood(option.v)}
                    >
                      <span
                        className={`text-sm font-medium ${
                          mood === option.v ? "text-[#8d1239]" : "text-[#4a3840]"
                        }`}
                      >
                        {option.t}
                      </span>
                      <span className="mt-0.5 text-xs text-[#927f83]">
                        {option.detail}
                      </span>
                    </Choice>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`${ghostBtn} w-1/3 py-2.5`}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!mood}
                    onClick={() => setStep(3)}
                    className={`${primaryBtn} w-2/3 py-2.5`}
                  >
                    Show my scent
                  </button>
                </div>
              </div>
            )}

            {/* Result */}
            {step === 3 && match && (
              <div
                data-quiz-anim
                style={{ animation: "quizContentIn 0.25s ease-out" }}
                className="text-center"
              >
                <span className="mb-3 inline-block rounded-full bg-[#fff0f3] px-3 py-1 text-xs font-medium text-[#a53b59]">
                  Your match
                </span>

                <button
                  type="button"
                  onClick={() => {
                    onViewProduct(match);
                    setOpen(false);
                  }}
                  aria-label={`View ${match.name}`}
                  className="mx-auto mb-3 flex h-36 w-36 items-center justify-center overflow-hidden rounded-xl bg-[#f7efeb] p-2 transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={match.image}
                    alt={match.name}
                    className="max-h-full object-contain"
                  />
                </button>

                <h4 className="font-serif text-lg font-medium">{match.name}</h4>

                <p className="mx-auto mt-1 line-clamp-2 max-w-[260px] text-sm text-[#927f83]">
                  {match.description}
                </p>

                <strong className="mb-4 mt-2 block text-base text-[#8d1239]">
                  {money(match.price)}
                </strong>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(match);
                    setOpen(false);
                  }}
                  className={`${primaryBtn} w-full py-3`}
                >
                  Add to bag
                </button>

                <button
                  type="button"
                  onClick={resetQuiz}
                  className="mx-auto mt-3 block text-xs text-[#8d1239] hover:underline"
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