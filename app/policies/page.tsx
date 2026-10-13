import Link from "next/link";
import { policies } from "@/lib/site";
import { policyContent } from "@/lib/policies";

export const metadata = { title: "Store policies", description: "Shipping, returns, warranty, payment, compliance, privacy and terms." };

export default function PoliciesIndex() {
  return (
    <div className="container-site py-10">
      <div className="micro">Customer service</div>
      <h1 className="h-display mt-2 text-4xl">Store policies</h1>
      <p className="mt-2 max-w-2xl text-ink-muted">Plain-English terms for buying from us. Each page shows the date it was last updated.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {policies.map((p) => (
          <Link key={p.slug} href={`/policies/${p.slug}`} className="card group p-6 transition-colors hover:border-accent">
            <div className="font-display text-xl font-medium text-ink group-hover:text-accent">{p.title}</div>
            <p className="mt-2 text-sm leading-6 text-ink-muted">{policyContent[p.slug].summary}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-accent">Read policy →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
