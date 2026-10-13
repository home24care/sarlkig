import Link from "next/link";
import { site } from "./site";

export type Policy = { slug: string; title: string; summary: string; body: React.ReactNode };

const contact = (
  <>
    email <a href={`mailto:${site.email}`}>{site.email}</a> or call <a href={site.phoneHref}>{site.phone}</a> ({site.hours})
  </>
);

export const policyContent: Record<string, Policy> = {
  shipping: {
    slug: "shipping",
    title: "Shipping policy",
    summary: "Free shipping on every U.S. order. Dispatched within 1 business day (Mon–Fri), delivered in 1–4 business days.",
    body: (
      <>
        <h2>Where we deliver</h2>
        <p>We ship to addresses in the United States only. We don&apos;t ship internationally and can&apos;t hand an order to a freight forwarder or consolidator for you.</p>
        <p>Each order goes to one address. If you need stock at several sites, place one order per site — every delivery then has its own tracking, and a hold-up at one address doesn&apos;t delay the rest.</p>

        <h2>What shipping costs</h2>
        <p>Nothing. Shipping is free on every order, with no minimum spend. The price on the product page is what you pay, plus any sales tax due; no delivery charge is added at checkout.</p>

        <h2>How long delivery takes</h2>
        <p>We pick, pack and dispatch within 1 business day (Monday to Friday). Parcel transit then takes 1–4 business days. Both counts are business days, so an order placed late on a Friday leaves us on Monday.</p>
        <p>Water heaters, boilers, multi-cylinder packs and pallets may travel as freight rather than parcel. For freight the carrier will call to book a delivery appointment, and you&apos;ll need a way to unload — a pallet needs a dock or forklift. If you don&apos;t have one, tell us before you order and we&apos;ll advise on liftgate delivery.</p>

        <h2>Tracking</h2>
        <p>We email a tracking number when your order leaves the warehouse. It can take up to 48 hours for the carrier&apos;s first scan to appear — that&apos;s normal.</p>
        <p>If nothing has arrived within 20 days of dispatch, {contact} and we&apos;ll chase the carrier for you.</p>

        <h2>Regulated and heavy freight</h2>
        <p>Refrigerant cylinders are pressurised and regulated in transport. They ship in the manufacturer&apos;s packaging with the required hazard markings and can&apos;t be delivered to a PO box or parcel locker. Gas appliances ship in the manufacturer&apos;s carton; please inspect the box before signing for it.</p>
      </>
    ),
  },

  returns: {
    slug: "returns",
    title: "Returns & refunds",
    summary: "90-day returns on unopened, factory-sealed items. No restocking fee. Refunds within 7 business days of inspection.",
    body: (
      <>
        <h2>What you can return</h2>
        <p>You have 90 days from delivery to return any item that is unopened and still factory-sealed — water heaters, boilers, heaters, refrigerant cylinders, cans and accessories. It must come back in the condition it arrived in.</p>
        <ul>
          <li>Unopened, factory-sealed refrigerant cylinders and cans</li>
          <li>Water heaters, boilers and heaters in their sealed carton, never installed</li>
          <li>Parts, gauges and accessories in resalable condition</li>
        </ul>
        <p>We keep this narrower than a typical retail policy on purpose. Once a refrigerant cylinder is opened, nobody can confirm what&apos;s left in it or whether it&apos;s been contaminated, and once an appliance has been installed it can&apos;t be sold to the next customer as new.</p>

        <h2>What we can&apos;t take back</h2>
        <p>Cylinders with a broken seal, partly used refrigerant, any cylinder that has been connected to a system, and any appliance that has been installed or connected to gas, water or power.</p>
        <p>Ordered the wrong refrigerant or the wrong fuel type and the item is still sealed? That&apos;s a normal return and we&apos;ll accept it.</p>

        <h2>Damaged, defective or wrong items</h2>
        <p>This is separate from returns and the 90-day condition doesn&apos;t apply. If something arrives damaged, leaking or isn&apos;t what you ordered, send us your order number and a photo. Usually we won&apos;t ask you to ship it back — we&apos;ll send a replacement or refund you in full, whichever you prefer.</p>

        <h2>Check your delivery</h2>
        <p>Please inspect your order within 72 hours of delivery. That&apos;s the window in which transit damage can still be claimed against the carrier. Look at the carton, the valve and seal on cylinders, and the cabinet and connections on appliances.</p>

        <h2>How refunds work</h2>
        <p>Contact us first and wait for approval and return instructions — an unannounced parcel may not be identifiable when it reaches us. To start a return, {contact}.</p>
        <p>We inspect approved returns within 72 hours of arrival and issue the refund within 7 business days, to the original payment method. There is no restocking fee.</p>
      </>
    ),
  },

  warranty: {
    slug: "warranty",
    title: "Warranty",
    summary: "Full manufacturer warranty on every appliance, plus our own 30-day replacement cover for defective refrigerant, cylinders and accessories.",
    body: (
      <>
        <h2>Water heaters, boilers and heaters</h2>
        <p>Every appliance we sell is factory-new and carries the manufacturer&apos;s full warranty (Rinnai, Navien and others), which runs from the date of installation or purchase as the manufacturer specifies. Manufacturer warranties generally require installation by a licensed professional to the manufacturer&apos;s instructions and local code.</p>
        <p>Warranty repairs are carried out through the manufacturer&apos;s authorised service network. We&apos;ll help you open the claim and supply proof of purchase and any documents the manufacturer asks for.</p>

        <h2>Refrigerant, cylinders and accessories — 30-day cover</h2>
        <p>On top of any manufacturer cover, every order includes a 30-day replacement warranty from delivery for defects in the product itself:</p>
        <ul>
          <li>a cylinder delivered with a leaking or damaged valve</li>
          <li>a cylinder that won&apos;t hold pressure</li>
          <li>the wrong refrigerant or an incorrect fill weight</li>
          <li>a manufacturing defect in a gauge or accessory</li>
        </ul>

        <h2>What isn&apos;t covered</h2>
        <ul>
          <li>refrigerant that has been used or partly discharged</li>
          <li>damage from mishandling, storage above rated temperature, or transport after delivery</li>
          <li>cylinders that have been refilled, modified or had the valve changed</li>
          <li>the performance of the system a refrigerant is charged into</li>
          <li>appliances damaged by improper installation, venting, water quality or gas supply</li>
        </ul>

        <h2>Why refrigerant cover is 30 days</h2>
        <p>A cylinder is either right when it arrives — correct gas, correct weight, sound valve — or it isn&apos;t, and that shows up within days. A multi-year promise on a consumable gas would sound generous and mean very little, so ours is short, specific and honoured.</p>

        <h2>Making a claim</h2>
        <p>Send your order number, the batch or serial number, and a photo of the problem: {contact}. Replacements ship on the same terms as the original order.</p>
      </>
    ),
  },

  "order-acceptance": {
    slug: "order-acceptance",
    title: "Order acceptance & cancellation",
    summary: "When an order becomes binding, and when we may decline or cancel one.",
    body: (
      <>
        <h2>When your order is accepted</h2>
        <p>Placing an order is an offer to buy. The contract is formed when we dispatch the goods — the dispatch confirmation, not the checkout confirmation, is our acceptance.</p>
        <p>This matters for regulated products: it lets us stop an order that shouldn&apos;t ship before it leaves the warehouse rather than after.</p>

        <h2>When we may decline an order</h2>
        <p>We can refuse or cancel any order. In practice it&apos;s for one of these reasons:</p>
        <ul>
          <li>the buyer isn&apos;t permitted to buy the refrigerant ordered</li>
          <li>a price or description was clearly wrong</li>
          <li>the item went out of stock after the order was placed</li>
          <li>the order didn&apos;t pass payment or fraud checks</li>
          <li>the delivery address can&apos;t receive regulated or freight deliveries</li>
        </ul>
        <p>If we cancel, you&apos;re refunded in full.</p>

        <h2>Quantity limits</h2>
        <p>We may limit quantities per customer, household, order, account, card or address — including where several orders appear to come from the same buyer. Some refrigerant lines are in short supply and limits keep them available to working technicians.</p>

        <h2>Cancelling or changing your order</h2>
        <p>Ask as soon as you can — we dispatch within 1 business day, so the window is short. Once the order is with the carrier, the returns policy applies instead.</p>
        <p>If we need to cancel or change an order we&apos;ll use the email address on the order, so please make sure it&apos;s correct.</p>
      </>
    ),
  },

  "payment-security": {
    slug: "payment-security",
    title: "Payment & security",
    summary: "Payments are taken on Stripe's hosted checkout. Your card details never reach our servers.",
    body: (
      <>
        <h2>How we take payment</h2>
        <p>Checkout is hosted by Stripe. When you pay, you&apos;re passed to Stripe&apos;s secure payment page, you enter your card there, and Stripe sends you back to us with the result.</p>
        <p>Because of that, no card number, expiry date, security code or bank login ever passes through {site.domain} or is stored on our systems — we never see them.</p>

        <h2>What we keep</h2>
        <p>Only what&apos;s needed to fulfil and support your order: the items, the amount, your name, delivery address, email address and Stripe&apos;s payment reference. That reference identifies the transaction; it isn&apos;t a card number and can&apos;t be used as one.</p>

        <h2>Connection security</h2>
        <p>The whole site is served over HTTPS, including every step to checkout. If your browser ever says your connection to {site.domain} isn&apos;t secure, stop and let us know.</p>

        <h2>If something looks wrong</h2>
        <p>If you see a charge you don&apos;t recognise, call your card issuer first — they can block the card immediately, which we can&apos;t. Then {contact} and we&apos;ll trace the order on our side.</p>
      </>
    ),
  },

  compliance: {
    slug: "compliance",
    title: "Refrigerant compliance",
    summary: "Who may buy regulated refrigerants, what ordering confirms, and how we handle state rules.",
    body: (
      <>
        <h2>EPA Section 608 and 609</h2>
        <p>Federal rules restrict who may buy most refrigerants. To buy a restricted refrigerant you must be one of the following: an EPA Section 608-certified technician; an EPA Section 609-certified technician for motor-vehicle air conditioning work; an authorised representative of a certified technician; or a wholesaler buying for resale to certified technicians.</p>
        <p>We don&apos;t collect certificates at checkout. Placing an order for a restricted refrigerant is your confirmation that you are allowed to buy it — and that obligation applies whether or not anyone asks to see paperwork. If you&apos;re unsure which category you&apos;re in, contact us before you order.</p>

        <h2>What&apos;s restricted on this site</h2>
        <p>As a rule, bulk cylinders of HFC and HCFC refrigerant — including R-22, R-32, R-134a, R-404A, R-407A, R-407C, R-410A, R-448A, R-449A, R-454B, R-507, R-513A and the R-22 replacement blends — are restricted. Small self-sealing cans for motor-vehicle A/C fall under separate rules, and cleaners, flushes, gauges and gas appliances aren&apos;t refrigerants at all.</p>

        <h2>State rules</h2>
        <p>Some states regulate higher-GWP refrigerants more tightly than federal law, and some allow reclaimed product where virgin is restricted. If you&apos;re buying for use in California, New York or another state with its own rules, contact us before ordering and we&apos;ll tell you what applies to that line.</p>

        <h2>Venting and recovery</h2>
        <p>Knowingly venting refrigerant during service, repair or disposal is prohibited. Recovery equipment and proper disposal are the buyer&apos;s responsibility.</p>

        <h2>Safe handling</h2>
        <p>Cylinders are pressure vessels. Keep them upright and secured, out of direct sun and below their rated temperature. Never heat a cylinder with a flame, never refill a disposable cylinder and never mix refrigerants — a blend matches no published pressure–temperature chart.</p>
        <p>A2L refrigerants such as R-454B, R-32 and R-1234yf are mildly flammable. Use A2L-rated tools, leak detection and ventilation, and check local limits on how much you may store.</p>

        <h2>Gas appliances</h2>
        <p>Water heaters, boilers and heaters must be installed by a licensed professional in line with the manufacturer&apos;s instructions and local building, gas and venting codes.</p>
      </>
    ),
  },

  privacy: {
    slug: "privacy",
    title: "Privacy policy",
    summary: `What ${site.name} collects when you shop with us, why, and who else sees it.`,
    body: (
      <>
        <h2>Who is responsible</h2>
        <p>{site.legalName} operates {site.domain} and is responsible for the personal information described here. Our business address: {site.address}.</p>

        <h2>What we collect</h2>
        <p>Only what an order needs, plus standard traffic measurement:</p>
        <ul>
          <li>Order details — name, email, delivery address, items and amount</li>
          <li>A payment reference from Stripe (never your card number)</li>
          <li>Messages you send us and our replies</li>
          <li>Analytics about how the site is used, described below</li>
        </ul>

        <h2>Payment data</h2>
        <p>You enter card details on Stripe&apos;s hosted checkout and Stripe handles them entirely. We receive a confirmation and a reference only, so we couldn&apos;t disclose your card number even if asked — we never have it.</p>

        <h2>Cookies, analytics and advertising</h2>
        <p>Your cart is stored in your own browser so it survives a page refresh. We may use Google Analytics and Google Ads to understand which pages lead to orders and to measure advertising; these set cookies and report page views, add-to-cart events and completed purchases, including order value and an order reference. We don&apos;t send your name, email or address to them. Blocking these tools doesn&apos;t stop you ordering.</p>

        <h2>Who else sees your data</h2>
        <ul>
          <li>Stripe, to take payment</li>
          <li>The carrier, to deliver your order</li>
          <li>Our hosting (Vercel) and email providers, in running the site</li>
          <li>A public authority, where the law requires it</li>
        </ul>
        <p>We don&apos;t sell personal information.</p>

        <h2>Reviews and content from partner stores</h2>
        <p>Customer reviews on this site come from two sources. Some are from {site.name} customers, sent to us after their order. Others are from customers of our partner store Freonwell (<a href="https://freonwell.com" rel="noopener">freonwell.com</a>), collected there through the Judge.me review service and shown here with Freonwell&apos;s permission. Each partner review is labelled &ldquo;Freonwell&rdquo; and names the product the customer bought.</p>
        <p>We show reviewers by first name and last initial only. Photos attached to partner reviews are displayed from Judge.me&apos;s servers. If you wrote one of these reviews and want it removed from this site, email <a href={`mailto:${site.email}`}>{site.email}</a> and we will take it down.</p>
        <p>Some product photography is supplied by our partner stores <a href="https://sentaigas.com" rel="noopener">sentaigas.com</a> and <a href="https://mouchllc.com" rel="noopener">mouchllc.com</a>. These images contain no personal information.</p>

        <h2>How long we keep it</h2>
        <p>Order records are kept as long as tax and business-record rules require. Support emails are kept while useful and then deleted. Analytics data follows the retention setting in Google Analytics.</p>

        <h2>Your choices</h2>
        <p>You can ask for a copy of the information we hold about you, ask us to correct it, or ask us to delete it where we aren&apos;t required to keep it. Email <a href={`mailto:${site.email}`}>{site.email}</a> — we reply within 30 days. California residents have additional rights under the CCPA, which we honour on request.</p>
      </>
    ),
  },

  terms: {
    slug: "terms",
    title: "Terms of service",
    summary: `The terms you agree to when you buy from ${site.domain}.`,
    body: (
      <>
        <h2>These terms</h2>
        <p>By placing an order with {site.legalName} through {site.domain} you agree to these terms, together with our <Link href="/policies/shipping">shipping</Link>, <Link href="/policies/returns">returns</Link>, <Link href="/policies/warranty">warranty</Link>, <Link href="/policies/order-acceptance">order acceptance</Link> and <Link href="/policies/compliance">refrigerant compliance</Link> policies, which form part of them.</p>

        <h2>Who may buy</h2>
        <p>You must be 18 or over and able to enter a contract. Most refrigerants sold here are restricted — see the compliance policy for who may buy them. Ordering a restricted refrigerant confirms you are permitted to buy it. We ship within the United States only.</p>

        <h2>Prices and descriptions</h2>
        <p>Prices are in US dollars and exclude sales tax, which is calculated at checkout. We describe products carefully from the manufacturer specifications available to us, but can&apos;t promise every description is free of error. Where a price or description is obviously wrong we may cancel the order and refund you in full.</p>

        <h2>Your responsibilities</h2>
        <p>You are responsible for holding any certification your purchase requires, for having gas appliances installed by a licensed professional, for storing and handling cylinders safely, for recovering rather than venting refrigerant, and for following the rules where you work. Nothing on this site is engineering advice for a particular system — match refrigerant and appliances to the equipment data plate and site conditions.</p>

        <h2>Limitation of liability</h2>
        <p>Our liability for any order is limited to the amount you paid for it. We aren&apos;t liable for indirect or consequential loss — including lost profit, lost contracts, or damage to equipment — except where the law doesn&apos;t allow that limit. Nothing here limits liability for death or personal injury caused by negligence, or for fraud.</p>

        <h2>Product images, reviews and content sources</h2>
        <p>Some product photography on this site is supplied by our affiliated partner stores, <a href="https://sentaigas.com" rel="noopener">sentaigas.com</a> and <a href="https://mouchllc.com" rel="noopener">mouchllc.com</a>, and is used with their permission. Images show the model listed and may differ slightly from the unit shipped (for example in labelling or packaging).</p>
        <p>Customer reviews include reviews from customers of our partner store Freonwell (<a href="https://freonwell.com" rel="noopener">freonwell.com</a>), labelled as such and naming the product reviewed. See the <Link href="/policies/privacy">privacy policy</Link> for how reviewer details are shown.</p>

        <h2>Intellectual property</h2>
        <p>The text, design and code of this site belong to {site.legalName} unless stated otherwise. Manufacturer names and product marks — including Rinnai, Navien and Honeywell — belong to their owners and are used only to identify the goods we sell. {site.name} is an independent retailer and is not affiliated with or endorsed by those manufacturers.</p>

        <h2>Governing law and changes</h2>
        <p>These terms are governed by the law of the state in which {site.legalName} is established and by US federal law where it applies. We may update them; the version in force is the one published here when you order, and each policy shows its last-updated date.</p>
      </>
    ),
  },
};
