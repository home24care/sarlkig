import Link from "next/link";
import Stripe from "stripe";
import { site } from "@/lib/site";
import { Icon } from "@/components/icons";
import ClearCart from "./ClearCart";

export const metadata = { title: "Order confirmed", robots: { index: false } };

async function loadSession(id?: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !id || !id.startsWith("cs_")) return null;
  try {
    return await new Stripe(key).checkout.sessions.retrieve(id);
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const s = await loadSession(session_id);
  const paid = s?.payment_status === "paid";

  return (
    <div className="container-site max-w-3xl py-14">
      <ClearCart />
      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#eef8f1] text-rating-text"><Icon.Check className="h-7 w-7" /></span>
      <h1 className="h-display mt-5 text-4xl">{paid || !s ? "Thank you — your order is in" : "Your order is being processed"}</h1>
      <p className="mt-3 text-ink-body">
        {s?.customer_details?.email
          ? <>A confirmation is on its way to <strong>{s.customer_details.email}</strong>.</>
          : "A confirmation email is on its way."}{" "}
        We dispatch within 1 business day and email your tracking number as soon as it leaves the warehouse.
      </p>
      {s?.amount_total != null && (
        <div className="mt-6 rounded-[4px] border border-line bg-surface p-5 text-sm">
          <div className="flex justify-between"><span className="text-ink-muted">Order reference</span><span className="tnum font-medium">{s.id.slice(-10).toUpperCase()}</span></div>
          <div className="mt-2 flex justify-between"><span className="text-ink-muted">Total paid</span><span className="tnum font-semibold">{(s.amount_total / 100).toLocaleString("en-US", { style: "currency", currency: "USD" })}</span></div>
        </div>
      )}
      <ol className="mt-8 space-y-3 text-sm text-ink-body">
        <li className="flex gap-3"><Icon.Warehouse className="h-5 w-5 shrink-0 text-accent" /> Picked and packed within 1 business day (Mon–Fri).</li>
        <li className="flex gap-3"><Icon.Truck className="h-5 w-5 shrink-0 text-accent" /> Tracking emailed on dispatch. Freight orders get a call to book delivery.</li>
        <li className="flex gap-3"><Icon.Shield className="h-5 w-5 shrink-0 text-accent" /> Inspect on arrival — report any damage within 72 hours and we&apos;ll put it right.</li>
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/collections" className="btn-accent">Continue shopping</Link>
        <a href={`mailto:${site.email}?subject=Question%20about%20my%20order`} className="btn-ghost">Questions? Email us</a>
      </div>
    </div>
  );
}
