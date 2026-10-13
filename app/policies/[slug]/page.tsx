import Link from "next/link";
import { notFound } from "next/navigation";
import { policies, site } from "@/lib/site";
import { policyContent } from "@/lib/policies";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = policyContent[slug];
  return p ? { title: p.title, description: p.summary, alternates: { canonical: `/policies/${slug}` } } : {};
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = policyContent[slug];
  if (!p) notFound();

  return (
    <div className="container-site py-6">
      <nav className="flex gap-1.5 text-xs text-ink-meta">
        <Link href="/" className="hover:text-accent">Home</Link><span>/</span>
        <Link href="/policies" className="hover:text-accent">Policies</Link><span>/</span>
        <span className="text-ink-muted">{p.title}</span>
      </nav>
      <div className="mt-8 grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="order-last lg:order-first">
          <div className="micro mb-3">Policies</div>
          <ul className="space-y-0.5 text-sm lg:sticky lg:top-4">
            {policies.map((x) => (
              <li key={x.slug}>
                <Link href={`/policies/${x.slug}`} className={`block border-l-2 px-3 py-1.5 ${x.slug === slug ? "border-accent font-semibold text-ink" : "border-transparent text-ink-muted hover:text-accent"}`}>
                  {x.short}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <article>
          <h1 className="h-display text-[38px] leading-tight">{p.title}</h1>
          <p className="mt-3 max-w-3xl border-l-2 border-accent bg-tint px-4 py-3 text-[15px] leading-7 text-ink">{p.summary}</p>
          <p className="mt-3 text-xs text-ink-meta">Last updated {site.policyUpdated}</p>
          <div className="prose-sg mt-4">{p.body}</div>
          <div className="mt-12 max-w-3xl rounded-[4px] border border-line bg-surface p-6">
            <h2 className="font-display text-xl font-medium text-ink">Questions about this policy</h2>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div><dt className="micro">Email</dt><dd><a className="link" href={`mailto:${site.email}`}>{site.email}</a></dd></div>
              <div><dt className="micro">Phone</dt><dd><a className="link" href={site.phoneHref}>{site.phone}</a></dd></div>
              <div><dt className="micro">Address</dt><dd className="text-ink-body">{site.address}</dd></div>
              <div><dt className="micro">Support hours</dt><dd className="text-ink-body">{site.hours}</dd></div>
            </dl>
          </div>
        </article>
      </div>
    </div>
  );
}
