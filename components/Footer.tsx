import Link from "next/link";
import Logo from "./Logo";
import PaymentIcons from "./PaymentIcons";
import { site, policies } from "@/lib/site";
import { gases, gasSlug, inCollection } from "@/lib/products";

export default function Footer() {
  const shop = [
    { href: "/collections/water-heaters", label: "Water heaters", n: inCollection("water-heaters").length },
    { href: "/collections/boilers", label: "Boilers", n: inCollection("boilers").length },
    { href: "/collections/refrigerants", label: "All refrigerants", n: inCollection("refrigerants").length },
    { href: "/collections/r-134a", label: "R-134a", n: inCollection("r-134a").length },
    { href: "/collections/r-410a", label: "R-410A", n: inCollection("r-410a").length },
    { href: "/collections/bulk-pallets", label: "Pallets & bulk packs", n: inCollection("bulk-pallets").length },
    { href: "/collections/rinnai", label: "Rinnai", n: inCollection("rinnai").length },
    { href: "/collections/navien", label: "Navien", n: inCollection("navien").length },
  ];
  const service = [
    { href: "/faq", label: "FAQ" },
    { href: "/order-status", label: "Order status" },
    { href: "/contact", label: "Contact" },
    ...policies.filter((p) => ["shipping", "returns", "warranty", "order-acceptance", "payment-security"].includes(p.slug))
      .map((p) => ({ href: `/policies/${p.slug}`, label: p.short })),
  ];
  const company = [
    { href: "/about", label: "About" },
    ...policies.filter((p) => ["compliance", "privacy", "terms"].includes(p.slug)).map((p) => ({ href: `/policies/${p.slug}`, label: p.short })),
    { href: "/policies", label: "All policies" },
  ];

  return (
    <footer className="mt-20 bg-dark pb-20 text-dark-text md:pb-0">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-6 text-dark-muted">{site.description}</p>
          <ul className="mt-5 space-y-1.5 text-sm">
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li><a href={site.phoneHref} className="hover:text-white">{site.phone}</a></li>
            <li className="text-dark-muted">{site.address}</li>
            <li className="text-dark-muted">{site.hours}</li>
            <li className="text-dark-muted">Free shipping on every order · United States only</li>
          </ul>
        </div>
        <FooterCol title="Shop" links={shop.map((s) => ({ href: s.href, label: s.label, n: s.n }))} />
        <FooterCol title="Customer service" links={service} />
        <FooterCol title="Company" links={company} />
      </div>

      <div className="border-t border-dark-rule">
        <div className="container-site flex flex-wrap gap-x-4 gap-y-2 py-5 text-xs text-dark-muted">
          {gases.map((g) => (
            <Link key={g} href={`/collections/${gasSlug(g)}`} className="hover:text-white">{g}</Link>
          ))}
        </div>
      </div>

      <div className="border-t border-dark-rule">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-dark-muted md:flex-row md:items-center md:justify-between">
          <span>Card payments are processed by Stripe. Card details go straight to Stripe and never reach this site.</span>
          <PaymentIcons />

        </div>
      </div>

      <div className="border-t border-dark-rule">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-dark-muted md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span>
            Refrigerant sales are restricted by federal and state regulation.{" "}
            <Link href="/policies/compliance" className="underline hover:text-white">Read the compliance policy.</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string; n?: number }[] }) {
  return (
    <div>
      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white">{title}</div>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex gap-2 hover:text-white">
              {l.label}
              {typeof l.n === "number" && <span className="tnum text-dark-muted">{l.n}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
