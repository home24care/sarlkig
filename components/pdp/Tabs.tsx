"use client";

import { Children, useState } from "react";

export default function Tabs({ labels, children }: { labels: string[]; children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const panels = Children.toArray(children);
  return (
    <div>
      <div role="tablist" className="no-scrollbar flex gap-8 overflow-x-auto border-b border-line">
        {labels.map((l, i) => (
          <button
            key={l}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`-mb-px shrink-0 border-b-2 py-3 font-display text-lg font-medium transition-colors ${i === active ? "border-accent text-ink" : "border-transparent text-ink-meta hover:text-ink"}`}
          >
            {l}
          </button>
        ))}
      </div>
      {panels.map((p, i) => (
        <div key={i} role="tabpanel" hidden={i !== active} className="pt-7">
          {p}
        </div>
      ))}
    </div>
  );
}
