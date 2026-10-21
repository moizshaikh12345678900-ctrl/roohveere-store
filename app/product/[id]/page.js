"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { products } from "../../../lib/products";

const money = (n) => `PKR ${Number(n).toLocaleString("en-PK")}`;
const reviewKey = (id) => `veere-rooh-reviews-${id}`;

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = decodeURIComponent(String(params.id || ""));
  const product = products.find((item) => String(item.id) === id);

  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewsReady, setReviewsReady] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    setReviews([]);
    setReviewsReady(false);

    if (!product) return;

    try {
      const saved = localStorage.getItem(reviewKey(product.id));
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setReviews(parsed);
      }
    } catch {
      setReviews([]);
    }

    setReviewsReady(true);
  }, [product]);

  useEffect(() => {
    if (!product || !reviewsReady) return;

    try {
      localStorage.setItem(reviewKey(product.id), JSON.stringify(reviews));
    } catch {
      // Local storage may be unavailable.
    }
  }, [product, reviews, reviewsReady]);

  if (!product) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#fff8f8] px-5 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#8d1239]">
          RoohVeere
        </p>
        <h1 className="mt-4 font-serif text-3xl text-[#35232b]">
          Fragrance Not Found
        </h1>
        <p className="mt-3 text-sm text-[#927f83]">
          This fragrance may no longer be available.
        </p>
       <Link
  href="/shop#products"
  className="mt-6 rounded-lg bg-[#8d1239] px-6 py-3 text-sm text-white transition hover:bg-[#70102e]"
>
  Explore Fragrances
