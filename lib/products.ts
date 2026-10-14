import catalog from "./catalog.json";

export type Product = {
  slug: string;
  sku: string;
  mpn: string;
  gtin: string | null;
  brand: string;
  title: string;
  category: string;
  price: number;
  compareAt?: number;
  priceBasis?: string;
  currency: "USD";
  availability: "in_stock" | "out_of_stock" | "preorder";
  condition: "new";
  image: string;
  gallery?: string[];
  imageSource?: string;
  shortDescription: string;
  description: string;
  specs: Record<string, string>;
  features?: string[];
  // derived
  gas?: string;
  packQty: number;
  unitLb?: number;
  perLb?: number;
  eyebrow: string;
  restricted: boolean;
};

export function gasLabel(raw?: string) {
  if (!raw) return undefined;
  const g = raw.toUpperCase();
  if (g === "R-134A") return "R-134a";
  if (g === "R-1234YF") return "R-1234yf";
  return g;
}

export const gasSlug = (label: string) => label.toLowerCase();

function packQty(title: string) {
  const m =
    title.match(/(\d+)\s*[x×]\s*\d/i) ||
    title.match(/\|\s*(\d+)\s*cylinders/i) ||
    title.match(/(\d+)[-\s]*pack/i) ||
    title.match(/(\d+)\s*cans/i);
  const n = m ? parseInt(m[1], 10) : 1;
  return n > 0 ? n : 1;
}

function unitLb(p: { title: string; specs: Record<string, string> }) {
  const w = p.specs["Net Weight"];
  if (w) return parseFloat(w);
  const oz = p.title.match(/(\d+(?:\.\d+)?)\s*oz/i);
  if (oz) return parseFloat(oz[1]) / 16;
  return undefined;
}

function deriveFeatures(p: Product): string[] {
  const s = p.specs || {};
  const f: string[] = [];
  if (s["Max BTU/h"]) f.push(`${s["Max BTU/h"]} BTU/h`);
  if (s["Max Flow Rate"]) f.push(`Up to ${s["Max Flow Rate"]}`);
  if (s["Heat Exchanger"]) f.push(s["Heat Exchanger"]);
  if (s["Installation"]) f.push(`${s["Installation"]} installation`);
  if (s["Fuel Type"]) f.push(s["Fuel Type"]);
  if (s["Tank Capacity"]) f.push(`${s["Tank Capacity"]} capacity`);
  if (p.gas) f.push(`${p.gas} refrigerant`);
  if (s["Net Weight"]) f.push(`${s["Net Weight"]} net weight`);
  if (s["Valve"]) f.push(`${s["Valve"]} valve`);
  if (p.category === "refrigerant") f.push("Factory sealed");
  else f.push("Full manufacturer warranty");
  return f.slice(0, 6);
}

const KIND: Record<string, string> = {
  "water-heaters": "tankless water heater",
  "heat-pumps": "heat pump water heater",
  boilers: "boiler",
  furnaces: "furnace",
  "space-heaters": "heater",
  "air-conditioners": "air conditioner",
  controls: "replacement part",
  accessories: "accessory",
  cleaners: "system cleaner",
};

function summaryFor(p: Product) {
  const s = p.specs;
  if (p.category === "refrigerant") {
    const size = p.unitLb ? (p.unitLb < 1 ? `${Math.round(p.unitLb * 16)} oz` : `${p.unitLb} lb`) : "";
    const pack = p.packQty > 1 ? `${p.packQty} × ${size}` : size;
    const brand = p.brand === "Sarlkig" ? "" : `Genuine ${p.brand} `;
    return `${brand}${p.gas ?? ""} refrigerant${pack ? `, ${pack}` : ""} — factory sealed${p.packQty > 1 ? ", shipped together on one order line" : ""}. Free shipping, dispatched in 1 business day.`;
  }
  if (/hybrid|demand duo/i.test(p.title)) {
    return `${p.brand} ${p.mpn} hybrid water heating system${s["Max BTU/h"] ? `, ${s["Max BTU/h"]} BTU/h` : ""}${s["Fuel Type"] ? `, ${s["Fuel Type"].toLowerCase()}` : ""}. Factory-new with full ${p.brand} warranty.`;
  }
  const kind = KIND[p.category] ?? "product";
  const adj = [s["Heat Exchanger"]?.toLowerCase(), s["Installation"]?.toLowerCase()].filter(Boolean).join(" ");
  const rating = [s["Max BTU/h"] && `${s["Max BTU/h"]} BTU/h`, s["Max Flow Rate"] && `up to ${s["Max Flow Rate"]}`].filter(Boolean).join(", ");
  const fuel = s["Fuel Type"] ? ` on ${s["Fuel Type"].toLowerCase()}` : "";
  return `${p.brand} ${p.mpn} ${adj ? adj + " " : ""}${kind}${rating ? ` — ${rating}` : ""}${fuel}. Factory-new with full ${p.brand} manufacturer warranty.`;
}

