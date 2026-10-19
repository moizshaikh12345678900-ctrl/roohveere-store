"use client";

const money = (n) => `PKR ${Number(n).toLocaleString("en-PK")}`;

export default function CartDrawer({
  open,
  items = [],
  onClose = () => {},
  onUpdateQty = () => {},
  onOpenCheckout = () => {},
}) {
  if (!open) return null;

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="relative flex h-full w-full max-w-[490px] flex-col bg-[#fffdfb] shadow-2xl text-[#35232b] font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0e2e5] px-6 py-6 sm:px-7">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-[#a06c77]">
              YOUR SELECTION
            </span>
            <h2 className="font-serif text-2xl font-semibold text-[#2c1d18]">
              Your Bag <span className="text-base font-normal text-[#8a757b]">({count})</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f0e0e3] bg-white text-xl text-[#6d5260] hover:bg-[#fff0f3] transition-colors"
          >
            ×
          </button>
        </div>

        {/* Empty State */}
        {!items.length ? (
          <div className="m-auto flex max-w-[320px] flex-col items-center px-6 py-10 text-center">
            <div className="font-serif text-6xl text-[#d7b7bd] mb-3">♡</div>
            <h3 className="font-serif text-lg font-medium text-[#2c1d18] mb-1">
              Your bag is waiting for a little soul.
            </h3>
            <p className="text-xs text-[#8a757b] mb-6">Discover a scent that feels like you.</p>
            <button
              onClick={onClose}
              className="w-full rounded-md bg-[#8d1239] py-3 text-xs font-semibold text-white shadow hover:bg-[#70102e] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-7 divide-y divide-[#f0e5e6]">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[80px_1fr_auto] sm:grid-cols-[95px_1fr_auto] gap-4 py-5 items-start">
                  
                  {/* Image Thumb */}
                  <div className="h-[105px] sm:h-[120px] w-full bg-[#f3e9e7] rounded-md overflow-hidden flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col items-start gap-1">
                    <strong className="font-serif text-base sm:text-lg text-[#17283a]">
                      {item.name}
                    </strong>
                    <span className="text-[11px] text-[#8a757b]">
                      {item.category} · 50ml
                    </span>
                    <b className="text-xs text-[#8d1239] font-bold mt-0.5">
                      {money(item.price)}
                    </b>

                    {/* Quantity Control */}
                    <div className="mt-2 flex items-center border border-[#e9dadd] rounded bg-white text-xs">
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-3 font-semibold text-gray-800">{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="px-2.5 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onUpdateQty(item.id, 0)}
                    className="text-[10px] text-[#9b8c91] underline hover:text-[#8d1239]"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary & Checkout */}
            <div className="border-t border-[#eee0e3] bg-white p-6 sm:p-7 space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold text-[#2c1d18]">
                <span>Subtotal</span>
                <b className="text-[#8d1239]">{money(subtotal)}</b>
              </div>
              
              <p className="text-[11px] text-[#8a757b]">
                Shipping and discounts will be confirmed at checkout.
              </p>

              {/* Checkout Button - Opens OrderDrawer */}
              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full rounded-md bg-[#8d1239] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#70102e] transition-colors"
              >
                Proceed to Checkout →
              </button>

              <button
                onClick={onClose}
                className="block w-full text-center text-[11px] text-[#8a757b] underline hover:text-black mt-2"
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