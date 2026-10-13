"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "./CartProvider";

type Item = Omit<CartItem, "qty">;

export default function AddToCartButton({ item, qty = 1, variant = "card", goToCart = false, label }: {
  item: Item; qty?: number; variant?: "card" | "accent" | "buy"; goToCart?: boolean; label?: string;
}) {
  const { add } = useCart();
  const router = useRouter();
  const [done, setDone] = useState(false);
  const cls =
    variant === "card"
      ? "h-10 w-full rounded-[3px] border border-accent text-[13px] font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
      : variant === "buy"
        ? "btn-buy w-full"
        : "btn-accent w-full";
  return (
    <button
      type="button"
      className={cls}
      onClick={() => {
        add(item, qty);
        if (goToCart) {
          router.push("/cart");
          return;
        }
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? "Added ✓" : label ?? "Add to cart"}
    </button>
  );
}
