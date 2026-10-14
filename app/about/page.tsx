import Link from "next/link";
import { site } from "@/lib/site";
import { inCollection, products, gases } from "@/lib/products";
import { Icon } from "@/components/icons";

export const metadata = { title: "About us", description: `Who ${site.name} is, what we stock and how we handle regulated goods.` };

export default function AboutPage() {
  const stats = [
    [String(products.filter((p) => p.availability === "in_stock").length), "products in stock"],
    [String(inCollection("rinnai").length + inCollection("navien").length), "Rinnai & Navien units"],
    [String(gases.length), "refrigerant types"],
    ["1 day", "dispatch, Mon–Fri"],
  ];
  return (
    <div>
      <section className="bg-tint">
        <div className="container-site py-14">
          <div className="micro">Company</div>
          <h1 className="h-display mt-2 max-w-3xl text-[42px] leading-tight">About {site.name}</h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-7 text-ink-body">
            {site.name} supplies water heaters, boilers and refrigerant to plumbers, HVAC technicians, contractors and
            property managers across the United States. We keep stock in a U.S. warehouse, ship free on every order,
            and dispatch within one business day.
          </p>
          <dl className="mt-8 grid max-w-3xl grid-cols-2 border-y border-line md:grid-cols-4">
            {stats.map(([n, l], i) => (
              <div key={l} className={`py-4 ${i ? "md:border-l md:pl-4" : ""} border-line`}>
                <dt className="tnum font-display text-3xl font-semibold text-ink">{n}</dt>
                <dd className="text-xs text-ink-meta">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="container-site grid gap-12 py-14 lg:grid-cols-[1fr_360px]">
        <div className="prose-sg">
          <h2>What we stock, and why</h2>
          <p>We focus on the lines installers ask for most: Rinnai and Navien tankless water heaters, combi and heat-only boilers, wall furnaces and heaters, and the refrigerants that keep HVAC and refrigeration systems running — R-410A, R-22, R-134a, R-404A, the low-GWP replacements and genuine Honeywell gases.</p>
          <p>Keeping a focused range means we can hold real stock, know the products, and get them out the door the next business day.</p>

          <h2>How we handle regulated goods</h2>
          <p>Refrigerant is a restricted product and we treat it that way. Restricted lines are sold only to buyers permitted to purchase them, and shipped in the manufacturer&apos;s packaging with the required hazard markings. Gas appliances are sold for installation by licensed professionals. Read our <Link href="/policies/compliance">refrigerant compliance policy</Link>.</p>

          <h2>What we promise</h2>
          <ul>
            <li>Factory-new appliances and factory-sealed cylinders — never refurbished or refilled</li>
            <li>Full manufacturer warranty on every appliance, and 30-day defect cover on refrigerant</li>
            <li>Free shipping on every order, dispatched within 1 business day</li>
            <li>90-day returns on unopened items, with no restocking fee</li>
            <li>Damaged or wrong items replaced or refunded — usually without sending them back</li>
          </ul>
        </div>
        <aside className="h-fit rounded-[4px] border border-line p-6">
          <div className="font-display text-xl font-medium text-ink">Contact details</div>
          <ul className="mt-4 space-y-3 text-sm text-ink-body">
            <li className="flex gap-2"><Icon.Mail className="h-4 w-4 shrink-0 text-accent" /><a className="link" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex gap-2"><Icon.Phone className="h-4 w-4 shrink-0 text-accent" /><a className="link" href={site.phoneHref}>{site.phone}</a></li>
            <li className="flex gap-2"><Icon.Warehouse className="h-4 w-4 shrink-0 text-accent" />{site.address}</li>
            <li className="flex gap-2"><Icon.Clock className="h-4 w-4 shrink-0 text-accent" />{site.hours}</li>
          </ul>
          <Link href="/contact" className="btn-accent mt-5 w-full">Get in touch</Link>
        </aside>
      </div>
    </div>
  );
}
