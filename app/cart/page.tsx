"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Icon } from "@/components/icons";
import CheckoutButton from "./CheckoutButton";

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();

  return (
    <div className="container-site py-10">
      <h1 className="h-display text-4xl">Shopping cart</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-[4px] border border-line bg-surface p-10 text-center">
          <p className="text-ink-body">Your cart is empty.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/collections/water-heaters" className="btn-accent">Shop water heaters</Link>
            <Link href="/collections/refrigerants" className="btn-ghost">Shop refrigerants</Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-3 flex items-center gap-2 rounded-[4px] border border-[#cfe6d6] bg-[#eef8f1] px-4 py-3 text-sm text-rating-text">
              <Icon.Truck className="h-5 w-5" /> Your order ships free — dispatched within 1 business day.
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {items.map((i) => (
                <li key={i.sku} className="flex gap-4 py-5">
                  <Link href={`/products/${i.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-[3px] border border-line bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={i.image} alt={i.title} className="h-full w-full object-contain p-2" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${i.slug}`} className="line-clamp-2 text-sm font-medium text-ink hover:text-accent">{i.title}</Link>
                    <div className="tnum mt-1 text-xs text-ink-meta">SKU {i.sku} · {money(i.price)} each</div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex h-9 items-center border border-line-strong">
                        <button className="grid h-full w-9 place-items-center hover:bg-surface" onClick={() => setQty(i.sku, i.qty - 1)} aria-label="Decrease"><Icon.Minus className="h-3.5 w-3.5" /></button>
                        <span className="tnum w-8 text-center text-sm">{i.qty}</span>
                        <button className="grid h-full w-9 place-items-center hover:bg-surface" onClick={() => setQty(i.sku, i.qty + 1)} aria-label="Increase"><Icon.Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button onClick={() => remove(i.sku)} className="text-xs text-ink-meta underline hover:text-ink">Remove</button>
                    </div>
                  </div>
                  <div className="tnum text-right font-semibold text-ink">{money(i.price * i.qty)}</div>
                </li>
              ))}
            </ul>
            <Link href="/collections" className="mt-5 inline-block text-sm font-semibold text-accent">← Continue shopping</Link>
          </div>

          <aside className="h-fit rounded-[4px] border border-line">
            <div className="border-b border-line p-5">
              <div className="font-display text-xl font-medium text-ink">Order summary</div>
            </div>
            <dl className="space-y-3 p-5 text-sm">
              <div className="flex justify-between"><dt className="text-ink-muted">Subtotal ({count} item{count === 1 ? "" : "s"})</dt><dd className="tnum font-medium">{money(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted">Shipping</dt><dd className="font-semibold text-rating-text">Free</dd></div>
              <div className="flex justify-between"><dt className="text-ink-muted">Tax</dt><dd className="text-ink-meta">Calculated at checkout</dd></div>
              <div className="flex justify-between border-t border-line pt-3 text-base"><dt className="font-semibold">Estimated total</dt><dd className="tnum font-semibold">{money(subtotal)}</dd></div>
            </dl>
            <div className="px-5 pb-5">
              <CheckoutButton items={items} subtotal={subtotal} />
              <ul className="mt-5 space-y-2 border-t border-line pt-4 text-xs text-ink-muted">
                <li className="flex gap-2"><Icon.Lock className="h-4 w-4 shrink-0 text-accent" /> Secure checkout powered by Stripe</li>
                <li className="flex gap-2"><Icon.Refresh className="h-4 w-4 shrink-0 text-accent" /> 90-day returns on unopened, sealed items</li>
                <li className="flex gap-2"><Icon.Shield className="h-4 w-4 shrink-0 text-accent" /> Damaged or incorrect? Replaced or refunded</li>
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
