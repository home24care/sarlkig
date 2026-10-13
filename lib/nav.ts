import type { NavData, NavLink } from "@/components/Header";
import { collections, gases, gasSlug, inCollection } from "./products";

function link(slug: string, label?: string): NavLink {
  const c = collections.find((x) => x.slug === slug);
  return { href: `/collections/${slug}`, label: label ?? c?.name ?? slug, count: inCollection(slug).length };
}

export function buildNav(): NavData {
  return {
    refrigerants: gases.map((g) => link(gasSlug(g), g)),
    totalCylinders: inCollection("refrigerants").length,
    packSkus: inCollection("bulk-pallets").length,
    waterHeating: [
      link("water-heaters", "Water heaters"),
      link("boilers", "Boilers"),
      link("heating-cooling", "Furnaces & heaters"),
      link("heating-parts", "Parts & accessories"),
      link("rinnai", "Rinnai"),
      link("navien", "Navien"),
    ],
    packs: [
      ...collections.filter((c) => c.slug.startsWith("pack-")).map((c) => link(c.slug, c.name.replace("-cylinder packs", " cylinders"))),
      link("bulk-pallets", "All pallets & packs"),
    ],
    supplies: [link("maintenance-supplies", "Cleaners & tools"), link("honeywell", "Honeywell refrigerants")],
  };
}
