"use client";

import { useMemo, useState } from "react";

const money = (n) => `PKR ${Number(n).toLocaleString("en-PK")}`;

export default function OrderDrawer({
  open,
  items = [],
  onClose = () => {},
  onReturnToBag = () => {},
  whatsappNumber = "923122344718",
}) {
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

  const [error, setError] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0),
    [items]
  );

  const update = (e) =>
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  if (!open) return null;

  const submitOrder = (e) => {
    e.preventDefault();
    setError("");

    if (!items.length) {
      setError("Your bag is empty. Add a fragrance before checkout.");
      return;
    }

    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      setError("Please complete your name, phone, address and city.");
      return;
    }

    const message = [
      "Hello RoohVeere, I'd like to place an order:",
      "",
      "CUSTOMER DETAILS",
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      `Address: ${form.address}`,
      `City: ${form.city}`,
      form.postalCode ? `Postal code: ${form.postalCode}` : "",
      `Payment preference: ${form.payment}`,
      form.notes ? `Notes: ${form.notes}` : "",
      "",
      "ORDER ITEMS",
      ...items.map((item) => `${item.name} x ${item.qty} — ${money(item.price * item.qty)}`),
      "",
      `Subtotal: ${money(subtotal)}`,
      "Shipping to be confirmed by the store.",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="relative flex h-dvh w-full max-w-[540px] flex-col bg-[#fffdf9] text-[#35261e] shadow-2xl font-sans">
        
        {/* Drawer Header */}
        <header className="flex items-center justify-between border-b border-[#f0e2e5] px-6 py-6 sm:px-7">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#a06c77]">
              ROOHVEERE · CHECKOUT
            </span>
            <h2 id="order-title" className="font-serif text-2xl font-medium text-[#2c1d18]">
              Your order, beautifully.
            </h2>
            <p className="mt-1 text-xs text-[#8a7868]">
              A few details and your fragrance is almost yours.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f0e0e3] bg-white text-xl text-[#6d5260] hover:bg-[#fff0f3] transition-colors"
          >
            ×
          </button>
        </header>

        {/* Checkout Form */}
        <form className="flex flex-1 flex-col min-h-0" onSubmit={submitOrder}>
          
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-7 space-y-5">
            <h3 className="font-serif text-xl font-medium text-[#35261e]">
              Delivery details
            </h3>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-medium text-[#59454b]">Full name *</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={update}
                  placeholder="Your full name"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8d2d6] rounded-md focus:outline-none focus:border-[#8d1239]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-medium text-[#59454b]">Phone number *</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={update}
                  placeholder="03XX XXXXXXX"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8d2d6] rounded-md focus:outline-none focus:border-[#8d1239]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-medium text-[#59454b]">Email address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8d2d6] rounded-md focus:outline-none focus:border-[#8d1239]"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-medium text-[#59454b]">Complete address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={update}
                  placeholder="House, street, area"
                  rows={2}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8d2d6] rounded-md focus:outline-none focus:border-[#8d1239]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-medium text-[#59454b]">City *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={update}
                  placeholder="Your city"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8d2d6] rounded-md focus:outline-none focus:border-[#8d1239]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-medium text-[#59454b]">Postal code</label>
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={update}
                  placeholder="Optional"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8d2d6] rounded-md focus:outline-none focus:border-[#8d1239]"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-medium text-[#59454b]">Payment preference</label>
                <select
                  name="payment"
                  value={form.payment}
                  onChange={update}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8d2d6] rounded-md focus:outline-none focus:border-[#8d1239]"
                >
                  <option>Cash on Delivery</option>
                  <option>Bank Transfer</option>
                  <option>Discuss on WhatsApp</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="font-medium text-[#59454b]">Order notes (optional)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={update}
                  placeholder="Landmark, gift message, or delivery instructions"
                  rows={2}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#e8d2d6] rounded-md focus:outline-none focus:border-[#8d1239]"
                />
              </div>

            </div>

            {/* Mini Summary Box */}
            <div className="rounded-xl border border-[#e9dfd1] bg-[#faf5ed] p-4 text-xs space-y-3">
              <div className="flex justify-between items-center font-semibold text-[#35261e]">
                <h3>Your selection</h3>
                <span>{items.reduce((sum, item) => sum + Number(item.qty || 0), 0)} item(s)</span>
              </div>

              {items.length ? (
                <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-[#59454b]">
                      <span>{item.name} <small>× {item.qty}</small></span>
                      <b>{money(item.price * item.qty)}</b>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#897767]">Your bag is currently empty.</p>
              )}

              <div className="flex justify-between border-t border-[#e3d5c2] pt-3 font-bold text-[#35261e]">
                <span>Subtotal</span>
                <strong className="text-[#8d1239]">{money(subtotal)}</strong>
              </div>
            </div>

            {/* Info Note */}
            <div className="flex items-start gap-3 rounded-lg border border-[#e7d8c1] bg-[#fffaf1] p-3 text-[10px] text-[#7b644a]">
              <span>✦</span>
              <div>
                <strong>Personal, thoughtful service: </strong>
                Submitting opens WhatsApp with your details and order summary.
              </div>
            </div>

            {error && <p className="text-xs text-[#a42f35]">{error}</p>}
          </div>

          {/* Footer Submit */}
          <footer className="border-t border-[#e9dfd1] bg-[#fffdf9] p-4 sm:p-5 text-center space-y-2">
            <button
              type="submit"
              disabled={!items.length}
              className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#80603e] via-[#b99460] to-[#d0b17c] text-white font-bold text-xs tracking-wider shadow hover:opacity-95 transition-opacity disabled:opacity-40"
            >
              Continue on WhatsApp ↗
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onReturnToBag();
              }}
              className="text-[11px] text-[#8b7563] underline hover:text-black block mx-auto"
            >
              Return to your bag
            </button>
          </footer>

        </form>
      </aside>
    </div>
  );
}