import Link from "next/link";
import { collections, inCollection, minPrice, money, products } from "@/lib/products";

export const metadata = { title: "All collections", description: "Browse every water heater, boiler, refrigerant and supply we stock." };

export default function CollectionsIndex() {
  const groups = ["Water heating", "Refrigerants", "Bulk & packs", "Brands", "Supplies"] as const;
  return (
    <div className="container-site py-10">
      <div className="micro">Catalogue</div>
      <h1 className="h-display mt-2 text-4xl">All products &amp; collections</h1>
      <p className="mt-2 text-ink-muted">{products.length} products across {collections.length} collections.</p>
      {groups.map((g) => {
        const cs = collections.filter((c) => c.group === g);
        if (!cs.length) return null;
        return (
          <section key={g} className="mt-10">
            <h2 className="h-display text-2xl">{g}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {cs.map((c) => {
                const list = inCollection(c.slug);
                return (
                  <Link key={c.slug} href={`/collections/${c.slug}`} className="card group flex items-center gap-3 p-3 transition-colors hover:border-accent">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[3px] bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {list[0] && <img src={list[0].image} alt="" loading="lazy" className="h-full w-full object-contain" />}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-ink group-hover:text-accent">{c.name}</div>
                      <div className="tnum text-xs text-ink-meta">{list.length} items · from {money(minPrice(list))}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
