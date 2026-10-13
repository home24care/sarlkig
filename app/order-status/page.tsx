import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "@/components/icons";

export const metadata = { title: "Order status", description: "Track your order and find out what happens after you buy." };

const STEPS = [
  { I: Icon.Mail, t: "Order confirmed", d: "You get an email confirmation as soon as payment goes through." },
  { I: Icon.Warehouse, t: "Picked & packed", d: "We pick and pack within 1 business day (Mon–Fri)." },
  { I: Icon.Truck, t: "Dispatched", d: "A tracking number is emailed when the order leaves the warehouse. First scans can take up to 48 hours." },
  { I: Icon.Home, t: "Delivered", d: "Parcels arrive in 1–4 business days. Freight is delivered by appointment. Inspect within 72 hours." },
];

export default function OrderStatusPage() {
  return (
    <div className="container-site py-10">
      <div className="micro">Customer service</div>
      <h1 className="h-display mt-2 text-4xl">Order status</h1>
      <p className="mt-2 max-w-2xl text-ink-muted">
        Your tracking link is in the dispatch email we send when your order ships. Can&apos;t find it? Send us your order
        number and we&apos;ll reply with the latest carrier update.
      </p>
      <ol className="mt-8 grid gap-4 md:grid-cols-4">
        {STEPS.map(({ I, t, d }, i) => (
          <li key={t} className="card p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[4px] bg-tint text-accent"><I className="h-5 w-5" /></span>
              <span className="tnum text-xs text-ink-meta">Step {i + 1}</span>
            </div>
            <div className="mt-3 font-display text-lg font-medium text-ink">{t}</div>
            <p className="mt-1 text-sm leading-6 text-ink-muted">{d}</p>
          </li>
        ))}
      </ol>
      <div className="mt-8 flex flex-col gap-4 rounded-[4px] border border-line bg-surface p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-xl font-medium text-ink">Ask about an order</div>
          <p className="text-sm text-ink-muted">Email your order number to <a className="link" href={`mailto:${site.email}?subject=Order%20status`}>{site.email}</a> or call {site.phone}.</p>
        </div>
        <div className="flex gap-3">
          <a href={`mailto:${site.email}?subject=Order%20status`} className="btn-accent">Email us</a>
          <Link href="/policies/shipping" className="btn-ghost">Shipping policy</Link>
        </div>
      </div>
    </div>
  );
}
