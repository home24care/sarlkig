"use client";

import { useState } from "react";
import type { CartItem } from "@/components/CartProvider";
import { site } from "@/lib/site";

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function emailOrderHref(items: CartItem[], subtotal: number) {
  const lines = items.map((i) => `• ${i.qty} × ${i.title} (SKU ${i.sku}) — ${money(i.price * i.qty)}`).join("\n");
  const body = `Hello, I'd like to place this order:\n\n${lines}\n\nSubtotal: ${money(subtotal)} (free shipping)\n\nName:\nCompany (optional):\nPhone:\nDelivery address:\n`;
  return `mailto:${site.email}?subject=${encodeURIComponent("New order request")}&body=${encodeURIComponent(body)}`;
}

export default function CheckoutButton({ items, subtotal }: { items: CartItem[]; subtotal: number }) {
  const [state, setState] = useState<"idle" | "loading" | "fallback" | "error">("idle");

  async function go() {
    setState("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => ({ sku: i.sku, qty: i.qty })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.error === "checkout_not_configured") {
        setState("fallback");
        window.location.href = emailOrderHref(items, subtotal);
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <div>
      <button onClick={go} disabled={state === "loading"} className="btn-buy w-full disabled:opacity-70">
        {state === "loading" ? "Opening secure checkout…" : "Checkout"}
      </button>
      {state === "fallback" && (
        <p className="mt-2 text-center text-xs text-ink-muted">
          Your email app opened with the order filled in. Nothing happened?{" "}
          <a className="link" href={emailOrderHref(items, subtotal)}>Try again</a> or call {site.phone}.
        </p>
      )}
      {state === "error" && (
        <p className="mt-2 text-center text-xs text-red-700">
          Checkout couldn&apos;t start. Please try again, or <a className="link" href={emailOrderHref(items, subtotal)}>email your order</a>.
        </p>
      )}
    </div>
  );
}
