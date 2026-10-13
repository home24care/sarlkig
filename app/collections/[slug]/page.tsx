import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import SortableGrid from "@/components/SortableGrid";
import { collections, getCollection, inCollection, minPrice, money } from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return { title: c.name, description: c.description, alternates: { canonical: `/collections/${c.slug}` } };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();
  const list = inCollection(slug);
  const inStock = list.filter((p) => p.availability === "in_stock").length;
  const feature = list.find((p) => p.imageSource === "mouchllc") ?? list[0];
  const [first, ...rest] = c.name.split(" ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.name,
    description: c.description,
    url: `${site.url}/collections/${c.slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: list.length,
      itemListElement: list.slice(0, 30).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/products/${p.slug}` })),
    },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-line bg-surface">
        <div className="container-site py-6">
          <nav className="flex gap-1.5 text-xs text-ink-meta">
            <Link href="/" className="hover:text-accent">Home</Link><span>/</span><span className="text-ink-muted">{c.name}</span>
          </nav>
          <div className="mt-6 grid items-center gap-8 pb-4 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="micro">{c.eyebrow}</div>
              <h1 className="h-display mt-2 text-[34px] leading-tight md:text-[42px]">
                <span className="underline decoration-accent decoration-2 underline-offset-[6px]">{first}</span> {rest.join(" ")}
              </h1>
              <dl className="mt-6 grid grid-cols-2 border-y border-line">
                <div className="border-r border-line py-3 pr-4">
                  <dt className="micro">In stock</dt>
                  <dd className="tnum mt-1 text-sm font-medium text-ink">{inStock} of {list.length} SKUs</dd>
                </div>
                <div className="py-3 pl-4">
                  <dt className="micro">From</dt>
                  <dd className="tnum mt-1 text-sm font-medium text-ink">{money(minPrice(list))}</dd>
                </div>
              </dl>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-ink-body">{c.description}</p>
            </div>
            {feature && (
              <div className="hidden aspect-[4/3] overflow-hidden rounded-[4px] border border-line bg-white md:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={feature.image} alt={c.name} className="h-full w-full object-contain p-8" />
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container-site pt-6">
        <SortableGrid meta={list.map((p) => ({ price: p.price, title: p.title, brand: p.brand, inStock: p.availability === "in_stock" }))}>
          {list.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 4} />)}
        </SortableGrid>
      </div>
    </div>
  );
}
