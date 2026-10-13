import partner from "./partnerReviews.json";

// Store reviews customers sent by email. Published as written; keep the original emails on file.
export type ReviewPhoto = { full: string; thumb: string };
export type Review = {
  source: "sarlkig" | "freonwell";
  rating: number;
  title: string;
  body: string;
  name: string;
  location?: string;
  date?: string;
  product?: string;
  gas?: string;
  verified?: boolean;
  photos?: ReviewPhoto[];
};

export const reviews: Review[] = [
  {
    source: "sarlkig",
    rating: 5,
    title: "Great experience overall",
    name: "Michael R.",
    location: "USA",
    body: "Ordered a Rinnai water heater for a replacement project and everything went smoothly. The product matched the description, and the ordering process was straightforward. Happy with the purchase and would consider buying from SARLKIG again.",
  },
  {
    source: "sarlkig",
    rating: 5,
    title: "Good service and product selection",
    name: "James T.",
    location: "USA",
    body: "I was looking for HVAC supplies and refrigerant products and found what I needed at SARLKIG. The product information was helpful, and the checkout process was easy. Overall, a very positive experience.",
  },
  {
    source: "sarlkig",
    rating: 4,
    title: "Good product, happy with my purchase",
    name: "David M.",
    location: "USA",
    body: "Purchased a Rinnai unit for an installation project. The product looks good, and everything was as expected. I would have appreciated a little more information about delivery timing, but overall I'm satisfied.",
  },
  {
    source: "sarlkig",
    rating: 5,
    title: "Easy ordering process",
    name: "Robert K.",
    location: "USA",
    body: "Finding the right equipment was simple, and the website was easy to navigate. I appreciate having water heating and refrigerant supplies available in one place. A good experience from start to finish.",
  },
  {
    source: "sarlkig",
    rating: 4,
    title: "Satisfied with the service",
    name: "Christopher B.",
    location: "USA",
    body: "Bought refrigerant supplies for an upcoming HVAC job. The ordering process was straightforward, and I found the products I was looking for. A little more detail on product availability would make the experience even better.",
  },
  {
    source: "sarlkig",
    rating: 5,
    title: "Would shop here again",
    name: "Daniel W.",
    location: "USA",
    body: "SARLKIG has a useful selection of heating and cooling products. I found the Rinnai equipment information helpful when comparing options, and the website made it easy to browse. Overall, a positive shopping experience.",
  },
];

// Recent reviews from customers of our partner store Freonwell (freonwell.com), shown with attribution on each card.
export const partnerReviews = partner as Review[];

function stats(list: Review[]) {
  const n = list.length;
  const avg = n ? list.reduce((a, r) => a + r.rating, 0) / n : 0;
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    pct: n ? Math.round((list.filter((r) => r.rating === s).length / n) * 100) : 0,
  }));
  const label = avg >= 4.3 ? "Excellent" : avg >= 3.8 ? "Great" : avg >= 2.8 ? "Average" : "Poor";
  return { count: n, avg: Math.round(avg * 10) / 10, dist, label };
}

/** Our own customers only — used for the headline rating (hero, under product titles). */
export const reviewStats = stats(reviews);

// "Most helpful first": rating, then how much detail and whether there are photos. Every review is still shown.
const helpfulness = (r: Review) => r.rating * 10 + Math.min(r.body.length / 40, 8) + (r.photos?.length ? 6 : 0);
const byHelpful = (a: Review, b: Review) => helpfulness(b) - helpfulness(a);

/** Our reviews interleaved with partner reviews; matching refrigerant first when `gas` is given. */
export function mixedReviews(gas?: string): Review[] {
  const own = [...reviews];
  const ranked = [...partnerReviews].sort(byHelpful);
  const theirs = gas ? [...ranked.filter((r) => r.gas === gas), ...ranked.filter((r) => r.gas !== gas)] : ranked;
  const out: Review[] = [];
  if (gas && theirs[0]?.gas === gas) {
    while (theirs.length && theirs[0].gas === gas && out.length < 4) out.push(theirs.shift()!);
  }
  while (own.length || theirs.length) {
    if (own.length) out.push(own.shift()!);
    if (theirs.length) out.push(theirs.shift()!);
  }
  return out;
}

export const mixedStats = stats([...reviews, ...partnerReviews]);
export const sourceCounts = { own: reviews.length, partner: partnerReviews.length };
