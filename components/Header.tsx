"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { Icon } from "./icons";
import Logo from "./Logo";

export type NavLink = { href: string; label: string; count?: number };
export type NavData = {
  refrigerants: NavLink[];
  totalCylinders: number;
  packSkus: number;
  waterHeating: NavLink[];
  packs: NavLink[];
  supplies: NavLink[];
};

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function Dropdown({ label, href, open, onOpen, onClose, children, wide }: {
  label: string; href: string; open: boolean; onOpen: () => void; onClose: () => void; children: React.ReactNode; wide?: boolean;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Link href={href} className={`flex items-center gap-1 py-3 hover:text-accent ${open ? "text-accent" : ""}`}>
        {label}
        <Icon.Chevron className="h-3 w-3 text-ink-meta" />
      </Link>
      {open && (
        <div className={`absolute left-0 top-full z-50 ${wide ? "w-[640px]" : "w-72"}`}>
          <div className="border border-line bg-white p-5 shadow-float">{children}</div>
        </div>
      )}
    </div>
  );
}

function MenuList({ links }: { links: NavLink[] }) {
  return (
    <ul className="space-y-0.5">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className="flex items-center justify-between rounded-[3px] px-2 py-1.5 text-sm text-ink-body hover:bg-surface hover:text-accent">
            <span>{l.label}</span>
            {typeof l.count === "number" && <span className="tnum text-xs text-ink-meta">{l.count}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Header({ nav }: { nav: NavData }) {
  const { count, subtotal } = useCart();
  const [menu, setMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const dd = (key: string) => ({ open: menu === key, onOpen: () => setMenu(key), onClose: () => setMenu(null) });

  return (
    <>
      <header className="relative z-40 bg-white">
        {/* Utility bar */}
        <div className="bg-dark text-dark-text">
          <div className="container-site flex h-9 items-center justify-between text-[12.5px]">
            <span className="flex min-w-0 items-center gap-2">
              <Icon.Truck className="h-4 w-4 shrink-0 text-ice" />
              <span className="hidden sm:inline">Free shipping across the United States · Dispatch in 1 business day (Mon–Fri)</span>
              <span className="truncate sm:hidden">Free U.S. shipping · Ships in 1 business day</span>
            </span>
            <nav className="hidden items-center divide-x divide-dark-rule md:flex">
              {[["About", "/about"], ["FAQ", "/faq"], ["Order status", "/order-status"], ["Contact", "/contact"]].map(([l, h]) => (
                <Link key={h} href={h} className="px-3 last:pr-0 hover:text-white">{l}</Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main row */}
        <div className="border-b border-line">
          <div className="container-site flex h-[78px] items-center gap-6">
            <button className="-ml-1 p-1 text-ink md:hidden" aria-label="Menu" onClick={() => setDrawer(true)}>
              <Icon.Menu className="h-6 w-6" />
            </button>
            <Logo />
            <form action="/search" className="mx-auto hidden w-full max-w-[540px] md:flex">
              <input
                ref={searchRef}
                name="q"
                placeholder="Search by model or refrigerant, e.g. RU199iN, R-410A…"
                className="h-[46px] w-full border border-line-strong px-4 text-sm outline-none placeholder:text-ink-meta focus:border-accent"
              />
              <button className="flex h-[46px] items-center gap-2 bg-accent px-5 text-sm font-semibold text-white hover:bg-accent-strong">
                <Icon.Search className="h-4 w-4" /> Search
              </button>
            </form>
            <div className="ml-auto flex items-center gap-5 md:ml-0">
              <Link href="/order-status" className="hidden text-sm font-medium text-ink hover:text-accent lg:block">Order status</Link>
              <Link href="/cart" className="flex items-center gap-2 text-sm font-medium text-ink hover:text-accent">
                <span className="relative">
                  <Icon.Cart className="h-6 w-6" />
                  {count > 0 && (
                    <span className="absolute -right-2 -top-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">{count}</span>
                  )}
                </span>
                <span className="tnum hidden sm:inline">{money(subtotal)}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <form action="/search" className="flex border-b border-line px-4 py-2.5 md:hidden">
          <input name="q" placeholder="Search by model or refrigerant, e.g. R-410A…" className="h-11 w-full border border-line-strong px-3 text-[15px] outline-none placeholder:text-ink-meta focus:border-accent" />
          <button className="grid w-12 place-items-center bg-accent text-white" aria-label="Search"><Icon.Search className="h-5 w-5" /></button>
        </form>

        {/* Category nav */}
        <div className="hidden border-b border-line md:block">
          <nav className="container-site flex items-center gap-7 text-[13.5px] font-medium text-ink">
            <Dropdown label="Refrigerants" href="/collections/refrigerants" wide {...dd("ref")}>
              <div className="grid grid-cols-[1fr_220px] gap-6">
                <div>
                  <div className="micro mb-2">By refrigerant</div>
                  <div className="grid grid-cols-2 gap-x-4">
                    <MenuList links={nav.refrigerants.slice(0, Math.ceil(nav.refrigerants.length / 2))} />
                    <MenuList links={nav.refrigerants.slice(Math.ceil(nav.refrigerants.length / 2))} />
                  </div>
                </div>
                <div className="rounded-[4px] bg-tint p-4">
                  <div className="font-display text-lg font-medium text-ink">Buying a pallet?</div>
                  <p className="mt-1 text-xs leading-5 text-ink-muted">Full pallets and multi-cylinder packs ship as one line on one order.</p>
                  <Link href="/collections/bulk-pallets" className="mt-3 block text-sm font-semibold text-accent">{nav.packSkus} pallet & pack SKUs →</Link>
                  <Link href="/collections/refrigerants" className="mt-1 block text-sm font-semibold text-accent">All cylinders {nav.totalCylinders} →</Link>
                </div>
              </div>
            </Dropdown>
            <Dropdown label="Water heating" href="/collections/water-heaters" {...dd("wh")}>
              <MenuList links={nav.waterHeating} />
            </Dropdown>
            <Dropdown label="Bulk & packs" href="/collections/bulk-pallets" {...dd("bulk")}>
              <MenuList links={nav.packs} />
            </Dropdown>
            <Dropdown label="Supplies" href="/collections/maintenance-supplies" {...dd("sup")}>
              <MenuList links={nav.supplies} />
            </Dropdown>
            <Link href="/policies/compliance" className="py-3 hover:text-accent">Compliance</Link>
            <Link href="/contact" className="py-3 hover:text-accent">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-dark/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto bg-white">
            <div className="flex items-center justify-between border-b border-line px-4 py-4">
              <Logo />
              <button onClick={() => setDrawer(false)} aria-label="Close"><Icon.Close className="h-6 w-6" /></button>
            </div>
            <form action="/search" className="flex border-b border-line p-4" onSubmit={() => setDrawer(false)}>
              <input name="q" placeholder="Search products" className="h-11 w-full border border-line-strong px-3 text-sm outline-none" />
              <button className="bg-accent px-4 text-white" aria-label="Search"><Icon.Search className="h-4 w-4" /></button>
            </form>
            <div className="space-y-6 p-4" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setDrawer(false); }}>
              <div><div className="micro mb-2">Refrigerants</div><MenuList links={[{ href: "/collections/refrigerants", label: "All refrigerants", count: nav.totalCylinders }, ...nav.refrigerants]} /></div>
              <div><div className="micro mb-2">Water heating</div><MenuList links={nav.waterHeating} /></div>
              <div><div className="micro mb-2">Bulk & packs</div><MenuList links={nav.packs} /></div>
              <div><div className="micro mb-2">Help</div><MenuList links={[
                { href: "/faq", label: "FAQ" }, { href: "/order-status", label: "Order status" }, { href: "/policies", label: "Policies" },
                { href: "/policies/compliance", label: "Compliance" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" },
              ]} /></div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        {[
          { label: "Home", href: "/", I: Icon.Home },
          { label: "Search", href: "/search", I: Icon.Search },
        ].map(({ label, href, I }) => (
          <Link key={label} href={href} className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-ink-muted">
            <I className="h-5 w-5" />{label}
          </Link>
        ))}
        <button onClick={() => setDrawer(true)} className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-ink-muted">
          <Icon.Menu className="h-5 w-5" />Menu
        </button>
        <Link href="/cart" className="relative flex flex-col items-center gap-1 py-2.5 text-[11px] text-ink-muted">
          <Icon.Cart className="h-5 w-5" />{count > 0 ? `${count} · Cart` : "Cart"}
        </Link>
      </nav>
    </>
  );
}
