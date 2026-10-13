"use client";

import { useState } from "react";
import Stars from "./Stars";
import type { Review } from "@/lib/reviews";

const INITIAL = 10;

function fmtDate(d?: string) {
  if (!d) return null;
  return new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function Card({ r }: { r: Review }) {
  const partner = r.source === "freonwell";
  return (
    <article className="border border-line bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <Stars rating={r.rating} />
        {r.date && <time className="text-xs text-ink-meta">{fmtDate(r.date)}</time>}
      </div>
      <h3 className="mt-4 font-display text-[19px] font-semibold leading-snug text-ink">{r.title}</h3>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-ink-body">{r.body}</p>
      {r.photos && r.photos.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {r.photos.map((ph, i) => (
            <a key={ph.full} href={ph.full} target="_blank" rel="noopener nofollow" className="block h-20 w-20 overflow-hidden rounded-[3px] border border-line bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ph.thumb} alt={`Customer photo ${i + 1} from ${r.name}`} loading="lazy" className="h-full w-full object-cover" />
            </a>
          ))}
        </div>
      )}
      <div className="mt-5 border-t border-line pt-4 text-sm">
        <span className="font-semibold text-ink">{r.name}</span>
        {partner ? (
          <>
            <div className="mt-0.5 text-xs text-ink-meta">{r.verified ? "Verified buyer · " : ""}Freonwell</div>
            {r.product && <div className="mt-2 text-xs text-ink-muted">Reviewing {r.product}</div>}
          </>
        ) : (
          <span className="text-ink-meta"> · {r.location}</span>
        )}
      </div>
    </article>
  );
}

export default function ReviewList({ items }: { items: Review[] }) {
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, INITIAL);
  const cols = [shown.filter((_, i) => i % 2 === 0), shown.filter((_, i) => i % 2 === 1)];
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2">
        {cols.map((col, c) => (
          <div key={c} className="space-y-5">
            {col.map((r, i) => <Card key={`${r.source}-${r.name}-${i}-${r.title}`} r={r} />)}
          </div>
        ))}
      </div>
      {items.length > INITIAL && (
        <div className="mt-6 text-center">
          <button onClick={() => setAll((v) => !v)} className="btn-ghost">
            {all ? "Show fewer reviews" : `Show all ${items.length} reviews`}
          </button>
        </div>
      )}
    </div>
  );
}