function eyebrowFor(p: Omit<Product, "eyebrow">) {
  if (p.gas) {
    const parts = [p.gas];
    if (p.unitLb) parts.push(p.unitLb < 1 ? `${Math.round(p.unitLb * 16)} oz` : `${p.unitLb} lb`);
    if (p.packQty > 1) parts.push(`${p.packQty} units`);
    return parts.join(" · ");
  }
  const s = p.specs;
  const parts = [p.brand];
  if (s["Max BTU/h"]) parts.push(`${s["Max BTU/h"]} BTU`);
  if (s["Max Flow Rate"]) parts.push(s["Max Flow Rate"]);
  if (s["Fuel Type"]) parts.push(s["Fuel Type"].replace("Natural Gas", "NG").replace("Propane", "LP"));
  return parts.join(" · ");
}

function enrichSpecs(title: string, specs: Record<string, string>) {
  const s = { ...specs };
  if (!s["Max BTU/h"]) {
    const m = title.match(/(\d{2,3})\s*MBH/i) || title.match(/(\d{2,3})\s*K\s*(?:BTU|HTG)/i) || title.match(/(\d{2,3})K\b/);
    if (m) s["Max BTU/h"] = `${(parseInt(m[1], 10) * 1000).toLocaleString("en-US")}`;
  }
  if (!s["Max Flow Rate"]) {
    const g = title.match(/(\d+(?:\.\d+)?)[-\s]*GPM/i) || title.match(/(\d+(?:\.\d+)?)\s*gallons?\s*per\s*min/i);
    if (g) s["Max Flow Rate"] = `${g[1]} GPM`;
  }
  return s;
}

export const products: Product[] = (catalog as Omit<Product, "packQty" | "eyebrow" | "restricted">[]).map((source) => {
  const raw = { ...source, specs: enrichSpecs(source.title, source.specs ?? {}) };
  const gas = gasLabel(raw.specs?.["Refrigerant"]);
  const qty = packQty(raw.title);
  const lb = unitLb(raw);
  const isCan = /oz/i.test(raw.title);
  const restricted = raw.category === "refrigerant" && !isCan;
  const base = {
    ...raw,
    gas,
    packQty: qty,
    unitLb: lb,
    perLb: lb ? raw.price / (lb * qty) : undefined,
    restricted,
  } as Omit<Product, "eyebrow">;
  const p = { ...base, eyebrow: eyebrowFor(base) } as Product;
  p.features = raw.features && raw.features.length ? raw.features : deriveFeatures(p);
  p.shortDescription = summaryFor(p);
  return p;
});

export type Collection = {
  slug: string;
  name: string;
  group: "Refrigerants" | "Water heating" | "Bulk & packs" | "Brands" | "Supplies";
  eyebrow: string;
  description: string;
  match: (p: Product) => boolean;
};

const isPack = (p: Product) => p.category === "refrigerant" && p.packQty > 1 && !/oz/i.test(p.title);

