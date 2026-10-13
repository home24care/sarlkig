// TODO before launch: replace phone and address with the business's real details (Google Merchant verifies them).
export const site = {
  name: "Sarlkig",
  legalName: "Sarlkig LLC",
  domain: "sarlkig.com",
  url: "https://sarlkig.com",
  tagline: "Water heaters, boilers and refrigerants, shipped from the US",
  description:
    "Rinnai and Navien water heaters and boilers, genuine Honeywell refrigerants and factory-sealed refrigerant cylinders for trade buyers. Free shipping on every order, dispatched from the United States.",
  email: "contact@sarlkig.com",
  phone: "+1 (000) 000-0000",
  phoneHref: "tel:+10000000000",
  address: "Business address — to be added",
  hours: "Mon–Fri, 9:00 AM – 6:00 PM ET",
  policyUpdated: "13 October 2026",
};

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
