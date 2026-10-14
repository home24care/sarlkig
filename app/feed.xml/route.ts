import { productCollection, products } from "@/lib/products";
import { absUrl, site } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);
}

const googleCategory: Record<string, string> = {
  "water-heaters": "Hardware > Plumbing > Water Heaters",
  "heat-pumps": "Hardware > Plumbing > Water Heaters",
  boilers: "Home & Garden > Household Appliances > Climate Control Appliances > Furnaces & Boilers",
  furnaces: "Home & Garden > Household Appliances > Climate Control Appliances > Furnaces & Boilers",
  "space-heaters": "Home & Garden > Household Appliances > Climate Control Appliances > Space Heaters",
  "air-conditioners": "Home & Garden > Household Appliances > Climate Control Appliances > Air Conditioners",
  controls: "Hardware > Plumbing > Plumbing Fixture Hardware & Parts",
  accessories: "Hardware > Plumbing > Plumbing Fixture Hardware & Parts",
  cleaners: "Hardware > Tool Accessories",
  refrigerant: "Hardware > Hardware Accessories",
};

export function GET() {
  const items = products
    .map((p) => {
      const extra = (p.gallery ?? []).filter((u) => u !== p.image).slice(0, 10).map(absUrl);
      return `
    <item>
      <g:id>${esc(p.sku)}</g:id>
      <g:title>${esc(p.title.slice(0, 150))}</g:title>
      <g:description>${esc(p.description)}</g:description>
      <g:link>${esc(`${site.url}/products/${p.slug}`)}</g:link>
      <g:image_link>${esc(absUrl(p.image))}</g:image_link>${extra.map((u) => `
      <g:additional_image_link>${esc(u)}</g:additional_image_link>`).join("")}
      <g:availability>${p.availability === "in_stock" ? "in_stock" : "out_of_stock"}</g:availability>
      <g:price>${p.price.toFixed(2)} ${p.currency}</g:price>
      <g:brand>${esc(p.brand)}</g:brand>
      <g:mpn>${esc(p.mpn)}</g:mpn>
      ${p.gtin ? `<g:gtin>${esc(p.gtin)}</g:gtin>` : "<g:identifier_exists>no</g:identifier_exists>"}
      <g:condition>new</g:condition>
      <g:google_product_category>${esc(googleCategory[p.category] ?? "Hardware")}</g:google_product_category>
      <g:product_type>${esc(productCollection(p).name)}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Standard</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>${p.packQty > 1 ? `
      <g:multipack>${p.packQty}</g:multipack>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${esc(site.url)}</link>
    <description>${esc(site.description)}</description>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
