import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, money, productCollection, products, related } from "@/lib/products";
import { absUrl, site } from "@/lib/site";
import ProductCard from "@/components/ProductCard";
import Gallery from "@/components/pdp/Gallery";
import BuyBox from "@/components/pdp/BuyBox";
import Tabs from "@/components/pdp/Tabs";
import { Icon } from "@/components/icons";
import Stars from "@/components/Stars";
import PaymentIcons from "@/components/PaymentIcons";
import ReviewsSection from "@/components/ReviewsSection";
import { reviewStats } from "@/lib/reviews";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.shortDescription,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title: p.title, description: p.shortDescription, images: [p.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const col = productCollection(p);
  const isRef = p.category === "refrigerant";
  const isFreight = p.packQty > 1 && isRef;
  const images = p.gallery?.length ? p.gallery : [p.image];
  const rel = related(p, 4);
  const specRows: [string, string][] = [
    ["Brand", p.brand],
    ["Model / MPN", p.mpn],
    ["SKU", p.sku],
    ...Object.entries(p.specs),
    ...(p.packQty > 1 ? [["Units in pack", String(p.packQty)] as [string, string]] : []),
    ["Condition", "New, factory sealed"],
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.title,
      sku: p.sku,
      mpn: p.mpn,
      ...(p.gtin ? { gtin: p.gtin } : {}),
      brand: { "@type": "Brand", name: p.brand },
      image: images.map(absUrl),
      description: p.description,
      category: col.name,
      offers: {
        "@type": "Offer",
        url: `${site.url}/products/${p.slug}`,
        priceCurrency: p.currency,
        price: p.price.toFixed(2),
        itemCondition: "https://schema.org/NewCondition",
        availability: p.availability === "in_stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        seller: { "@type": "Organization", name: site.legalName },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
            transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 4, unitCode: "DAY" },
          },
        },
        hasMerchantReturnPolicy: {
          "@type": "MerchantReturnPolicy",
          applicableCountry: "US",
          returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
          merchantReturnDays: 90,
          returnMethod: "https://schema.org/ReturnByMail",
          returnFees: "https://schema.org/FreeReturn",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: col.name, item: `${site.url}/collections/${col.slug}` },
        { "@type": "ListItem", position: 3, name: p.title },
      ],
    },
  ];

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-site">
        <nav className="flex flex-wrap items-center gap-1.5 py-4 text-xs text-ink-meta">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href={`/collections/${col.slug}`} className="hover:text-accent">{col.name}</Link>
          <span>/</span>
          <span className="line-clamp-1 text-ink-muted">{p.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:gap-12">
          <div className="lg:sticky lg:top-4 lg:self-start">
            <Gallery images={images} alt={p.title} />
          </div>

          <div>
            <div className="micro">{p.brand}</div>
            <h1 className="h-display mt-2 text-[28px] leading-[1.15] md:text-[34px]">{p.title}</h1>
            {reviewStats.count > 0 && (
              <a href="#reviews" className="mt-3 flex items-center gap-2 text-[13px] text-ink-body">
                <Stars rating={reviewStats.avg} />
                <span><strong className="text-ink">{reviewStats.avg}</strong> out of 5</span>
                <span className="text-accent underline underline-offset-2">{reviewStats.count} store reviews</span>
              </a>
            )}

            <div className="mt-5 flex items-baseline gap-3">
              <span className="tnum text-[30px] font-semibold text-ink">{money(p.price)}</span>
              {p.perLb && isRef && <span className="tnum text-sm text-ink-meta">{money(p.perLb)} / lb</span>}
            </div>
            <div className="tnum mt-1 text-xs text-ink-meta">SKU {p.sku} · MPN {p.mpn} · Taxes calculated at checkout</div>

            <p className="mt-5 text-[15px] leading-7 text-ink-body">{p.shortDescription}</p>

            <div className="mt-6">
              <BuyBox item={{ sku: p.sku, slug: p.slug, title: p.title, price: p.price, image: p.image }} inStock={p.availability === "in_stock"} freight={isFreight} brand={p.brand} />
            </div>

            <p className="mt-3 text-[13px] text-ink-muted">
              Questions before you order? Call <a href={site.phoneHref} className="link">{site.phone}</a>
            </p>

            {/* Shipping & Support */}
            <div className="mt-6 overflow-hidden rounded-[4px] border border-line">
              <div className="flex items-center gap-3 border-b border-line bg-white p-4">
                <Icon.Truck className="h-7 w-7 text-accent" />
                <div>
                  <div className="font-display text-lg font-medium text-ink">Shipping &amp; Support</div>
                  <div className="text-xs text-ink-meta">Everything you need before ordering</div>
                </div>
              </div>
              <dl className="divide-y divide-line text-[13px]">
                {[
                  ["Shipping rate", "Free on every order"],
                  ["Dispatch", "1 business day (Mon–Fri)"],
                  ["Estimated delivery", isFreight ? "Freight — carrier books an appointment" : "1–4 business days"],
                  ["Shipping origin", "United States"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-3">
                    <dt className="text-ink-muted">{k}</dt>
                    <dd className="text-right font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="space-y-4 border-t border-line bg-surface p-4 text-[13px] leading-5">
                <div className="flex gap-3">
                  <Icon.Refresh className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div><div className="font-semibold text-ink">90-day returns</div><div className="text-ink-muted">Unopened, factory-sealed items. No restocking fee. Returns need approval first.</div></div>
                </div>
                <div className="flex gap-3">
                  <Icon.Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div><div className="font-semibold text-ink">After-sales support</div><div className="text-ink-muted">Phone and email {site.hours} · {site.phone}</div></div>
                </div>
                <div className="flex gap-3">
                  <Icon.Lock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div>
                    <div className="font-semibold text-ink">Accepted payments</div>
                    <PaymentIcons className="mt-2" />
                    <div className="mt-1.5 text-ink-meta">Secure checkout powered by Stripe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <section className="mt-14 max-w-4xl">
          <Tabs labels={["Overview", "Specifications", "Shipping & Returns", "Important information"]}>
            <div className="prose-sg">
              <p>{p.description}</p>
              <h3>Key benefits</h3>
              <ul>{(p.features ?? []).map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
            <dl className="overflow-hidden rounded-[4px] border border-line text-sm">
              {specRows.map(([k, v], i) => (
                <div key={k} className={`grid grid-cols-[minmax(140px,1fr)_2fr] gap-4 px-4 py-3 ${i % 2 ? "bg-white" : "bg-surface"}`}>
                  <dt className="text-ink-muted">{k}</dt>
                  <dd className="font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="prose-sg">
              <p>Shipping is free on every order within the United States, with no minimum. Orders are dispatched within 1 business day (Mon–Fri) and parcel transit takes 1–4 business days.{isFreight ? " This item ships as palletised freight — the carrier will contact you to book a delivery appointment, and you will need a way to unload a pallet." : ""}</p>
              <p>Unopened, factory-sealed items can be returned within 90 days of delivery with no restocking fee. Anything that arrives damaged or incorrect is replaced or refunded — send us a photo within 72 hours of delivery.</p>
              <p><Link href="/policies/shipping">Shipping policy</Link> · <Link href="/policies/returns">Returns & refunds</Link> · <Link href="/policies/warranty">Warranty</Link></p>
            </div>
            <div className="prose-sg">
              {isRef ? (
                <>
                  <p>Refrigerant cylinders are pressure vessels. Store them upright, secured, out of direct sun and below their rated temperature. Never heat a cylinder with a flame, never refill a disposable cylinder, and never mix refrigerants in a system.</p>
                  <p>Match the refrigerant to the equipment data plate, not to a product description. Knowingly venting refrigerant during service or disposal is prohibited — recovery is the buyer&apos;s responsibility.</p>                </>
              ) : (
                <>
                  <p>Gas appliances must be installed by a licensed professional following the manufacturer&apos;s instructions and local codes. Improper installation can void the manufacturer warranty and create a safety hazard.</p>
                  <p>Confirm the fuel type (natural gas or propane), venting and gas-supply sizing for your site before ordering. Installed or gas-connected units cannot be returned.</p>
                  <p>Manufacturer warranty is provided by {p.brand}. We help you open and document any claim.</p>
                </>
              )}
            </div>
          </Tabs>
        </section>

        {/* FAQ */}
        <section className="mt-14 max-w-4xl">
          <h2 className="h-display text-2xl">FAQ</h2>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {[
              ["What does shipping cost and how long does it take?", "Nothing — shipping is free on every order within the United States. We dispatch within 1 business day (Mon–Fri) and parcel transit is 1–4 business days. Pallets travel as freight with a booked delivery appointment."],
              ["Can I return it?", "Yes, if it is unopened and factory-sealed, within 90 days of delivery and with no restocking fee. Contact us first for approval. Opened refrigerant and installed or gas-connected equipment cannot be returned."],
              ...(isRef ? [["Do I need EPA certification?", "For restricted refrigerants, yes — EPA Section 608 (or 609 for motor-vehicle A/C). Placing an order confirms you are permitted to buy it."]] : [["Is the manufacturer warranty included?", `Yes. Every unit is factory-new and carries the full ${p.brand} warranty when installed by a licensed professional.`]]),
            ].map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink">
                  {q}
                  <Icon.Plus className="h-4 w-4 shrink-0 text-ink-meta transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        {rel.length > 0 && (
          <section className="mt-16">
            <h2 className="h-display text-3xl">You might also like</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
              {rel.map((r) => <ProductCard key={r.slug} p={r} />)}
            </div>
            <Link href={`/collections/${col.slug}`} className="mt-6 inline-block text-sm font-semibold text-accent">
              Browse all {col.name.toLowerCase()} →
            </Link>
          </section>
        )}
      </div>

      <ReviewsSection eyebrow="What people say about buying from us" storeNote gas={p.gas} />
    </div>
  );
}
