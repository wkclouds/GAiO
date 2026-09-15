import { CodeIcon } from "@sanity/icons/Code";
import { ImageIcon } from "@sanity/icons/Image";
import { defineArrayMember, defineField, defineType } from "sanity";
import { BlockquoteStyle } from "./blockquoteStyle";
import { postBodyPortableTextPlugins } from "../plugins/portableTextPlugins";

export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      description: "Use the public name shown on the author profile.",
      initialValue: "GAiO Editorial Desk",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "editor",
      title: "Editor / reviewer",
      type: "string",
      description: "The person or editorial team that checked clarity and evidence.",
      initialValue: "GAiO Editorial Desk",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "topic",
      title: "Primary topic hub",
      type: "string",
      options: {
        list: [
          { title: "GEO fundamentals", value: "geo-fundamentals" },
          { title: "Citation-ready content", value: "citation-ready-content" },
          { title: "Entity & authority", value: "entity-authority" },
          { title: "Measurement & experiments", value: "measurement-experiments" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      description: 'e.g. "6 min read"',
    }),
    defineField({
      name: "keyTakeaways",
      title: "Key takeaways",
      type: "array",
      description: "Three to five standalone conclusions shown before the article body.",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(3).max(5),
    }),
    defineField({
      name: "socialHeadline",
      title: "Social headline",
      type: "string",
      description: "Optional channel-friendly headline. Keep it accurate and specific.",
      validation: (rule) => rule.max(110),
    }),
    defineField({
      name: "socialSummary",
      title: "Social summary",
      type: "text",
      rows: 2,
      description: "Optional share copy used for social previews.",
      validation: (rule) => rule.max(220),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          validation: (rule) => rule.required().max(180),
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Editorial update date",
      type: "datetime",
      description: "Optional public date for a substantive editorial update. Sanity also keeps its automatic document update time.",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      description: "Optional search and social title. Defaults to the article title.",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
      description: "Optional search description. Defaults to the excerpt.",
      validation: (rule) => rule.max(170),
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      description:
        "When enabled, this post is preferred in the Insights section on the homepage. If fewer than three posts are featured, the newest published posts fill the remaining slots.",
      initialValue: false,
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "number",
      description: "Persisted via the site like button (and editable here).",
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "views",
      title: "Views",
      type: "number",
      description: "Persisted via the site (once per browser session).",
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "comments",
      title: "Comments (legacy display)",
      type: "number",
      description:
        "Optional fallback count. Live pages prefer counting approved comment documents.",
      initialValue: 0,
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "evidence",
      title: "Evidence ledger",
      type: "array",
      description: "Document first-hand observations and important sources with their limits.",
      of: [
        defineArrayMember({
          type: "object",
          name: "evidenceItem",
          title: "Evidence item",
          fields: [
            defineField({
              name: "kind",
              title: "Evidence type",
              type: "string",
              options: {
                list: [
                  "Original observation",
                  "Experiment",
                  "Interview",
                  "First-party dataset",
                  "Primary source",
                  "Supporting source",
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "finding",
              title: "What this evidence supports",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "method",
              title: "Method / scope",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "sourceName",
              title: "Source or artefact name",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "Source URL",
              type: "url",
              validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
            }),
            defineField({
              name: "observedAt",
              title: "Observed / verified date",
              type: "date",
            }),
            defineField({
              name: "limitation",
              title: "Limitation",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "kind", subtitle: "finding" },
          },
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Heading 5", value: "h5" },
            { title: "Heading 6", value: "h6" },
            {
              title: "Quote",
              value: "blockquote",
              component: BlockquoteStyle,
            },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              { title: "Code", value: "code" },
              { title: "Highlight", value: "highlight" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                  defineField({
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true,
                  }),
                ],
              },
              {
                name: "citation",
                type: "object",
                title: "Citation",
                fields: [
                  defineField({
                    name: "source",
                    type: "string",
                    title: "Source",
                    description: "Publication, author, or short attribution.",
                    validation: (rule) => rule.required().max(200),
                  }),
                  defineField({
                    name: "url",
                    type: "url",
                    title: "Source URL",
                    validation: (rule) =>
                      rule.uri({ scheme: ["http", "https"] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Describe the information or purpose of this image for people who cannot see it.",
              validation: (rule) => rule.required().max(180),
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
            }),
          ],
        }),
        defineArrayMember({
          type: "table",
          title: "Table",
        }),
        defineArrayMember({
          type: "callout",
          title: "Callout",
        }),
        defineArrayMember({
          type: "code",
          title: "Code block",
          icon: CodeIcon,
        }),
        defineArrayMember({
          type: "horizontalRule",
          title: "Divider",
        }),
        defineArrayMember({
          type: "statsRow",
          title: "Stats row",
        }),
      ],
      components: {
        portableText: {
          plugins: postBodyPortableTextPlugins,
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "mainImage",
      featured: "featured",
    },
    prepare({ title, author, media, featured }) {
      return {
        title,
        subtitle: featured ? `Featured · ${author || "Untitled author"}` : author,
        media,
      };
    },
  },
});
