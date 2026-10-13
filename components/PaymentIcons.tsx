import { siAmericanexpress, siApplepay, siDiscover, siGooglepay, siVisa } from "simple-icons";

type Mark = { name: string; svg: React.ReactNode };

// viewBoxes are the tight bounds of each Simple Icons path, so wide wordmarks fill the badge.
const brand = (path: string, fill: string, viewBox: string, size: string) => (
  <svg viewBox={viewBox} className={size} aria-hidden>
    <path d={path} fill={fill} />
  </svg>
);

const MARKS: Mark[] = [
  { name: "Visa", svg: brand(siVisa.path, "#1A1F71", "0 8.12 24 7.76", "h-[13px] w-[40px]") },
  {
    name: "Mastercard",
    svg: (
      <svg viewBox="8 5 22 14" className="h-[24px] w-[38px]" aria-hidden>
        <circle cx="15" cy="12" r="7" fill="#EB001B" />
        <circle cx="23" cy="12" r="7" fill="#F79E1B" />
        <path d="M19 6.255a7 7 0 0 1 0 11.49 7 7 0 0 1 0-11.49z" fill="#FF5F00" />
      </svg>
    ),
  },
  { name: "American Express", svg: brand(siAmericanexpress.path, "#2E77BC", "0 0 24 24", "h-[30px] w-[30px]") },
  { name: "Discover", svg: brand(siDiscover.path, "#231F20", "0 9.98 24 4.04", "h-[8px] w-[46px]") },
  { name: "Apple Pay", svg: brand(siApplepay.path, "#000000", "0 4.32 24 15.36", "h-[24px] w-[38px]") },
  { name: "Google Pay", svg: brand(siGooglepay.path, "#3C4043", "0 7.23 24 9.54", "h-[16px] w-[40px]") },
];

export default function PaymentIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Accepted payment methods">
      {MARKS.map((m) => (
        <li key={m.name} title={m.name} className="grid h-[36px] w-[56px] place-items-center overflow-hidden rounded-[4px] border border-line bg-white">
          {m.svg}
          <span className="sr-only">{m.name}</span>
        </li>
      ))}
    </ul>
  );
}
