import Link from "next/link";
import Stars from "./Stars";
import ReviewList from "./ReviewList";
import { mixedReviews, mixedStats, sourceCounts } from "@/lib/reviews";
import { site } from "@/lib/site";

export default function ReviewsSection({ eyebrow = "Customer reviews", storeNote = false, gas }: { eyebrow?: string; storeNote?: boolean; gas?: string }) {
  const items = mixedReviews(gas);
  if (!items.length) return null;
  const { avg, count, dist, label } = mixedStats;

  return (
    <section id="reviews" className="container-site scroll-mt-6 pt-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.35fr)] lg:gap-14">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="micro">{eyebrow}</div>
          <div className="h-display mt-3 text-[40px] leading-none">{label}</div>
          {storeNote && (
            <p className="mt-3 text-[13px] leading-5 text-ink-muted">
              These cover the buying experience across our catalogue, not this product alone.
            </p>
          )}
          <div className="mt-4"><Stars rating={avg} size="lg" /></div>
          <p className="mt-3 text-[15px] text-ink-body">
            <strong className="text-ink">{avg}</strong> out of 5, based on <strong className="text-ink">{count}</strong> reviews
          </p>
          {sourceCounts.partner > 0 && (
            <p className="mt-2 text-[13px] leading-5 text-ink-muted">
              {sourceCounts.own} from {site.name} customers and {sourceCounts.partner} from customers of Freonwell, our
              partner store, reviewing the cylinders named on each card.
            </p>
          )}
          <ul className="mt-6 space-y-3.5">
            {dist.map((d) => (
              <li key={d.stars} className="grid grid-cols-[48px_1fr_40px] items-center gap-4 text-[15px] text-ink-body">
                <span>{d.stars}-star</span>
                <span className="h-2 overflow-hidden bg-[#dcdce6]">
                  <span className="block h-full bg-rating" style={{ width: `${d.pct}%` }} />
                </span>
                <span className="tnum text-right text-ink-muted">{d.pct}%</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-6 text-[15px] leading-7 text-ink-muted">
            Reviews are submitted by customers after a completed order and published as written. We do not edit or
            remove a review for being critical.
          </p>
        </div>

        <ReviewList items={items} />
      </div>
      <p className="mt-8 text-sm text-ink-muted">
        Something not right with your order? Email <a className="link" href={`mailto:${site.email}`}>{site.email}</a> and
        we&apos;ll put it right — see our <Link className="link" href="/policies/returns">returns policy</Link>.
      </p>
    </section>
  );
}
