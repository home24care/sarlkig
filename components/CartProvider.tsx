"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  sku: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (sku: string) => void;
  setQty: (sku: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartCtx = createContext<CartState | null>(null);

const STORAGE_KEY = "sarlkig_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const api = useMemo<CartState>(() => {
    const count = items.reduce((a, b) => a + b.qty, 0);
    const subtotal = items.reduce((a, b) => a + b.qty * b.price, 0);
    return {
      items,
      count,
      subtotal,
      add: (item, qty = 1) => {
        setItems((cur) => {
          const existing = cur.find((i) => i.sku === item.sku);
          if (existing) {
            return cur.map((i) => (i.sku === item.sku ? { ...i, qty: i.qty + qty } : i));
          }
          return [...cur, { ...item, qty }];
        });
      },
      remove: (sku) => setItems((cur) => cur.filter((i) => i.sku !== sku)),
      setQty: (sku, qty) =>
        setItems((cur) =>
          qty <= 0 ? cur.filter((i) => i.sku !== sku) : cur.map((i) => (i.sku === sku ? { ...i, qty } : i)),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const v = useContext(CartCtx);
  if (!v) throw new Error("useCart must be used inside CartProvider");
  return v;
}
