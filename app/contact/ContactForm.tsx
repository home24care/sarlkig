"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const TOPICS = ["Product question", "Bulk / pallet quote", "Order status", "Return or damaged item", "Something else"];

export default function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", order: "", topic: TOPICS[0], message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const field = "mt-1 h-11 w-full border border-line-strong px-3 text-sm outline-none focus:border-accent";

  return (
    <form
      className="rounded-[4px] border border-line p-6"
      onSubmit={(e) => {
        e.preventDefault();
        const subject = `${f.topic}${f.order ? ` — order ${f.order}` : ""}`;
        const body = `${f.message}\n\n— ${f.name} (${f.email})${f.order ? `\nOrder: ${f.order}` : ""}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }}
    >
      <h2 className="font-display text-2xl font-medium text-ink">Send us a message</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-ink">Name<input required value={f.name} onChange={set("name")} className={field} /></label>
        <label className="text-sm font-medium text-ink">Email<input required type="email" value={f.email} onChange={set("email")} className={field} /></label>
        <label className="text-sm font-medium text-ink">Topic
          <select value={f.topic} onChange={set("topic")} className={`${field} bg-white`}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select>
        </label>
        <label className="text-sm font-medium text-ink">Order number <span className="font-normal text-ink-meta">(optional)</span><input value={f.order} onChange={set("order")} className={field} /></label>
      </div>
      <label className="mt-4 block text-sm font-medium text-ink">Message
        <textarea required rows={6} value={f.message} onChange={set("message")} className="mt-1 w-full border border-line-strong p-3 text-sm outline-none focus:border-accent" />
      </label>
      <button className="btn-accent mt-5">Send message</button>
      <p className="mt-3 text-xs text-ink-meta">This opens your email app with the message filled in. Prefer to call? {site.phone}</p>
    </form>
  );
}
