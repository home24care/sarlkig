import Link from "next/link";

export default function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-1.5" aria-label="Sarlkig home">
      <span className={`font-display text-[26px] font-semibold leading-none tracking-tight ${inverted ? "text-white" : "text-ink"}`}>
        SARLKIG
      </span>
      <span className="rounded-[3px] bg-accent px-1.5 py-1 font-display text-[13px] font-semibold leading-none tracking-wide text-white">
        SUPPLY
      </span>
    </Link>
  );
}
