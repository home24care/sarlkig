import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/products";
import { policies, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/collections", "/about", "/contact", "/faq", "/order-status", "/policies"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    priority: p === "" ? 1 : 0.6,
  }));
  return [
    ...pages,
    ...policies.map((p) => ({ url: `${site.url}/policies/${p.slug}`, lastModified: now, priority: 0.4 })),
    ...collections.map((c) => ({ url: `${site.url}/collections/${c.slug}`, lastModified: now, priority: 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.slug}`, lastModified: now, priority: 0.7 })),
  ];
}
