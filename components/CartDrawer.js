"use client";

import { useEffect, useState } from "react";

const money = (n) =>
  `PKR ${Number(n || 0).toLocaleString("en-PK")}`;

export default function CartDrawer({
  open,
  items = [],
  onClose = () => {},
  onUpdateQty = () => {},
  onOpenCheckout = () => {},
}) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  // Keep drawer mounted while closing animation runs
  useEffect(() => {
    let timer;

    if (open) {
      setMounted(true);

      // Allow browser to render the initial hidden state
      timer = setTimeout(() => {
        setVisible(true);
      }, 30);
    } else {
      setVisible(false);

      timer = setTimeout(() => {
        setMounted(false);
      }, 450);
    }

    return () => clearTimeout(timer);
  }, [open]);

  // Escape key closes the drawer
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Prevent background scrolling while open
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!mounted) return null;

  const count = items.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const subtotal = items.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  const handleCheckout = () => {
    onClose();
    onOpenCheckout();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-hidden={!visible}
    >
      {/* Backdrop fade */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-[450ms] ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer slide animation */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`relative flex h-full w-full max-w-[490px] flex-col bg-[#fffdfb] font-sans text-[#35232b] shadow-2xl transform-gpu transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#f0e2e5] px-6 py-6 sm:px-7">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#a06c77]">
              YOUR SELECTION
            </span>

            <h2 className="font-serif text-2xl font-semibold text-[#2c1d18]">
              Your Bag{" "}
              <span className="text-base font-normal text-[#8a757b]">
                ({count})
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#f0e0e3] bg-white text-xl text-[#6d5260] transition-all duration-200 hover:rotate-90 hover:bg-[#fff0f3] active:scale-90"
          >
            ×
          </button>
        </div>

        {/* Empty State */}
        {!items.length ? (
          <div className="m-auto flex max-w-[320px] flex-col items-center px-6 py-10 text-center">
            <div className="mb-3 font-serif text-6xl text-[#d7b7bd]">
              ♡
            </div>

            <h3 className="mb-1 font-serif text-lg font-medium text-[#2c1d18]">
              Your bag is waiting for a little soul.
            </h3>

            <p className="mb-6 text-xs text-[#8a757b]">
              Discover a scent that feels like you.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-md bg-[#8d1239] py-3 text-xs font-semibold text-white shadow transition-all duration-300 hover:bg-[#70102e] active:scale-[0.98]"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 divide-y divide-[#f0e5e6] overflow-y-auto overscroll-contain px-6 sm:px-7">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_1fr_auto] items-start gap-4 py-5 sm:grid-cols-[95px_1fr_auto]"
                >
                  {/* Product Image */}
                  <div className="flex h-[105px] w-full items-center justify-center overflow-hidden rounded-md bg-[#f3e9e7] sm:h-[120px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col items-start gap-1">
                    <strong className="font-serif text-base text-[#17283a] sm:text-lg">
                      {item.name}
                    </strong>

                    <span className="text-[11px] text-[#8a757b]">
                      {item.category} · 50ml
                    </span>

                    <b className="mt-0.5 text-xs font-bold text-[#8d1239]">
                      {money(item.price)}
                    </b>

                    {/* Quantity */}
                    <div className="mt-2 flex items-center rounded border border-[#e9dadd] bg-white text-xs">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() =>
                          onUpdateQty(item.id, item.qty - 1)
                        }
                        className="px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="px-3 font-semibold text-gray-800">
                        {item.qty}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() =>
                          onUpdateQty(item.id, item.qty + 1)
                        }
                        className="px-2.5 py-1.5 text-gray-600 transition-colors hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => onUpdateQty(item.id, 0)}
                    className="text-[10px] text-[#9b8c91] underline transition-colors hover:text-[#8d1239]"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary & Checkout */}
            <div className="shrink-0 space-y-3 border-t border-[#eee0e3] bg-white p-6 sm:p-7">
              <div className="flex items-center justify-between text-sm font-semibold text-[#2c1d18]">
                <span>Subtotal</span>
                <b className="text-[#8d1239]">
                  {money(subtotal)}
                </b>
              </div>

              <p className="text-[11px] text-[#8a757b]">
                Shipping and discounts will be confirmed at checkout.
              </p>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full rounded-md bg-[#8d1239] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow transition-all duration-300 hover:bg-[#70102e] active:scale-[0.99]"
              >
                Proceed to Checkout →
              </button>

              <button
                type="button"
                onClick={onClose}
                className="mt-2 block w-full text-center text-[11px] text-[#8a757b] underline transition-colors hover:text-black"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
