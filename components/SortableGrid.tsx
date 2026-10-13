"use client";

import { Children, useMemo, useState } from "react";

type Meta = { price: number; title: string; brand: string; inStock: boolean };

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price, low to high", fn: (a: Meta, b: Meta) => a.price - b.price },
  "price-desc": { label: "Price, high to low", fn: (a: Meta, b: Meta) => b.price - a.price },
  "title-asc": { label: "Alphabetically, A–Z", fn: (a: Meta, b: Meta) => a.title.localeCompare(b.title) },
} as const;

export default function SortableGrid({ meta, children }: { meta: Meta[]; children: React.ReactNode }) {
  const cards = Children.toArray(children);
  const [sort, setSort] = useState<keyof typeof SORTS>("featured");
  const [brand, setBrand] = useState<string | null>(null);
  const brands = useMemo(() => Array.from(new Set(meta.map((m) => m.brand))).sort(), [meta]);

  const order = useMemo(() => {
    const idx = meta.map((m, i) => ({ m, i })).filter(({ m }) => !brand || m.brand === brand);
    if (sort !== "featured") idx.sort((a, b) => SORTS[sort].fn(a.m, b.m));
    return idx.map(({ i }) => i);
  }, [meta, sort, brand]);

  return (
    <div>
      <div className="flex flex-col gap-3 border-y border-line py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-ink-muted">Filter:</span>
          {brands.length > 1 ? (
            <>
              <Chip on={!brand} onClick={() => setBrand(null)}>All brands</Chip>
              {brands.map((b) => <Chip key={b} on={brand === b} onClick={() => setBrand(b)}>{b}</Chip>)}
            </>
          ) : (
            <span className="text-ink">{brands[0]}</span>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-ink-muted">Sort by:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof SORTS)} className="h-9 border border-line bg-white px-2 text-sm text-ink outline-none focus:border-accent">
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </label>
          <span className="tnum text-ink-meta">{order.length} products</span>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {order.map((i) => <div key={i}>{cards[i]}</div>)}
      </div>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`h-8 rounded-[3px] border px-3 text-[13px] transition-colors ${on ? "border-accent bg-accent text-white" : "border-line bg-white text-ink hover:border-line-strong"}`}>
      {children}
    </button>
  );
}
