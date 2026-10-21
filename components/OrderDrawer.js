"use client";

import { useEffect, useMemo, useState } from "react";

const money = (n) =>
  `PKR ${Number(n || 0).toLocaleString("en-PK")}`;

export default function OrderDrawer({
  open,
  items = [],
  onClose = () => {},
  onReturnToBag = () => {},
  whatsappNumber = "923122344718",
}) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    payment: "Cash on Delivery",
    notes: "",
  });

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) * Number(item.qty || 0),
        0
      ),
    [items]
  );

  const itemCount = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + Number(item.qty || 0),
        0
      ),
    [items]
  );

  useEffect(() => {
    let timer;

    if (open) {
      setMounted(true);
      timer = setTimeout(() => setVisible(true), 30);
    } else {
      setVisible(false);
      timer = setTimeout(() => setMounted(false), 400);
    }

    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const update = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  };

  const inputClass =
    "w-full rounded-md border border-[#e7dfd6] bg-white px-3.5 py-3 text-sm text-[#35261e] outline-none transition-colors placeholder:text-[#b0a398] hover:border-[#c8b9a8] focus:border-[#287b52] focus:ring-2 focus:ring-[#287b52]/10";

  const labelClass =
    "mb-1.5 block text-xs font-medium text-[#594a40]";

  const submitOrder = (event) => {
    event.preventDefault();
    setError("");

    if (!items.length) {
      setError("Your bag is empty. Add a fragrance before checkout.");
      return;
    }

    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim()
    ) {
      setError(
        "Please complete your name, phone, address and city."
      );
      return;
    }

    const message = [
      "Hello Veere Rooh, I'd like to place an order:",
      "",
      "CUSTOMER DETAILS",
      `Name: ${form.fullName.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email ? `Email: ${form.email.trim()}` : "",
      `Address: ${form.address.trim()}`,
      `City: ${form.city.trim()}`,
      form.postalCode
        ? `Postal code: ${form.postalCode.trim()}`
        : "",
      `Payment preference: ${form.payment}`,
      form.notes ? `Notes: ${form.notes.trim()}` : "",
      "",
      "ORDER ITEMS",
      ...items.map(
        (item) =>
          `${item.name} x ${item.qty} — ${money(
            Number(item.price || 0) * Number(item.qty || 0)
          )}`
      ),
      "",
      `Subtotal: ${money(subtotal)}`,
      "Shipping to be confirmed by the store.",
    ]
      .filter(Boolean)
      .join("\n");

    const url =
      `https://wa.me/${whatsappNumber.replace(/\D/g, "")}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex justify-end ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-hidden={!visible}
    >
      {/* Soft backdrop */}
      <div
        className={`absolute inset-0 bg-[#211b17]/40 backdrop-blur-[2px] transition-opacity duration-[400ms] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Checkout panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        className={`relative flex h-dvh w-full max-w-[540px] flex-col bg-[#fffdf9] text-[#35261e] shadow-2xl transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-[#eee6dc] px-5 py-5 sm:px-7">
          <div className="min-w-0 pr-3">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[2px] text-[#8b765f]">
              VEERE ROOH · CHECKOUT
            </p>

            <h2
              id="order-title"
              className="font-serif text-2xl font-medium tracking-tight text-[#35261e] sm:text-3xl"
            >
              Delivery details
            </h2>

            <p className="mt-1.5 text-xs leading-5 text-[#897b6f]">
              Just a few details to complete your order.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e9e0d6] bg-white text-xl text-[#65564a] transition hover:bg-[#f3eee7] active:scale-95"
          >
            ×
          </button>
        </header>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={submitOrder}
        >
          {/* Scrollable content */}
          <div className="flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7">
            {/* Customer details */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0e9df] text-sm text-[#80674d]">
                  01
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-[#35261e]">
                    Your information
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#948477]">
                    Where should we send your fragrance?
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass} htmlFor="fullName">
                    Full name <span className="text-red-600">*</span>
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    value={form.fullName}
                    onChange={update}
                    placeholder="Enter your full name"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="phone">
                      Phone number <span className="text-red-600">*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update}
                      placeholder="03XX XXXXXXX"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="email">
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="address">
                    Complete address <span className="text-red-600">*</span>
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    value={form.address}
                    onChange={update}
                    placeholder="House number, street and area"
                    rows={3}
                    required
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="city">
                      City <span className="text-red-600">*</span>
                    </label>

                    <input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={update}
                      placeholder="Your city"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="postalCode">
                      Postal code
                    </label>

                    <input
                      id="postalCode"
                      name="postalCode"
                      autoComplete="postal-code"
                      value={form.postalCode}
                      onChange={update}
                      placeholder="Optional"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="h-px bg-[#eee6dc]" />

            {/* Payment and notes */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0e9df] text-sm text-[#80674d]">
                  02
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-[#35261e]">
                    Payment & preferences
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#948477]">
                    Choose your preferred payment method.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelClass} htmlFor="payment">
                    Payment method
                  </label>

                  <select
                    id="payment"
                    name="payment"
                    value={form.payment}
                    onChange={update}
                    className={inputClass}
                  >
                    <option>Cash on Delivery</option>
                    <option>Bank Transfer</option>
                    <option>Discuss on WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="notes">
                    Order notes <span className="font-normal text-[#9a8c80]">(optional)</span>
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={update}
                    placeholder="Landmark, gift message or delivery instructions"
                    rows={2}
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>
            </section>

            {/* Order summary */}
            <section className="overflow-hidden rounded-lg border border-[#e9e1d7] bg-white">
              <div className="flex items-center justify-between border-b border-[#eee6dc] bg-[#f8f4ed] px-4 py-3.5">
                <div>
                  <h3 className="text-sm font-semibold text-[#35261e]">
                    Order summary
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[#897b6f]">
                    Your selected fragrances
                  </p>
                </div>

                <span className="rounded-full border border-[#e6ddd1] bg-white px-3 py-1 text-[11px] font-medium text-[#695847]">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="space-y-3 p-4">
                {items.length ? (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-[#49392e]">
                          {item.name}
                        </p>
                        <p className="mt-1 text-[11px] text-[#928276]">
                          Quantity: {item.qty}
                        </p>
                      </div>

                      <span className="shrink-0 font-medium tabular-nums text-[#49392e]">
                        {money(
                          Number(item.price || 0) *
                            Number(item.qty || 0)
                        )}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="py-2 text-xs text-[#897b6f]">
                    Your bag is currently empty.
                  </p>
                )}

                <div className="flex items-center justify-between border-t border-dashed border-[#e6ddd1] pt-4">
                  <span className="text-sm font-semibold text-[#35261e]">
                    Subtotal
                  </span>

                  <strong className="font-serif text-xl font-medium text-[#35261e]">
                    {money(subtotal)}
                  </strong>
                </div>

                <p className="text-[11px] leading-5 text-[#928276]">
                  Delivery charges and any applicable discounts will be
                  confirmed by our team.
                </p>
              </div>
            </section>

            {/* WhatsApp information */}
            <div className="flex items-start gap-3 rounded-md border border-[#dce9df] bg-[#f3f8f4] p-3.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dceee1] text-sm text-[#237849]">
                ✓
              </span>

              <div>
                <p className="text-xs font-semibold text-[#285b3d]">
                  Confirm your order on WhatsApp
                </p>
                <p className="mt-1 text-[11px] leading-5 text-[#617a68]">
                  Your details and order summary will open in WhatsApp
                  for review before you send the message.
                </p>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700"
              >
                {error}
              </p>
            )}
          </div>

          {/* Fixed footer */}
          <footer className="shrink-0 border-t border-[#eee6dc] bg-[#fffdf9] px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4 sm:px-7">
            <button
              type="submit"
              disabled={!items.length}
              className="flex min-h-[50px] w-full items-center justify-center gap-2 rounded-md bg-[#237849] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#195f39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#237849] focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M20.52 3.48A11.78 11.78 0 0 0 12.13 0C5.55 0 .2 5.35.2 11.93c0 2.1.55 4.16 1.6 5.98L.1 24l6.25-1.64a11.94 11.94 0 0 0 5.78 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.55-8.42ZM12.14 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.83 9.83 0 0 1-1.51-5.26c0-5.46 4.44-9.9 9.9-9.9a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.46-4.45 9.9-9.92 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
              </svg>

              Continue on WhatsApp
              <span aria-hidden="true">↗</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onReturnToBag();
              }}
              className="mt-3 block w-full py-1 text-center text-xs text-[#897b6f] transition-colors hover:text-[#35261e]"
            >
              ← Return to your bag
            </button>
          </footer>
        </form>
      </aside>
    </div>
  );
}
