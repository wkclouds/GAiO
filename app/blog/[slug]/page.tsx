import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { LayoutFrame } from "@/components/page-elements";
import { PostBody } from "@/components/post-body";
import { PostComments } from "@/components/post-comments";
import { PostReaction } from "@/components/post-reaction";
import { PostViews } from "@/components/post-views";
import { BlogPostCard } from "@/components/blog-post-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import {
  ArticleShare,
  CommercialArticleCTA,
  EditorialByline,
  EvidenceLedger,
  KeyTakeaways,
  TopicBreadcrumb,
} from "@/components/article-authority";
import { getTopicCluster } from "@/lib/editorial";
import { buildArticleJsonLd } from "@/lib/json-ld";
import { absoluteUrl } from "@/lib/site";
import {
  getCommentsForPost,
  getInsightBySlug,
  getInsightSlugs,
  getRelatedInsightPosts,
} from "@/sanity/lib/posts";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const post = await getInsightBySlug(slug, isEnabled);
  if (!post) return { title: "Post not found" };
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const title = post.seoTitle || post.socialHeadline || post.title;
  const description = post.seoDescription || post.socialSummary || post.excerpt;
  const images = post.imageUrl ? [{ url: post.imageUrl, alt: post.imageAlt || post.title }] : [];
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images,
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      authors: [post.author],
    },
    twitter: {
      card: post.imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const post = await getInsightBySlug(slug, isEnabled);
  if (!post) notFound();

  const persist = post.source === "sanity" && !isEnabled;
  const [comments, relatedPosts] = await Promise.all([
    persist ? getCommentsForPost(post._id) : Promise.resolve([]),
    getRelatedInsightPosts(post, 3),
  ]);
  const topic = getTopicCluster(post.topic);
  const articleUrl = absoluteUrl(`/blog/${post.slug}`);
  const jsonLd = buildArticleJsonLd(post);

  return (
    <LayoutFrame>
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <header className="page-hero">
          <div className="wrap section-intro">
            <TopicBreadcrumb topic={post.topic} />
            <p className="eyebrow">
              {post.category}
              {post.readTime ? ` · ${post.readTime}` : ""}
            </p>
            <h1 className="display headline">{post.title}</h1>
            <p className="lede">{post.excerpt}</p>
            <div className="post-meta-row">
              <EditorialByline
                author={post.author}
                editor={post.editor}
                publishedAt={post.publishedAt}
                updatedAt={post.updatedAt}
              />
              <PostViews
                postId={post._id}
                initialViews={post.views}
                persist={persist}
              />
            </div>
          </div>
        </header>
        <div className="section">
          <div className="wrap detail-layout">
            <div className="prose">
              <KeyTakeaways items={post.keyTakeaways} />
              <PostBody value={post.body} />
              <div className="article-mid-newsletter"><NewsletterSignup source="article-mid" compact /></div>
              <CommercialArticleCTA topic={post.topic} />
            </div>
            <aside className="reading-rail">
              <span className="meta">Your reaction</span>
              <div style={{ marginTop: "var(--space-4)" }}>
                <PostReaction
                  postId={post._id}
                  persist={persist}
                  initialLikes={post.likes}
                  initialDislikes={0}
                />
              </div>
              {topic ? (
                <div className="reading-rail-topic">
                  <span className="meta">Topic hub</span>
                  <Link href={`/topics/${topic.slug}`}>{topic.name}</Link>
                  <p>{topic.promise}</p>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
        {post.evidence.length ? (
          <div className="section section-muted">
            <div className="wrap"><EvidenceLedger items={post.evidence} /></div>
          </div>
        ) : null}
        <div className="section article-conversion-section">
          <div className="wrap article-conversion-stack">
            <ArticleShare url={articleUrl} title={post.socialHeadline || post.title} />
            <NewsletterSignup source="article-end" compact />
          </div>
        </div>
        {relatedPosts.length ? (
          <section className="section section-muted" aria-labelledby="related-reading">
            <div className="wrap">
              <div className="split-head">
                <div>
                  <p className="eyebrow">Continue the cluster</p>
                  <h2 className="display section-title" id="related-reading">The next useful answer.</h2>
                </div>
                {topic ? <Link className="button button-ghost" href={`/topics/${topic.slug}`}>View the full topic hub</Link> : null}
              </div>
              <div className="blog-card-grid related-content-grid">
                {relatedPosts.map((related) => (
                  <BlogPostCard
                    key={related._id}
                    title={related.title}
                    subtitle={`${related.author} · ${related.category}`}
                    href={`/blog/${related.slug}`}
                    image={related.imageUrl}
                    likes={related.likes}
                    comments={related.comments}
                    views={related.views}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}
        <div className="section section-muted">
          <div className="wrap">
            <PostComments
              postId={post._id}
              initialComments={comments}
              persist={persist}
            />
          </div>
        </div>
      </article>
    </LayoutFrame>
  );
}
