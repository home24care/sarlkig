import Link from "next/link";
import { site } from "@/lib/site";
import { Icon } from "@/components/icons";

export const metadata = { title: "Frequently asked questions", description: "Shipping, returns, EPA certification, warranty and payment questions answered." };

const FAQ: { group: string; items: [string, React.ReactNode][] }[] = [
  {
    group: "Buying",
    items: [
      ["Do I need EPA certification to buy refrigerant here?", <>For restricted refrigerants, yes: EPA Section 608, or Section 609 for motor-vehicle A/C work. Placing an order confirms you are permitted to buy it. See the <Link href="/policies/compliance">compliance policy</Link>.</>],
      ["Is the refrigerant virgin or reclaimed?", "Each listing says so in the title and description. Most of our cylinders are virgin, factory-sealed product; reclaimed lines are clearly labelled."],
      ["Are the water heaters and boilers new?", "Yes — every appliance is factory-new in the manufacturer's sealed carton and carries the full manufacturer warranty."],
      ["Natural gas or propane — how do I choose?", "Match the fuel your site is plumbed for. Model numbers ending in N are natural gas and those ending in P are propane (for example RU199iN vs RU199iP). If you're unsure, email us the model on your current unit."],
      ["Can I mix two refrigerants, or top up one with another?", "No. A mixture behaves like neither gas and no pressure–temperature chart describes it. Recover the charge and refill with the refrigerant on the equipment data plate."],
    ],
  },
  {
    group: "Shipping",
    items: [
      ["How much is shipping?", "It's free on every order within the United States, with no minimum."],
      ["How long will my order take?", "We dispatch within 1 business day (Mon–Fri). Parcel delivery takes 1–4 business days; freight and pallets are delivered by appointment."],
      ["Why does the carrier's weight differ from the product weight?", "Carrier weight includes the cylinder or appliance itself plus packaging. Refrigerant weights on our pages are net fill weight."],
      ["Can I ship one order to several addresses?", "No — please place one order per delivery address so each shipment has its own tracking."],
      ["Do you ship outside the United States?", "Not at the moment. We ship to U.S. addresses only."],
    ],
  },
  {
    group: "After you order",
    items: [
      ["Can I return something I don't need?", <>Yes, within 90 days if it's unopened and factory-sealed, with no restocking fee. Opened refrigerant and installed appliances can't be returned. See <Link href="/policies/returns">returns & refunds</Link>.</>],
      ["My order arrived damaged. What now?", "Photograph it and email us with your order number within 72 hours. We'll replace it or refund you — usually without you shipping it back."],
      ["How long does a refund take?", "We inspect approved returns within 72 hours of arrival and refund within 7 business days to your original payment method."],
      ["What does the warranty cover?", <>Appliances carry the full manufacturer warranty. Refrigerant, cylinders and accessories have our 30-day defect cover. See the <Link href="/policies/warranty">warranty policy</Link>.</>],
    ],
  },
  {
    group: "Payment",
    items: [
      ["Is my card safe?", "Yes. Payment is taken on Stripe's hosted checkout — card details go straight to Stripe and never reach our servers."],
      ["How do I reach a person?", `Email ${site.email} or call ${site.phone}, ${site.hours}.`],
    ],
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.flatMap((g) => g.items.filter(([, a]) => typeof a === "string").map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a as string } }))),
  };
  return (
    <div className="container-site py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="micro">Help</div>
      <h1 className="h-display mt-2 text-4xl">Frequently asked questions</h1>
      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {FAQ.map((g) => (
            <section key={g.group}>
              <h2 className="h-display text-2xl">{g.group}</h2>
              <div className="mt-3 divide-y divide-line border-y border-line">
                {g.items.map(([q, a]) => (
                  <details key={q} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                      {q}
                      <Icon.Plus className="h-4 w-4 shrink-0 text-ink-meta transition-transform group-open:rotate-45" />
                    </summary>
                    <div className="prose-sg mt-2 text-sm">{a}</div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
        <aside className="h-fit rounded-[4px] border border-line bg-surface p-6">
          <div className="font-display text-xl font-medium text-ink">Still need help?</div>
          <p className="mt-2 text-sm text-ink-muted">Talk to someone who knows the product — not a script.</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><Icon.Mail className="h-4 w-4 text-accent" /><a className="link" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex gap-2"><Icon.Phone className="h-4 w-4 text-accent" /><a className="link" href={site.phoneHref}>{site.phone}</a></li>
            <li className="flex gap-2"><Icon.Clock className="h-4 w-4 text-accent" />{site.hours}</li>
          </ul>
          <Link href="/contact" className="btn-accent mt-5 w-full">Contact us</Link>
        </aside>
      </div>
    </div>
  );
}