</Link>
      </div>
    );
  }

  const otherProducts = products.filter(
    (item) => String(item.id) !== String(product.id)
  );

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : null;

  const addToCart = () => {
    window.dispatchEvent(
      new CustomEvent("veere-rooh-add-to-cart", {
        detail: { product, quantity },
      })
    );
  };

  const buyNow = () => {
    addToCart();
    router.push("/order");
  };

  const submitReview = (event) => {
    event.preventDefault();
    setReviewMessage("");

    const name = reviewName.trim();
    const text = reviewText.trim();

    if (!name || text.length < 5) {
      setReviewMessage("Please enter your name and a review of at least 5 characters.");
      return;
    }

    const newReview = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      text,
      rating,
      date: new Date().toISOString(),
    };

    setReviews((current) => [newReview, ...current]);
    setReviewName("");
    setReviewText("");
    setRating(5);
    setReviewMessage("Thank you! Your review has been submitted.");
  };

  return (
    <div className="min-h-screen bg-[#fff8f8] text-[#35232b]">
      {/* Product details */}
      <section className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
     <Link
  href="/#home"
  className="mb-7 inline-flex items-center gap-2 text-sm text-[#8d1239] transition hover:gap-3"
>
  ← Back to fragrances
</Link>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {/* Product image */}
            <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-[#f0dfe3] bg-[#fff0f3] sm:h-[520px] lg:h-[620px]">
  <img
    src={product.image}
    alt={product.name}
    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
  />
</div>

            {/* Product information */}
            <div className="flex flex-col justify-center py-2">
              <p className="text-xs uppercase tracking-[0.28em] text-[#8d1239]">
                {product.category} · RoohVeere
              </p>

              <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                {product.name}
              </h1>

              <p className="mt-4 text-base leading-7 text-[#927f83]">
                {product.description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-2xl font-semibold text-[#8d1239]">
                  {money(product.price)}
                </span>

                {averageRating && (
                  <span className="text-sm text-[#927f83]">
                    ★ {averageRating} ({reviews.length}{" "}
                    {reviews.length === 1 ? "review" : "reviews"})
                  </span>
                )}
              </div>

              <div className="my-6 h-px bg-[#ead6dc]" />

              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8d1239]">
                Fragrance Notes
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#6e515b]">
                {product.notes || "Discover the unique character of this fragrance."}
              </p>

              <div className="mt-7">
                <p className="mb-3 text-sm font-medium">Quantity</p>

                <div className="inline-flex items-center overflow-hidden rounded-lg border border-[#ead6dc] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="h-11 w-11 text-lg transition hover:bg-[#fff0f3] disabled:opacity-40"
                  >
                    −
                  </button>

                  <span className="w-12 text-center text-sm">{quantity}</span>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="h-11 w-11 text-lg transition hover:bg-[#fff0f3]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={addToCart}
                  className="rounded-lg border border-[#8d1239] px-5 py-3.5 text-sm font-semibold text-[#8d1239] transition hover:bg-[#fff0f3]"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  onClick={buyNow}
                  className="rounded-lg bg-[#8d1239] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#70102e]"
                >
                  Buy Now · {money(product.price * quantity)}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#f0dfe3] bg-white p-4">
                  <span className="text-lg">🎁</span>
                  <p className="mt-2 text-xs font-semibold">Gift-worthy</p>
                  <p className="mt-1 text-[11px] text-[#927f83]">
                    A scent to remember
                  </p>
                </div>

                <div className="rounded-xl border border-[#f0dfe3] bg-white p-4">
                  <span className="text-lg">♡</span>
                  <p className="mt-2 text-xs font-semibold">Made for moments</p>
                  <p className="mt-1 text-[11px] text-[#927f83]">
                    Find your signature
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <section className="border-t border-[#ead6dc] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#8d1239]">
              Your experience matters
            </p>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Fragrance Reviews
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#927f83]">
              Tried {product.name}? Share your thoughts and help others discover
              their next favourite scent.
            </p>

            <div className="mt-6 rounded-2xl border border-[#f0dfe3] bg-white p-5">
              <div className="text-2xl tracking-widest text-[#8d1239]">
                {"★".repeat(5)}
              </div>
              <p className="mt-2 text-sm font-semibold">
                {averageRating
                  ? `${averageRating} out of 5`
                  : "Be the first to review"}
              </p>
              <p className="mt-1 text-xs text-[#927f83]">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"} submitted
              </p>
            </div>

            <form
              onSubmit={submitReview}
              className="mt-6 rounded-2xl border border-[#f0dfe3] bg-white p-5 sm:p-6"
            >
              <h3 className="font-serif text-xl">Write a Review</h3>

              <label className="mt-5 block text-xs font-semibold">
                Your rating
              </label>

              <div className="mt-2 flex gap-1" aria-label="Choose rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    aria-pressed={rating === star}
                    className={`text-3xl transition hover:scale-110 ${
                      star <= rating ? "text-[#8d1239]" : "text-[#e8d9de]"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <label htmlFor="review-name" className="mt-5 block text-xs font-semibold">
                Your name
              </label>
              <input
                id="review-name"
                type="text"
                maxLength={60}
                required
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                placeholder="Enter your name"
                className="mt-2 w-full rounded-lg border border-[#ead6dc] bg-[#fffafa] px-4 py-3 text-sm outline-none transition focus:border-[#8d1239]"
              />

              <label htmlFor="review-text" className="mt-4 block text-xs font-semibold">
                Your review
              </label>
              <textarea
                id="review-text"
                required
                minLength={5}
                maxLength={1000}
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What did you think of this fragrance?"
                className="mt-2 w-full resize-y rounded-lg border border-[#ead6dc] bg-[#fffafa] px-4 py-3 text-sm outline-none transition focus:border-[#8d1239]"
              />

              {reviewMessage && (
                <p role="status" className="mt-3 text-xs text-[#8d1239]">
                  {reviewMessage}
                </p>
              )}

              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-[#8d1239] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#70102e]"
              >
                Submit Review
              </button>

              <p className="mt-3 text-[10px] leading-5 text-[#927f83]">
                Demo mode: reviews are saved in this browser only and are not
                verified purchases.
              </p>
            </form>
          </div>

          <div>
            <h3 className="mb-5 font-serif text-2xl">What people are saying</h3>

            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#e5cbd3] bg-white/70 px-5 py-12 text-center">
                <span className="text-3xl">♡</span>
                <p className="mt-3 text-sm font-medium">No reviews yet</p>
                <p className="mt-2 text-xs text-[#927f83]">
                  Your review could be the first.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-2xl border border-[#f0dfe3] bg-white p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold">{review.name}</h4>
                        <p className="mt-1 text-[10px] text-[#927f83]">
                          {new Date(review.date).toLocaleDateString("en-PK", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <span className="whitespace-nowrap text-sm tracking-wider text-[#8d1239]">
                        {"★".repeat(review.rating)}
                        <span className="text-[#e8d9de]">
                          {"★".repeat(5 - review.rating)}
                        </span>
                      </span>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-[#6e515b]">
                      {review.text}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* More fragrances */}
      {otherProducts.length > 0 && (
        <section className="border-t border-[#ead6dc] bg-[#f8d8db] px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8d1239]">
                  Find your next favourite
                </p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  You May Also Love
                </h2>
                <p className="mt-2 text-sm text-[#927f83]">
                  Explore more fragrances from RoohVeere.
                </p>
              </div>

              <Link
                href="/shop"
                className="text-sm font-semibold text-[#8d1239] transition hover:underline"
              >
                View All Fragrances →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {otherProducts.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-2xl border border-[#f0dfe3] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(73,19,42,0.08)]"
                >
                  <Link
                    href={`/product/${encodeURIComponent(item.id)}`}
                    className="block"
                  >
                   <div className="relative h-44 w-full overflow-hidden bg-[#fff0f3] sm:h-60">
  <img
    src={item.image}
    alt={item.name}
    loading="lazy"
    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
  />
</div>

                    <div className="p-3 sm:p-5">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-[#8d1239]">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-serif text-base sm:text-xl">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-[#8d1239]">
                        {money(item.price)}
                      </p>
                    </div>
                  </Link>

                  <div className="px-3 pb-3 sm:px-5 sm:pb-5">
                    <Link
                      href={`/product/${encodeURIComponent(item.id)}`}
                      className="block rounded-lg border border-[#8d1239] px-3 py-2.5 text-center text-xs font-semibold text-[#8d1239] transition hover:bg-[#8d1239] hover:text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
