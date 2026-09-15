"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { BlogPostCard } from "@/components/blog-post-card";
import { blogHref } from "@/lib/content";
import { getTopicCluster, topicClusters } from "@/lib/editorial";
import type { InsightPost } from "@/sanity/lib/posts";

type BlogExplorerProps = {
  posts: InsightPost[];
};

function displayDate(value: string | null) {
  if (!value) return "Date pending";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogExplorer({ posts }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [category, setCategory] = useState("all");
  const [author, setAuthor] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.category))).sort(),
    [posts],
  );
  const authors = useMemo(
    () => Array.from(new Set(posts.map((post) => post.author))).sort(),
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        !needle ||
        [post.title, post.excerpt, post.author, post.editor, post.category]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      const matchesTopic = topic === "all" || post.topic === topic;
      const matchesCategory = category === "all" || post.category === category;
      const matchesAuthor = author === "all" || post.author === author;
      return matchesQuery && matchesTopic && matchesCategory && matchesAuthor;
    });
  }, [author, category, posts, query, topic]);

  const featured = posts.find((post) => post.featured) ?? posts[0];
  const hasFilters = Boolean(query || topic !== "all" || category !== "all" || author !== "all");

  function clearFilters() {
    setQuery("");
    setTopic("all");
    setCategory("all");
    setAuthor("all");
  }

  if (!posts.length) {
    return (
      <section className="blog-publishing-empty" aria-labelledby="blog-empty-title">
        <span className="eyebrow">Publishing desk</span>
        <h2 className="display section-title" id="blog-empty-title">No public articles have been published yet.</h2>
        <p>When an editor publishes the first Sanity article, it will appear here and in Latest Insights on the homepage. Drafts stay private.</p>
        <Link className="button button-primary" href="/topics">Explore the topic hubs <ArrowRight size={16} aria-hidden="true" /></Link>
      </section>
    );
  }

  return (
    <>
      {featured ? (
        <article className="blog-featured">
          <div className="blog-featured-index" aria-hidden="true">
            <span>FIELD NOTE</span>
            <strong>01</strong>
          </div>
          <div className="blog-featured-copy">
            <p className="eyebrow">Featured analysis</p>
            <h2 className="display section-title">{featured.title}</h2>
            <p className="lede">{featured.excerpt}</p>
            <div className="blog-featured-meta">
              <span>{featured.author}</span>
              <span>{displayDate(featured.publishedAt)}</span>
              <span>{featured.readTime}</span>
            </div>
            <Link className="button button-signal" href={blogHref(featured.slug)}>
              Read the analysis <ArrowRight size={16} />
            </Link>
          </div>
          <div className="blog-featured-map" aria-hidden="true">
            <span className="blog-featured-core">{getTopicCluster(featured.topic)?.name ?? "GEO"}</span>
            <i /><i /><i /><i />
          </div>
        </article>
      ) : null}

      <div className="blog-explorer" id="research-library">
        <div className="blog-explorer-heading">
          <div>
            <p className="eyebrow">Research library</p>
            <h2 className="display section-title">Find the next useful answer.</h2>
          </div>
          <p className="lede">Search by question, then narrow the library by durable topic or editorial category.</p>
        </div>

        <div className="blog-filter-panel" aria-label="Filter research">
          <label className="blog-search-field">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search insights</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions, evidence, authors…"
            />
          </label>
          <label className="blog-select-field">
            <SlidersHorizontal size={17} aria-hidden="true" />
            <span className="sr-only">Filter by topic</span>
            <select value={topic} onChange={(event) => setTopic(event.target.value)}>
              <option value="all">All topic hubs</option>
              {topicClusters.map((item) => (
                <option value={item.slug} key={item.slug}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="blog-select-field">
            <span className="sr-only">Filter by author</span>
            <select value={author} onChange={(event) => setAuthor(event.target.value)}>
              <option value="all">All authors</option>
              {authors.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="blog-select-field">
            <span className="sr-only">Filter by category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All content types</option>
              {categories.map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="blog-result-row" aria-live="polite">
          <p><strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? "insight" : "insights"}</p>
          {hasFilters ? <button type="button" onClick={clearFilters}>Clear filters</button> : null}
        </div>

        {filteredPosts.length ? (
          <div className="blog-card-grid">
            {filteredPosts.map((post) => (
              <BlogPostCard
                key={post._id}
                title={post.title}
                subtitle={`${getTopicCluster(post.topic)?.name ?? post.category} · ${post.author}`}
                href={blogHref(post.slug)}
                image={post.imageUrl}
                likes={post.likes}
                comments={post.comments}
                views={post.views}
              />
            ))}
          </div>
        ) : (
          <div className="blog-empty-state">
            <span aria-hidden="true">∅</span>
            <h3>No useful match yet.</h3>
            <p>Try a broader phrase or clear the filters to return to the full research library.</p>
            <button className="button button-primary" type="button" onClick={clearFilters}>Show all insights</button>
          </div>
        )}
      </div>
    </>
  );
}