const baseCollections: Collection[] = [
  { slug: "water-heaters", name: "Tankless & hybrid water heaters", group: "Water heating", eyebrow: "Water heating",
    description: "Rinnai and Navien tankless, hybrid and heat pump water heaters — indoor and outdoor, natural gas and propane.",
    match: (p) => p.category === "water-heaters" || p.category === "heat-pumps" },
  { slug: "boilers", name: "Condensing boilers", group: "Water heating", eyebrow: "Water heating",
    description: "Wall-hung condensing boilers and combi boilers for hydronic heating and domestic hot water.",
    match: (p) => p.category === "boilers" },
  { slug: "heating-cooling", name: "Furnaces & heaters", group: "Water heating", eyebrow: "Water heating",
    description: "Direct-vent wall furnaces, fan convectors, hydronic furnaces and cooling equipment.",
    match: (p) => ["space-heaters", "furnaces", "air-conditioners"].includes(p.category) },
  { slug: "heating-parts", name: "Parts & accessories", group: "Water heating", eyebrow: "Water heating",
    description: "Genuine replacement parts, recess boxes, storage tanks and control boards.",
    match: (p) => (p.category === "controls" || p.category === "accessories") && (p.brand === "Rinnai" || p.brand === "Navien") },
  { slug: "refrigerants", name: "Refrigerant cylinders", group: "Refrigerants", eyebrow: "Refrigerants",
    description: "Factory-sealed refrigerant cylinders and cans for HVAC, commercial refrigeration and automotive A/C.",
    match: (p) => p.category === "refrigerant" },
  { slug: "bulk-pallets", name: "Pallets & bulk packs", group: "Bulk & packs", eyebrow: "Bulk & packs",
    description: "5 to 40 cylinders of one refrigerant on a single order line, shipped together as freight.",
    match: isPack },
  { slug: "maintenance-supplies", name: "Cleaners & tools", group: "Supplies", eyebrow: "Supplies",
    description: "System flushes, cleaners and gauges for service work.",
    match: (p) => p.category === "cleaners" || (p.category === "accessories" && p.brand !== "Rinnai" && p.brand !== "Navien") },
  { slug: "rinnai", name: "Rinnai", group: "Brands", eyebrow: "Brand",
    description: "Rinnai Sensei, RE and RX tankless water heaters, condensing boilers, EnergySaver wall furnaces and parts.",
    match: (p) => p.brand === "Rinnai" },
  { slug: "navien", name: "Navien", group: "Brands", eyebrow: "Brand",
    description: "Navien NPE condensing tankless water heaters, NCB combi boilers, NHB/NFB boilers and hydro furnaces.",
    match: (p) => p.brand === "Navien" },
  { slug: "honeywell", name: "Honeywell", group: "Brands", eyebrow: "Brand",
    description: "Genuine Honeywell refrigerants — R-1234yf, R-410A, R-448A, R-449A and R-454B, made in the USA.",
    match: (p) => p.brand === "Honeywell" },
];

const gasOrder = ["R-410A", "R-22", "R-134a", "R-404A", "R-454B", "R-1234yf", "R-32", "R-407A", "R-407C", "R-421A", "R-422B", "R-422D", "R-438A", "R-448A", "R-449A", "R-507", "R-513A"];
const gasesPresent = gasOrder.filter((g) => products.some((p) => p.gas === g));

const gasCollections: Collection[] = gasesPresent.map((g) => ({
  slug: gasSlug(g),
  name: `${g} refrigerant`,
  group: "Refrigerants",
  eyebrow: "Refrigerants",
  description: `Every ${g} line we stock — single cylinders, cans and multi-cylinder packs.`,
  match: (p: Product) => p.gas === g,
}));

const packCollections: Collection[] = [5, 10, 20, 30, 40]
  .filter((n) => products.some((p) => isPack(p) && p.packQty === n))
  .map((n) => ({
    slug: `pack-${n}`,
    name: `${n}-cylinder packs`,
    group: "Bulk & packs" as const,
    eyebrow: "Bulk & packs",
    description: `${n} cylinders of one refrigerant on a single order line, shipped together.`,
    match: (p: Product) => isPack(p) && p.packQty === n,
  }));

export const collections: Collection[] = [...baseCollections, ...gasCollections, ...packCollections];
export const gases = gasesPresent;

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function inCollection(slug: string) {
  const c = getCollection(slug);
  return c ? products.filter(c.match) : [];
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productCollection(p: Product): Collection {
  return (
    baseCollections.find((c) => c.group !== "Brands" && c.slug !== "bulk-pallets" && c.match(p)) ??
    baseCollections[0]
  );
}

export function related(p: Product, n = 4) {
  const c = productCollection(p);
  const pool = products.filter((x) => x.slug !== p.slug && c.match(x));
  const same = pool.filter((x) => x.brand === p.brand || (p.gas && x.gas === p.gas));
  return [...same, ...pool.filter((x) => !same.includes(x))].slice(0, n);
}

export function minPrice(list: Product[]) {
  return list.length ? Math.min(...list.map((p) => p.price)) : 0;
}

export function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function searchProducts(q: string) {
  const terms = q.toLowerCase().replace(/r-?(\d)/g, "r$1").split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return products.filter((p) => {
    const hay = `${p.title} ${p.brand} ${p.mpn} ${p.gas ?? ""} ${p.category}`.toLowerCase().replace(/r-?(\d)/g, "r$1");
    return terms.every((t) => hay.includes(t));
  });
}
