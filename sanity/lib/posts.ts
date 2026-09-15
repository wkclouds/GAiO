import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { getClient } from "./client";
import { resolveImageUrl } from "./image";
import {
  commentsByPostQuery,
  latestPostsQuery,
  postBySlugQuery,
  previewPostBySlugQuery,
  postSlugsQuery,
  postsQuery,
} from "./queries";
import { isSanityConfigured } from "../env";
import type { PublicComment } from "@/lib/comments";
import { inferTopicSlug, type TopicSlug } from "@/lib/editorial";

export type InsightComment = PublicComment;

/** Seconds — keeps /blog and homepage Insights fresh after Studio publishes. */
const SANITY_REVALIDATE_SECONDS = 60;

export type InsightPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  editor: string;
  topic: TopicSlug;
  category: string;
  readTime: string;
  keyTakeaways: string[];
  socialHeadline: string | null;
  socialSummary: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  evidence: EvidenceItem[];
  publishedAt: string | null;
  updatedAt: string | null;
  featured: boolean;
  likes: number;
  views: number;
  comments: number;
  imageUrl: string | null;
  imageAlt: string;
  body?: PortableTextBlock[] | string[];
  source: "sanity" | "sample";
};

export type EvidenceItem = {
  _key?: string;
  kind: string;
  finding: string;
  method?: string | null;
  sourceName?: string | null;
  url?: string | null;
  observedAt?: string | null;
  limitation?: string | null;
};

type SanityPostDoc = {
  _id: string;
  _updatedAt?: string | null;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  author?: string | null;
  editor?: string | null;
  topic?: string | null;
  category?: string | null;
  readTime?: string | null;
  keyTakeaways?: string[] | null;
  socialHeadline?: string | null;
  socialSummary?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  evidence?: EvidenceItem[] | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  featured?: boolean | null;
  likes?: number | null;
  views?: number | null;
  comments?: number | null;
  mainImage?: SanityImageSource | null;
  imageAlt?: string | null;
  body?: PortableTextBlock[] | null;
};

function mapSanityPost(doc: SanityPostDoc): InsightPost | null {
  if (!doc?.slug || !doc.title) return null;
  return {
    _id: doc._id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt ?? "",
    author: doc.author ?? "GAiO Editorial Desk",
    editor: doc.editor ?? "GAiO Editorial Desk",
    topic: inferTopicSlug({ topic: doc.topic, title: doc.title, category: doc.category }),
    category: doc.category ?? "Insight",
    readTime: doc.readTime ?? "5 min read",
    keyTakeaways: Array.isArray(doc.keyTakeaways) ? doc.keyTakeaways.filter(Boolean).slice(0, 5) : [],
    socialHeadline: doc.socialHeadline ?? null,
    socialSummary: doc.socialSummary ?? null,
    seoTitle: doc.seoTitle ?? null,
    seoDescription: doc.seoDescription ?? null,
    evidence: Array.isArray(doc.evidence) ? doc.evidence.filter((item) => item?.finding) : [],
    publishedAt: doc.publishedAt ?? null,
    updatedAt: doc.updatedAt ?? doc._updatedAt ?? null,
    featured: Boolean(doc.featured),
    likes: doc.likes ?? 0,
    views: doc.views ?? 0,
    comments: doc.comments ?? 0,
    imageUrl: resolveImageUrl(doc.mainImage, (b) => b.width(800)),
    imageAlt: doc.imageAlt ?? "",
    body: doc.body ?? undefined,
    source: "sanity",
  };
}

async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = ["sanity-post"],
  preview = false,
): Promise<T | null> {
  const client = getClient({ preview });
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      ...(preview ? { cache: "no-store" as const } : { next: { revalidate: SANITY_REVALIDATE_SECONDS, tags } }),
    });
  } catch (error) {
    console.error(
      "[sanity] fetch failed. Check NEXT_PUBLIC_SANITY_* environment values and network access.",
      error,
    );
    return null;
  }
}

export async function getInsightPosts(): Promise<InsightPost[]> {
  if (isSanityConfigured) {
    const docs = await fetchSanity<SanityPostDoc[]>(postsQuery);
    // null = fetch failed / not configured path; [] = Sanity has no published posts
    if (docs) {
      return docs.map(mapSanityPost).filter((p): p is InsightPost => Boolean(p));
    }
  } else {
    console.warn(
      "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is missing or uses a placeholder; live publishing is disabled.",
    );
  }
  return [];
}

export async function getLatestInsightPosts(limit = 3): Promise<InsightPost[]> {
  if (isSanityConfigured) {
    const docs = await fetchSanity<SanityPostDoc[]>(latestPostsQuery);
    if (docs) {
      return docs
        .map(mapSanityPost)
        .filter((p): p is InsightPost => Boolean(p))
        .slice(0, limit);
    }
  }
  return [];
}

export async function getInsightBySlug(slug: string, preview = false): Promise<InsightPost | null> {
  if (isSanityConfigured) {
    const doc = await fetchSanity<SanityPostDoc | null>(preview ? previewPostBySlugQuery : postBySlugQuery, { slug }, ["sanity-post", `sanity-post-${slug}`], preview);
    if (doc) {
      const mapped = mapSanityPost(doc);
      if (mapped) return mapped;
    }
  }
  return null;
}

export async function getInsightSlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    const slugs = await fetchSanity<string[]>(postSlugsQuery);
    if (slugs) return slugs.filter(Boolean);
  }
  return [];
}

export async function getInsightPostsByTopic(topic: TopicSlug): Promise<InsightPost[]> {
  const posts = await getInsightPosts();
  return posts.filter((post) => post.topic === topic);
}

const STOP_WORDS = new Set(["about", "after", "before", "from", "into", "that", "the", "this", "what", "when", "with", "without", "your"]);

function titleTerms(title: string) {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((term) => term.length > 3 && !STOP_WORDS.has(term)),
  );
}

export async function getRelatedInsightPosts(post: InsightPost, limit = 3): Promise<InsightPost[]> {
  const posts = await getInsightPosts();
  const sourceTerms = titleTerms(post.title);

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.topic === post.topic) score += 8;
      if (candidate.category === post.category) score += 3;
      for (const term of titleTerms(candidate.title)) {
        if (sourceTerms.has(term)) score += 1;
      }
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export async function getCommentsForPost(
  postId: string,
): Promise<InsightComment[]> {
  if (!isSanityConfigured || postId.startsWith("sample-")) return [];
  const comments = await fetchSanity<InsightComment[]>(
    commentsByPostQuery,
    { postId },
    ["sanity-comment", `sanity-comment-${postId}`],
  );
  return comments ?? [];
}
