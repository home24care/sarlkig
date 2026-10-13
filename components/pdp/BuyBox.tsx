"use client";

import { useEffect, useRef, useState } from "react";
import AddToCartButton from "../AddToCartButton";
import type { CartItem } from "../CartProvider";
import { Icon } from "../icons";

function addBusinessDays(d: Date, n: number) {
  const r = new Date(d);
  let added = 0;
  while (added < n) {
    r.setDate(r.getDate() + 1);
    if (r.getDay() !== 0 && r.getDay() !== 6) added++;
  }
  return r;
}

// Matches the shipping policy: dispatch within 1 business day, transit 1–4 business days.
function estimate() {
  const nowET = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const ship = addBusinessDays(nowET, 1);
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  return { ship: fmt(ship), from: fmt(addBusinessDays(ship, 1)), to: fmt(addBusinessDays(ship, 4)) };
}

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function BuyBox({ item, inStock, freight, brand }: { item: Omit<CartItem, "qty">; inStock: boolean; freight: boolean; brand: string }) {
  const [qty, setQty] = useState(1);
  const [eta, setEta] = useState<ReturnType<typeof estimate> | null>(null);
  const [showBar, setShowBar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setEta(estimate()), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {inStock && eta && (
        <div className="mb-5 flex gap-3 rounded-[4px] border border-line bg-surface px-4 py-3 text-[13px] leading-5">
          <Icon.Truck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          {freight ? (
            <span className="text-ink-body">
              <strong className="text-ink">Ships by {eta.ship}</strong> as palletised freight — the carrier calls to book your delivery appointment.
            </span>
          ) : (
            <span className="text-ink-body">
              Order now — <strong className="text-ink">ships by {eta.ship}</strong>.
              Estimated delivery <strong className="text-ink">{eta.from} – {eta.to}</strong>, free.
            </span>
          )}
        </div>
      )}

      <div className="micro mb-2">Quantity</div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-[46px] w-full shrink-0 items-center border border-line-strong sm:w-[132px]">
          <button className="grid h-full w-11 place-items-center text-ink hover:bg-surface" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
            <Icon.Minus className="h-4 w-4" />
          </button>
          <input
            value={qty}
            inputMode="numeric"
            aria-label="Quantity"
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value.replace(/\D/g, "") || "1", 10)))}
            className="tnum h-full w-full min-w-0 text-center text-sm outline-none"
          />
          <button className="grid h-full w-11 place-items-center text-ink hover:bg-surface" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
            <Icon.Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3">
          <AddToCartButton item={item} qty={qty} variant="accent" />
          <AddToCartButton item={item} qty={qty} variant="buy" goToCart label="Buy now" />
        </div>
      </div>

      <div className="mt-4 space-y-2 text-[13px] text-ink-muted">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${inStock ? "bg-ice-500" : "bg-line-strong"}`} />
          {inStock ? "In stock, ready to ship" : "Currently out of stock"}
        </div>
        <div className="flex items-center gap-2">
          <Icon.Shield className="h-4 w-4" />
          {brand === "Sarlkig" ? "Factory sealed · 30-day defect cover" : `Genuine ${brand} · factory-new with full manufacturer warranty`}
        </div>
        <div className="flex items-center gap-2">
          <Icon.Lock className="h-4 w-4" /> Secure checkout with Stripe — card details never reach this site
        </div>
      </div>

      {/* Mobile sticky purchase bar */}
      <div className={`fixed inset-x-0 bottom-[58px] z-30 border-t border-line bg-white px-4 py-2.5 shadow-[0_-4px_12px_rgb(12_17_23/0.08)] transition-transform md:hidden ${showBar ? "translate-y-0" : "pointer-events-none translate-y-[200%]"}`}>
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs text-ink-muted">{item.title}</div>
            <div className="tnum font-semibold text-ink">{money(item.price)} <span className="text-xs font-normal text-rating-text">· Free shipping</span></div>
          </div>
          <div className="w-36"><AddToCartButton item={item} qty={qty} variant="accent" /></div>
        </div>
      </div>
    </div>
  );
}
