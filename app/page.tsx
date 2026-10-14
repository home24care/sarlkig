import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Icon } from "@/components/icons";
import FeatureSplit from "@/components/FeatureSplit";
import { products, gases, gasSlug, getProduct, inCollection } from "@/lib/products";

const TRUST = [
  { I: Icon.Truck, label: "Ships in 1 business day" },
  { I: Icon.Shield, label: "Free shipping" },
  { I: Icon.Lock, label: "Secure payments" },
  { I: Icon.Refresh, label: "90-day returns" },
];

export default function Home() {
  const hero = getProduct("rinnai-ru199in-sensei-residential-199-000-btu-natural-gas") ?? products[0];
  const heaters = ["rinnai", "navien"].flatMap((b) => inCollection(b).filter((p) => p.category === "water-heaters").slice(0, 4));
  const oneEach = gases
    .map((g) => products.find((p) => p.gas === g && p.packQty === 1 && p.category === "refrigerant"))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .sort((a, b) => a.price - b.price)
    .slice(0, 8);
  const featuredGases = ["R-22", "R-410A", "R-404A", "R-134a", "R-32"].filter((g) => gases.includes(g));
  const singleImg = inCollection("r-134a")[0]?.image;
  const packImg = inCollection("bulk-pallets")[0]?.image;
  const boilerImg = inCollection("boilers")[0]?.image;

  return (
    <>
      {/* Hero */}
      <section className="bg-tint">
        <div className="container-site grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow">Sarlkig · Water heating & HVAC refrigerants</p>
            <h1 className="h-display mt-4 text-[40px] leading-[1.08] md:text-[52px]">
              Water Heaters, Boilers &amp; Refrigerants for the Trade
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-7 text-ink-body">
              Rinnai and Navien tankless water heaters and boilers, genuine Honeywell refrigerants and
              factory-sealed cylinders — shipped from a U.S. warehouse with free shipping on every order.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex">
              <Link href="/collections/water-heaters" className="btn-accent px-3 sm:px-6">Shop water heaters</Link>
              <Link href="/collections/refrigerants" className="btn-ghost px-3 sm:px-6">Shop refrigerants</Link>
            </div>
            <ul className="mt-10 grid max-w-xl grid-cols-4 gap-2 sm:gap-6">
              {TRUST.map(({ I, label }) => (
                <li key={label} className="flex flex-col items-center text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-[4px] border border-line bg-white text-accent">
                    <I className="h-5 w-5" />
                  </span>
                  <span className="mt-2 text-[11px] font-medium leading-tight text-ink sm:text-xs">{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href={`/products/${hero.slug}`} className="group relative hidden aspect-[5/4] overflow-hidden rounded-panel border border-line bg-white lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.image} alt={hero.title} fetchPriority="high" className="h-full w-full object-contain p-10 transition-transform duration-500 group-hover:scale-[1.03]" />
            <div className="absolute bottom-4 left-4 rounded-[3px] bg-white/95 px-3 py-2 shadow-float">
              <div className="micro">{hero.brand} · {hero.mpn}</div>
              <div className="text-sm font-semibold text-ink">Sensei 199,000 BTU condensing</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Shop by type */}
      <section className="container-site pt-14">
        <div className="panel p-6 md:p-10">
          <h2 className="h-display text-3xl">Shop by product type</h2>
          <p className="mt-1 text-ink-muted">Equipment for the install, or refrigerant for the service call.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <TypeCard href="/collections/water-heaters" img={hero.image} title="Water heaters" text="Rinnai & Navien tankless, hybrid and heat pump units — indoor and outdoor, NG and LP." cta="Shop water heaters" tag="Water heating" />
            <TypeCard href="/collections/boilers" img={boilerImg} title="Boilers & combis" text="Wall-hung condensing boilers and combi units for hydronic heat and hot water." cta="Shop boilers" />
            <TypeCard href="/collections/refrigerants" img={singleImg} title="Single cylinders" text="Every refrigerant we stock, one cylinder or can at a time." cta="Shop cylinders" tag="Refrigerants" />
            <TypeCard href="/collections/bulk-pallets" img={packImg} title="Packs & pallets" text="5 to 40 cylinders of one refrigerant on a single order line, shipped together as freight." cta="Shop packs" />
          </div>
        </div>
      </section>

      {/* Brands + refrigerants */}
      <section className="container-site pt-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="h-display text-3xl">Shop by brand</h2>
            <p className="mt-1 text-ink-muted">Factory-new units with full manufacturer warranty.</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {["rinnai", "navien", "honeywell"].map((b) => (
                <Link key={b} href={`/collections/${b}`} className="card flex flex-col items-center justify-center py-7 transition-colors hover:border-accent">
                  <span className="font-display text-2xl font-semibold capitalize text-ink">{b}</span>
                  <span className="tnum mt-1 text-xs text-ink-meta">{inCollection(b).length} products</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="h-display text-3xl">Shop by refrigerant</h2>
            <p className="mt-1 text-ink-muted">Find the correct refrigerant for your system.</p>
            <div className="mt-6 grid grid-cols-5 gap-3">
              {featuredGases.map((g) => (
                <Link key={g} href={`/collections/${gasSlug(g)}`} className="card flex aspect-square flex-col items-center justify-center transition-colors hover:border-accent">
                  <span className="font-display text-xl font-semibold text-ink">{g}</span>
                  <span className="tnum mt-1 text-[11px] text-ink-meta">{inCollection(gasSlug(g)).length} SKUs</span>
                </Link>
              ))}
            </div>
            <Link href="/collections/refrigerants" className="mt-4 inline-block text-sm font-semibold text-accent">
              Not sure what you need? View all {gases.length} refrigerants →
            </Link>
          </div>
        </div>
      </section>

      {/* Water heaters in stock */}
      <Shelf title="Water heaters in stock" sub="Rinnai and Navien units, ready to ship." href="/collections/water-heaters" cta="View all water heaters" items={heaters} />

      <FeatureSplit
        reverse
        image={{ sm: "/images/sections/water-heater-installation-sm.webp", lg: "/images/sections/water-heater-installation-lg.webp", alt: "Technician installing a wall-hung condensing tankless water heater", position: "center 30%" }}
        eyebrow="Built for the install"
        title="Water heaters installers trust."
        text="Factory-new Rinnai and Navien tankless units, boilers and combis — the models plumbers and HVAC contractors fit every day, shipped free from U.S. stock with the full manufacturer warranty."
        points={["Factory-new, sealed carton", "Full manufacturer warranty", "NG & LP · indoor & outdoor", "Help matching the right model"]}
        cta={{ href: "/collections/water-heaters", label: "Shop water heaters" }}
        link={{ href: "/collections/rinnai", label: "Browse Rinnai" }}
      />

      {/* Refrigerant one per gas */}
      <Shelf title="Refrigerants in stock now" sub="One cylinder per refrigerant, ready to ship." href="/collections/refrigerants" cta="View all refrigerants" items={oneEach} />

      <FeatureSplit
        image={{ sm: "/images/sections/refrigerants-warehouse-sm.webp", lg: "/images/sections/refrigerants-warehouse-lg.webp", alt: "R-410A, R-22, R-134a and R-404A refrigerant cylinders on a pallet in a warehouse", position: "center 70%" }}
        eyebrow="Built for HVAC professionals"
        title="Refrigerants you can count on."
        text="Factory-sealed cylinders stocked in a U.S. warehouse, packed for safe transit and covered by our 90-day return window."
        points={["U.S. warehouse inventory", "Secure cylinder packaging", "Dispatched in 1 business day", "Support by phone and email"]}
        cta={{ href: "/collections/refrigerants", label: "Shop refrigerants" }}
        link={{ href: "/about", label: "Why Sarlkig" }}
      />

      <FeatureSplit
        reverse
        image={{ sm: "/images/sections/bulk-cartons-sm.webp", lg: "/images/sections/bulk-cartons-lg.webp", alt: "Cartons of R-410A, R-22 and R-404A refrigerant cylinders stacked in rows", position: "57% center" }}
        eyebrow="Bulk & pallets"
        title="Stock the shop, not just the van."
        text="Packs of 5, 10, 20 and 30 cylinders and full 40-cylinder pallets ship together on one order line — delivered as freight by appointment."
        points={["5 to 40 cylinders per line", "Freight delivery by appointment", "Ships together on one order", "Quotes within one business day"]}
        cta={{ href: "/collections/bulk-pallets", label: "Shop bulk quantities" }}
        link={{ href: "/contact", label: "Request a quote" }}
      />
    </>
  );
}

function TypeCard({ href, img, title, text, cta, tag }: { href: string; img?: string; title: string; text: string; cta: string; tag?: string }) {
  return (
    <Link href={href} className="group grid grid-cols-[120px_1fr] items-center gap-5 rounded-[6px] bg-white p-5 transition-shadow hover:shadow-float sm:grid-cols-[150px_1fr]">
      <div className="aspect-square overflow-hidden rounded-[4px] border border-line bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {img && <img src={img} alt="" loading="lazy" className="h-full w-full object-contain p-3" />}
      </div>
      <div>
        {tag && <div className="micro mb-1">{tag}</div>}
        <div className="font-display text-2xl font-medium text-ink">{title}</div>
        <p className="mt-1 text-sm leading-6 text-ink-muted">{text}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
          {cta} <Icon.Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function Shelf({ title, sub, href, cta, items }: { title: string; sub: string; href: string; cta: string; items: ReturnType<typeof inCollection> }) {
  return (
    <section className="container-site pt-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="h-display text-3xl">{title}</h2>
          <p className="mt-1 text-ink-muted">{sub}</p>
        </div>
        <Link href={href} className="hidden shrink-0 text-sm font-semibold text-accent sm:block">{cta} →</Link>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        {items.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
      <Link href={href} className="mt-6 block text-sm font-semibold text-accent sm:hidden">{cta} →</Link>
    </section>
  );
}
