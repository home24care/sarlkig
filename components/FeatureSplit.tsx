import Link from "next/link";
import { Icon } from "./icons";

type Props = {
  image: { sm: string; lg: string; alt: string; position?: string };
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  cta: { href: string; label: string };
  link?: { href: string; label: string };
  reverse?: boolean;
};

export default function FeatureSplit({ image, eyebrow, title, text, points, cta, link, reverse = false }: Props) {
  return (
    <section className="container-site pt-16">
      <div className="grid overflow-hidden rounded-panel border border-line bg-white lg:grid-cols-2">
        <div className={`relative min-h-[260px] sm:min-h-[340px] ${reverse ? "lg:order-last" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.lg}
            srcSet={`${image.sm} 800w, ${image.lg} 1600w`}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: image.position ?? "center" }}
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-display mt-3 text-[30px] leading-tight md:text-[36px]">{title}</h2>
          <p className="mt-4 max-w-xl text-[17px] leading-7 text-ink-body">{text}</p>
          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {points.map((pt) => (
              <li key={pt} className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[3px] bg-tint text-accent">
                  <Icon.Check className="h-[18px] w-[18px]" />
                </span>
                <span className="font-display text-[17px] font-medium text-ink">{pt}</span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link href={cta.href} className="btn-accent px-8">{cta.label}</Link>
            {link && (
              <Link href={link.href} className="inline-flex items-center gap-1.5 font-display text-[17px] font-semibold text-accent hover:underline">
                {link.label} <Icon.Arrow className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
