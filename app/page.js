"use client";

import { useCallback, useMemo, useState } from "react";

import { products } from "../lib/products";

import Header from "../components/Header";
import Hero from "../components/Hero";
import ScentDuo from "../components/ScentDuo";
import ProductSection from "../components/ProductSection";
import Founder from "../components/Founder";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import OrderDrawer from "../components/OrderDrawer";
import PerfumeQuiz from "../components/PerfumeQuiz";

const money = (amount) =>
  `PKR ${Number(amount || 0).toLocaleString("en-PK")}`;

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.qty, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item.price || 0) * item.qty,
        0
      ),
    [cart]
  );
const addToCart = useCallback((product) => {
    if (!product?.id) return;

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...current, { ...product, qty: 1 }];
    });

    setSelectedProduct(null);
    setCartOpen(true); // <--- Yeh line add karne se item add hote hi cart drawer open ho jayega
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.id !== productId);
      }

      return current.map((item) =>
        item.id === productId ? { ...item, qty: quantity } : item
      );
    });
  }, []);

  const viewProduct = useCallback((product) => {
    if (!product) return;
    setSelectedProduct(product);
  }, []);

  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const openCart = useCallback(() => {
    setSelectedProduct(null);
    setOrderOpen(false);
    setCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  const openCheckout = useCallback(() => {
    setCartOpen(false);
    setOrderOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setOrderOpen(false);
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#35261e] font-sans">
      <Header cartCount={cartCount} onOpenCart={openCart} />

      <Hero />

      <ScentDuo
        onAddToCart={addToCart}
        onViewProduct={viewProduct}
        onOpenCart={openCart}
      />

      <ProductSection
        onAddToCart={addToCart}
        onViewProduct={viewProduct}
      />

      <Founder />

      <Footer />

      <PerfumeQuiz
        onAddToCart={addToCart}
        onViewProduct={viewProduct}
      />

      {/* Shopping cart drawer */}
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={closeCart}
        onUpdateQty={updateQuantity}
        onOpenCheckout={openCheckout}
      />

      {/* Checkout drawer */}
      <OrderDrawer
        open={orderOpen}
        items={cart}
        onClose={closeCheckout}
        onReturnToBag={openCart}
        whatsappNumber="923122344718"
      />

      {/* Product quick view modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProduct();
          }}
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-dialog-title"
            className="relative grid w-full max-w-3xl overflow-hidden rounded-xl bg-[#fffdfb] shadow-2xl sm:grid-cols-2"
          >
            <button
              type="button"
              onClick={closeProduct}
              aria-label="Close product details"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#eaded8] bg-white text-2xl text-[#5b4038] shadow-sm hover:bg-[#f8f0eb]"
            >
              ×
            </button>

            <div className="flex min-h-[280px] items-center justify-center bg-[#f5eee9] p-6 sm:min-h-[430px]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-[390px] w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-9">
              <span className="mb-3 text-[10px] font-bold uppercase tracking-[2px] text-[#a06c77]">
                {selectedProduct.category} · Eau de Parfum
              </span>

              <h2
                id="product-dialog-title"
                className="font-serif text-3xl leading-tight text-[#35261e] sm:text-4xl"
              >
                {selectedProduct.name}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#817066]">
                {selectedProduct.description}
              </p>

              <div className="mt-5 border-y border-[#eee2dc] py-4">
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#a06c77]">
                  Fragrance notes
                </span>
                <p className="mt-2 text-sm text-[#5c493e]">
                  {selectedProduct.notes}
                </p>
              </div>

              <p className="mt-6 font-serif text-2xl text-[#8d1239]">
                {money(selectedProduct.price)}
              </p>

              <button
                type="button"
                onClick={() => addToCart(selectedProduct)}
                className="mt-6 min-h-12 w-full rounded-md bg-[#8d1239] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6f0e2d] active:scale-[0.99]"
              >
                Add to Bag
              </button>

              <button
                type="button"
                onClick={() => {
                  addToCart(selectedProduct);
                  setCartOpen(true);
                }}
                className="mt-3 min-h-11 w-full rounded-md border border-[#e8d9d4] px-5 py-3 text-sm font-medium text-[#684b40] transition hover:bg-[#f8f0eb]"
              >
                Add &amp; View Bag
              </button>
            </div>
          </section>
        </div>
      )}

      {/* Floating subtotal shortcut */}
      {cartCount > 0 && !cartOpen && !orderOpen && (
        <button
          type="button"
          onClick={openCart}
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-full border border-[#f0dce1] bg-white px-5 py-3 text-sm text-[#35261e] shadow-[0_8px_30px_rgba(55,20,32,0.15)] transition hover:-translate-y-0.5"
        >
          <span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#8d1239] px-1 text-xs font-bold text-white">
            {cartCount}
          </span>

          <span>View bag</span>

          <strong className="text-[#8d1239]">
            {money(subtotal)}
          </strong>
        </button>
      )}
    </main>
  );
}