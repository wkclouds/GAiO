import { defineQuery } from "next-sanity";

const postFields = /* groq */ `
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  excerpt,
  author,
  editor,
  topic,
  category,
  readTime,
  keyTakeaways,
  socialHeadline,
  socialSummary,
  seoTitle,
  seoDescription,
  evidence,
  publishedAt,
  "updatedAt": coalesce(updatedAt, _updatedAt),
  featured,
  likes,
  views,
  "comments": coalesce(
    count(*[_type == "comment" && post._ref == ^._id && approved == true]),
    comments,
    0
  ),
  "mainImage": select(defined(mainImage.asset) => mainImage, null),
  "imageAlt": coalesce(mainImage.alt, "")
`;

/** All published posts for /blog — no artificial cap. */
export const postsQuery = defineQuery(`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
    ${postFields}
  }
`);

/**
 * Homepage Insights: featured posts first, then newest.
 * Slice is exclusive end — [0...3] returns up to 3 documents.
 */
export const latestPostsQuery = defineQuery(`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]
    | order(coalesce(featured, false) desc, publishedAt desc)[0...3] {
    ${postFields}
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && slug.current == $slug && defined(publishedAt) && publishedAt <= now()] | order(_updatedAt desc)[0] {
    ${postFields},
    body
  }
`);

/** Draft-aware detail query. Only used by the token-protected preview route. */
export const previewPostBySlugQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && slug.current == $slug] | order(_updatedAt desc)[0] {
    ${postFields},
    body
  }
`);

export const postSlugsQuery = defineQuery(`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && defined(publishedAt) && publishedAt <= now()][].slug.current
`);

export const commentsByPostQuery = defineQuery(`
  *[_type == "comment" && post._ref == $postId && approved == true]
    | order(createdAt desc) {
    _id,
    name,
    body,
    createdAt
  }
`);
