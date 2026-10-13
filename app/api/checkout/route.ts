import Stripe from "stripe";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const bySku = new Map(products.map((p) => [p.sku, p]));
const MAX_QTY = 100;

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return Response.json({ error: "checkout_not_configured" }, { status: 503 });
  }

  let body: { items?: { sku?: unknown; qty?: unknown }[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const lines = (body.items ?? [])
    .map((i) => ({ p: typeof i.sku === "string" ? bySku.get(i.sku) : undefined, qty: Math.floor(Number(i.qty)) }))
    .filter((l) => l.p && l.p.availability === "in_stock" && Number.isFinite(l.qty) && l.qty >= 1 && l.qty <= MAX_QTY);

  if (!lines.length) {
    return Response.json({ error: "empty_cart" }, { status: 400 });
  }

  const restricted = lines.some((l) => l.p!.restricted);
  const origin = req.headers.get("origin") ?? site.url;
  const stripe = new Stripe(key);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lines.map(({ p, qty }) => ({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(p!.price * 100),
        product_data: {
          name: p!.title.slice(0, 250),
          images: [p!.image],
          metadata: { sku: p!.sku, mpn: p!.mpn, brand: p!.brand },
        },
      },
    })),
    shipping_address_collection: { allowed_countries: ["US"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          display_name: "Free shipping — dispatched within 1 business day",
          fixed_amount: { amount: 0, currency: "usd" },
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
    ],
    phone_number_collection: { enabled: true },
    automatic_tax: { enabled: process.env.STRIPE_AUTOMATIC_TAX === "true" },
    custom_text: restricted
      ? {
          submit: {
            message:
              "This order contains EPA Section 608-restricted refrigerant. By paying you confirm you are a certified technician, an authorised representative of one, or a wholesaler buying for resale.",
          },
        }
      : undefined,
    metadata: { restricted_refrigerant: String(restricted) },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  });

  return Response.json({ url: session.url });
}
