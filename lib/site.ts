// Business details shown site-wide and in structured data (Google Merchant checks they match the Merchant Center profile).
export const site = {
  name: "Sarlkig",
  legalName: "Sarlkig LLC",
  domain: "sarlkig.com",
  url: "https://www.sarlkig.com",
  tagline: "Water heaters, boilers and refrigerants, shipped from the US",
  description:
    "Rinnai and Navien water heaters and boilers, genuine Honeywell refrigerants and factory-sealed refrigerant cylinders for trade buyers. Free shipping on every order, dispatched from the United States.",
  email: "contact@sarlkig.com",
  phone: "+1 (224) 337-3481",
  phoneHref: "tel:+12243373481",
  address: "9474 Cherry Ave, Rapid City, MI 49676, USA",
  postalAddress: {
    "@type": "PostalAddress",
    streetAddress: "9474 Cherry Ave",
    addressLocality: "Rapid City",
    addressRegion: "MI",
    postalCode: "49676",
    addressCountry: "US",
  },
  hours: "Mon–Fri, 9:00 AM – 6:00 PM ET",
  policyUpdated: "14 October 2026",
  // Google Merchant Center HTML-tag verification (public value; GOOGLE_SITE_VERIFICATION env overrides it).
  googleSiteVerification: "qsm8PNkb3jaBA7UYrfu6ciCrzoCvOq3SR3-S_2uv4A4",
};

/** Absolute URL for assets served from this site (feeds, structured data and Stripe need absolute URLs). */
export const absUrl = (u: string) => (/^https?:\/\//.test(u) ? u : `${site.url}${u.startsWith("/") ? "" : "/"}${u}`);

export const policies = [
  { slug: "shipping", title: "Shipping policy", short: "Shipping" },
  { slug: "returns", title: "Returns & refunds", short: "Returns & refunds" },
  { slug: "warranty", title: "Warranty", short: "Warranty" },
  { slug: "order-acceptance", title: "Order acceptance & cancellation", short: "Order acceptance" },
  { slug: "payment-security", title: "Payment & security", short: "Payment & security" },
  { slug: "compliance", title: "Refrigerant compliance", short: "Refrigerant compliance" },
  { slug: "privacy", title: "Privacy policy", short: "Privacy" },
  { slug: "terms", title: "Terms of service", short: "Terms of service" },
] as const;
