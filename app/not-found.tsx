import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site py-24 text-center">
      <div className="micro">Error 404</div>
      <h1 className="h-display mt-2 text-4xl">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-ink-muted">The product may have moved. Search by model number or browse the catalogue.</p>
      <form action="/search" className="mx-auto mt-6 flex max-w-md">
        <input name="q" placeholder="e.g. RU199iN or R-410A" className="h-[46px] w-full border border-line-strong px-4 text-sm outline-none focus:border-accent" />
        <button className="btn-accent rounded-none">Search</button>
      </form>
      <Link href="/collections" className="mt-6 inline-block text-sm font-semibold text-accent">Browse all products →</Link>
    </div>
  );
}
