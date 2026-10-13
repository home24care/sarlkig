"use client";

import { useState } from "react";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const list = images.length ? images : [""];
  return (
    <div>
      <div className="card relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={list[i]} alt={alt} fetchPriority="high" className="h-full w-full object-contain p-6 md:p-10" />
        {list.length > 1 && (
          <span className="tnum absolute bottom-3 right-3 rounded-[3px] bg-white/90 px-2 py-0.5 text-[11px] text-ink-meta">
            {i + 1} / {list.length}
          </span>
        )}
      </div>
      {list.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {list.map((src, idx) => (
            <button
              key={src}
              onClick={() => setI(idx)}
              aria-label={`Image ${idx + 1}`}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-[3px] border bg-white ${idx === i ? "border-accent ring-1 ring-accent" : "border-line hover:border-line-strong"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" className="h-full w-full object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
