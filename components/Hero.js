"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "A LITTLE LUXURY, A LASTING MEMORY",
    title: "Find the scent that feels like you.",
    button: "Shop the collection",
    action: "products",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=2200&q=90",
  },
  {
    eyebrow: "ROOTED IN SOUL, WORN WITH PRIDE",
    title: "Every fragrance holds a story.",
    button: "Explore fragrances",
    action: "products",
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=2200&q=90",
  },
  {
    eyebrow: "YOUR SIGNATURE, YOUR STORY",
    title: "Make the moment unforgettable.",
    button: "Discover your scent",
    action: "quiz",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=2200&q=90",
  },
  {
    eyebrow: "GIVE A LITTLE SOUL",
    title: "Thoughtful scents. Beautiful memories.",
    button: "Find a gift",
    action: "gift",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=2200&q=90",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  const previousSlide = () => {
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((current) => (current + 1) % slides.length);
  };

  const handleAction = () => {
    if (slide.action === "products") {
      document.getElementById("products")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    if (slide.action === "quiz") {
      window.dispatchEvent(new CustomEvent("open-perfume-quiz"));
      return;
    }

    if (slide.action === "gift") {
      window.dispatchEvent(new CustomEvent("open-gift-toggle"));
    }
  };

  return (
    <section
      id="home"
      className="relative flex h-[570px] min-h-[500px] w-full items-end justify-center overflow-hidden bg-[#f7f1ed] sm:h-[620px] lg:h-[min(710px,calc(100vh-130px))]"
    >
      {/* Background images */}
      {slides.map((item, i) => (
        <div
          key={item.image}
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            index === i ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url("${item.image}")`,
            backgroundPosition: "center 43%",
          }}
        />
      ))}

      {/* Image overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f4faf9]/60 via-white/10 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#20171b]/55 via-transparent to-transparent sm:hidden" />

      {/* Previous slide */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/65 text-3xl leading-none text-[#663747] backdrop-blur-sm transition hover:bg-white sm:left-6 sm:h-11 sm:w-11"
      >
        ‹
      </button>

      {/* Next slide */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/65 text-3xl leading-none text-[#663747] backdrop-blur-sm transition hover:bg-white sm:right-6 sm:h-11 sm:w-11"
      >
        ›
      </button>

      {/* Hero content */}
      <div
        key={index}
        className="relative z-10 mx-auto w-full max-w-3xl animate-[heroFade_.6s_ease-out] px-12 pb-[76px] text-center text-white sm:px-16 sm:pb-[70px]"
      >
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs md:text-sm">
          {slide.eyebrow}
        </p>

        <h1 className="mx-auto mb-7 max-w-2xl font-serif text-4xl font-medium leading-[1.12] tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
          {slide.title}
        </h1>

        <button
          type="button"
          onClick={handleAction}
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-gradient-to-r from-[#c99e56] to-[#ead19b] px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:px-9 sm:py-4 sm:text-base"
        >
          {slide.button}

          <span className="ml-3 text-lg" aria-hidden="true">
            →
          </span>
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {slides.map((item, i) => (
          <button
            key={item.eyebrow}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={index === i ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === i
                ? "w-8 bg-white"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}