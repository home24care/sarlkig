import { site } from "@/lib/site";
import { Icon } from "@/components/icons";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact us", description: `Reach the ${site.name} team by email or phone.` };

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    address: site.postalAddress,
    contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: site.email, telephone: site.phone, areaServed: "US", availableLanguage: "English" },
  };
  return (
    <div className="container-site py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="micro">Customer service</div>
      <h1 className="h-display mt-2 text-4xl">Contact us</h1>
      <p className="mt-2 max-w-2xl text-ink-muted">
        Product questions, quotes for bulk or pallet orders, order problems — we answer within one business day.
      </p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[360px_1fr]">
        <div className="space-y-3">
          {[
            { I: Icon.Mail, t: "Email", v: site.email, href: `mailto:${site.email}` },
            { I: Icon.Phone, t: "Phone", v: site.phone, href: site.phoneHref },
            { I: Icon.Clock, t: "Support hours", v: site.hours },
            { I: Icon.Warehouse, t: "Address", v: site.address },
          ].map(({ I, t, v, href }) => (
            <div key={t} className="card flex gap-4 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[4px] bg-tint text-accent"><I className="h-5 w-5" /></span>
              <div>
                <div className="micro">{t}</div>
                {href ? <a href={href} className="link text-sm">{v}</a> : <div className="text-sm text-ink-body">{v}</div>}
              </div>
            </div>
          ))}
          <div className="rounded-[4px] bg-surface p-4 text-sm text-ink-muted">
            Ordering a pallet or 5+ units? Include the products, quantities and delivery ZIP code and we&apos;ll come back with freight details.
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
