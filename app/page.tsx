import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Compass,
  FileCheck2,
  FileSearch,
  Network,
  PenTool,
  Search,
  Sparkles,
} from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { LayoutFrame } from "@/components/page-elements";
import { blogHref, blogListingHref, services } from "@/lib/content";
import { getLatestInsightPosts, type InsightPost } from "@/sanity/lib/posts";

/** Refresh homepage insights after Studio publishes. */
export const revalidate = 60;

const featuredServiceSlugs = [
  "geo-strategy",
  "technical-ai-crawlability",
  "answer-ready-content",
  "citation-authority",
] as const;

const serviceIcons = [Compass, Network, PenTool, FileSearch] as const;

function formatDate(value: string | null) {
  if (!value) return "Latest insight";
  const date = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function ServiceIllustration({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="home-service-visual visual-strategy" aria-hidden="true">
        <span className="visual-query"><Search size={15} /> Market question</span>
        <span className="visual-route"><i /><i /><i /></span>
        <span className="visual-target"><Compass size={22} /></span>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="home-service-visual visual-technical" aria-hidden="true">
        <span className="visual-page"><i /><i /><i /></span>
        <span className="visual-network"><Network size={25} /></span>
        <span className="visual-check"><Check size={14} /></span>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="home-service-visual visual-content" aria-hidden="true">
        <span className="visual-copy-line is-long" /><span className="visual-copy-line" /><span className="visual-copy-line is-short" />
        <span className="visual-quote"><PenTool size={21} /></span>
        <span className="visual-source"><FileCheck2 size={14} /> Source</span>
      </div>
    );
  }
  return (
    <div className="home-service-visual visual-authority" aria-hidden="true">
      <span className="visual-authority-core"><Sparkles size={20} /></span>
      <span className="visual-authority-node node-one" /><span className="visual-authority-node node-two" /><span className="visual-authority-node node-three" />
      <span className="visual-authority-proof"><BadgeCheck size={15} /> Verified</span>
    </div>
  );
}

function InsightCover({ post, featured }: { post: InsightPost; featured: boolean }) {
  if (post.imageUrl) {
    return (
      <div className="home-insight-cover has-image">
        <Image src={post.imageUrl} alt={post.imageAlt} fill sizes={featured ? "(max-width: 800px) 100vw, 58vw" : "(max-width: 800px) 100vw, 36vw"} />
      </div>
    );
  }

  return (
    <div className={`home-insight-cover fallback-cover fallback-${post.topic}`} aria-hidden="true">
      <span className="fallback-cover-grid" />
      <span className="fallback-cover-index">GAIO / {post.category}</span>
      <span className="fallback-cover-orbit"><i /><i /><i /></span>
      <strong>{featured ? "Evidence shapes the answer." : "Useful knowledge travels further."}</strong>
      <span className="fallback-cover-mark"><Sparkles size={17} /> GAIO Engine research</span>
    </div>
  );
}

function InsightCard({ post, featured = false }: { post: InsightPost; featured?: boolean }) {
  return (
    <article className={`home-insight-card${featured ? " is-featured" : ""}`}>
      <InsightCover post={post} featured={featured} />
      <div className="home-insight-card-copy">
        <div className="home-insight-meta">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h3><Link href={blogHref(post.slug)}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="home-insight-byline">
          <span>By <strong>{post.author}</strong> · {formatDate(post.updatedAt ?? post.publishedAt)}</span>
          <Link href={blogHref(post.slug)} aria-label={`Read ${post.title}`}>
            Read insight <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const latestInsights = await getLatestInsightPosts(3);
  const featuredServices = featuredServiceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <LayoutFrame>
      <HomeHero />

      <section className="home-signal-strip" aria-label="GAIO Engine working principles">
        <div className="wrap">
          {["Technical clarity", "Expert content", "Credible evidence", "Useful measurement"].map((label) => (
            <span key={label}><Check size={14} aria-hidden="true" /> {label}</span>
          ))}
        </div>
      </section>

      <section id="services" className="home-services-section">
        <div className="wrap">
          <div className="home-section-heading">
            <div>
              <p className="home-kicker">How we help</p>
              <h2>Four disciplines. One connected visibility system.</h2>
            </div>
            <p>We connect the technical, editorial, and authority work that helps your expertise become easier to retrieve, understand, verify, and choose.</p>
          </div>

          <div className="home-service-grid">
            {featuredServices.map((service, index) => {
              const Icon = serviceIcons[index] ?? Compass;
              return (
                <article className="home-service-card" key={service.slug}>
                  <div className="home-service-card-top">
                    <span className="home-service-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="home-service-icon"><Icon size={18} aria-hidden="true" /></span>
                  </div>
                  <ServiceIllustration index={index} />
                  <div className="home-service-copy">
                    <h3>{service.shortTitle}</h3>
                    <p>{service.copy}</p>
                    <Link href={`/services/${service.slug}`} aria-label={`Explore ${service.title}`}>
                      Explore service <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="home-services-footer">
            <p>Not sure where to begin? Start with the question your customers need answered.</p>
            <Link className="button home-button-secondary" href="/services">View all services <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="home-insights-section">
        <div className="wrap">
          <div className="home-section-heading">
            <div>
              <p className="home-kicker">Latest insights</p>
              <h2>A publication for the new search surface.</h2>
            </div>
            <p>Practical guidance from named specialists, with visible dates, useful evidence, and an honest account of what the work can prove.</p>
          </div>

          <div className="home-insight-grid">
            {latestInsights.length ? latestInsights.map((post, index) => <InsightCard key={post._id} post={post} featured={index === 0} />) : (
              <div className="home-insights-empty">
                <span><Sparkles size={18} aria-hidden="true" /> Publishing desk</span>
                <h3>The next evidence-led insight is being prepared.</h3>
                <p>Published Sanity articles will appear here automatically. Browse the topic system while the editorial library is being updated.</p>
                <Link className="button home-button-secondary" href="/topics">Explore topic hubs <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            )}
          </div>

          <div className="home-insights-footer">
            <Link className="button home-button-secondary" href={blogListingHref}>Explore all insights <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="home-consultation-section">
        <div className="wrap home-consultation-panel">
          <div>
            <p className="home-kicker">A clearer starting point</p>
            <h2>Find the visibility gap worth fixing first.</h2>
          </div>
          <p>Bring us your website, market, and most important customer questions. We will turn them into a focused first conversation.</p>
          <Link className="button home-button-primary" href="/book" data-event="strategy_call_clicked" data-location="homepage_final">
            Book a strategy call <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </LayoutFrame>
  );
}
