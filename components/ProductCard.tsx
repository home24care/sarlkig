import Link from "next/link";
import { money, type Product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const href = `/products/${p.slug}`;
  return (
    <div className="group flex h-full flex-col">
      <Link href={href} className="card block aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.image}
          alt={p.title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-3">
        <div className="truncate text-[12px] font-medium text-ink-meta">{p.eyebrow}</div>
        <Link href={href} className="mt-1.5 line-clamp-2 min-h-[2.6rem] text-[14px] font-medium leading-snug text-ink hover:text-accent">
          {p.title}
        </Link>
        <div className="mt-2">
          <span className="sr-only">Regular price</span>
          <span className="tnum text-[17px] font-semibold text-ink">{money(p.price)}</span>
          {p.perLb && p.category === "refrigerant" && (
            <span className="tnum ml-2 text-xs text-ink-meta">{money(p.perLb)} / lb</span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
          <span className={`h-1.5 w-1.5 rounded-full ${p.availability === "in_stock" ? "bg-rating" : "bg-line-strong"}`} />
          {p.availability === "in_stock" ? "In stock" : "Out of stock"}
        </div>
        <div className="mt-auto pt-3">
          <AddToCartButton item={{ sku: p.sku, slug: p.slug, title: p.title, price: p.price, image: p.image }} />
        </div>
      </div>
    </div>
  );
}
