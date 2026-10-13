import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { gases, gasSlug, searchProducts } from "@/lib/products";

export const metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? searchProducts(query) : [];
  return (
    <div className="container-site py-10">
      <h1 className="h-display text-4xl">Search</h1>
      <form action="/search" className="mt-5 flex max-w-2xl">
        <input name="q" defaultValue={query} autoFocus placeholder="Model number, brand or refrigerant — e.g. RU199iN, Navien, R-410A" className="h-[46px] w-full border border-line-strong px-4 text-sm outline-none focus:border-accent" />
        <button className="btn-accent rounded-none">Search</button>
      </form>
      {query && (
        <p className="tnum mt-4 text-sm text-ink-muted">
          {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
        </p>
      )}
      {query && results.length === 0 && (
        <div className="mt-8 rounded-[4px] border border-line bg-surface p-6 text-sm text-ink-body">
          Nothing matched. Try a shorter model number (e.g. “RU199”) or browse by refrigerant:
          <div className="mt-3 flex flex-wrap gap-2">
            {gases.map((g) => <Link key={g} href={`/collections/${gasSlug(g)}`} className="rounded-[3px] border border-line bg-white px-3 py-1.5 hover:border-accent">{g}</Link>)}
          </div>
        </div>
      )}
      {!query && (
        <div className="mt-8 flex flex-wrap gap-2 text-sm">
          {["Rinnai", "Navien", "RU199", "Combi boiler", ...gases.slice(0, 6)].map((s) => (
            <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className="rounded-[3px] border border-line px-3 py-1.5 hover:border-accent">{s}</Link>
          ))}
        </div>
      )}
      {results.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {results.slice(0, 96).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}
