export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  topic: string;
  readTime: string;
  date: string;
  author: string;
  editor: string;
  keyTakeaways: string[];
  body: string[];
};

export const blogListingHref = "/blog";

export function blogHref(slug: string) {
  return `/blog/${slug}`;
}

export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/authority-engine", label: "Authority Engine" },
  { href: blogListingHref, label: "Insights" },
  { href: "/about", label: "Company" },
];

export const engines = [
  "Google AI Overviews",
  "ChatGPT",
  "Perplexity",
  "Gemini",
  "Claude",
  "Copilot",
  "Brave Search",
  "You.com",
];

export type ServiceDetail = {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  copy: string;
  tags: string[];
  problem: string;
  deliverables: string[];
  process: string[];
  measurement: string[];
  fit: string;
  limitation: string;
  relatedTopic: string;
};

export const services: ServiceDetail[] = [
  {
    number: "01",
    slug: "geo-strategy",
    title: "Generative Engine Optimization strategy",
    shortTitle: "GEO strategy",
    copy: "Turn buyer questions, search demand, entities, proof, and commercial priorities into one accountable GEO roadmap.",
    tags: ["Market questions", "Opportunity map", "90-day roadmap"],
    problem: "Most AI-search programmes begin with a loose prompt list and disconnected tactics. That makes it difficult to decide what matters, what should change first, or whether the work created business value.",
    deliverables: ["Priority prompt and topic map", "Competitor and source landscape", "Entity and evidence gap analysis", "Sequenced 90-day implementation roadmap"],
    process: ["Define the decisions your customers bring to search and AI tools.", "Baseline how your brand, competitors, and sources appear.", "Prioritise changes by evidence strength, effort, and commercial relevance."],
    measurement: ["Priority-query coverage", "Representation accuracy", "Implementation progress", "Qualified conversion signals"],
    fit: "Teams that need a defensible starting point before investing in content, technical changes, or ongoing monitoring.",
    limitation: "A roadmap cannot guarantee inclusion in a third-party answer. It creates a testable sequence for improving the signals your organisation controls.",
    relatedTopic: "geo-fundamentals",
  },
  {
    number: "02",
    slug: "ai-visibility-audits",
    title: "AI Search Visibility audits",
    shortTitle: "Visibility audits",
    copy: "Establish a dated baseline across the questions, answer engines, citations, competitors, and referral paths that matter.",
    tags: ["Prompt baseline", "Citation gaps", "Competitor share"],
    problem: "Rank reports do not show whether an AI answer mentions the brand accurately, cites the right source, or sends a useful visitor to the website.",
    deliverables: ["Fixed priority-query set", "Engine-by-engine observation log", "Citation and source-gap report", "Representation and misinformation review"],
    process: ["Agree the exact prompts, market, language, and observation conditions.", "Record answers and sources without treating one run as permanent.", "Convert the most important gaps into owned actions."],
    measurement: ["Mention and citation rate", "Competitor share of voice", "Sentiment and description accuracy", "AI-assisted visits and leads"],
    fit: "Marketing and leadership teams that want evidence before choosing an AI-search investment.",
    limitation: "AI outputs vary by model, date, location, account, and retrieval state. Every result is reported as a dated observation.",
    relatedTopic: "measurement-experiments",
  },
  {
    number: "03",
    slug: "technical-ai-crawlability",
    title: "Technical SEO and AI crawlability",
    shortTitle: "AI crawlability",
    copy: "Remove the technical friction that prevents priority pages from being crawled, rendered, understood, and retrieved reliably.",
    tags: ["Server rendering", "Crawler access", "Canonical control"],
    problem: "Strong expertise cannot be retrieved when important content is hidden behind unstable rendering, conflicting canonicals, weak crawl paths, or accidental crawler restrictions.",
    deliverables: ["Search and AI crawler review", "Rendering and indexability checks", "Robots, sitemap, canonical, and redirect fixes", "Performance and semantic HTML improvements"],
    process: ["Inspect what each priority URL returns to a crawler.", "Correct access, rendering, duplication, and performance issues.", "Re-test the same URLs and document the remaining constraints."],
    measurement: ["Crawl success", "Index coverage", "Core Web Vitals", "AI-agent access observations"],
    fit: "Websites with valuable content but uncertain rendering, indexing, migration, or crawler behaviour.",
    limitation: "Crawler accessibility makes retrieval possible; it does not force a platform to cite or recommend a page.",
    relatedTopic: "geo-fundamentals",
  },
  {
    number: "04",
    slug: "entity-structured-data",
    title: "Entity and structured data optimization",
    shortTitle: "Entity clarity",
    copy: "Make the organisation, people, services, topics, and proof agree across visible content and machine-readable markup.",
    tags: ["Knowledge consistency", "Schema", "Named experts"],
    problem: "Inconsistent names, vague service definitions, disconnected profiles, and unsupported markup make it harder to identify what a business is and when its expertise is relevant.",
    deliverables: ["Organisation and person entity map", "Structured-data implementation", "Author and reviewer connections", "Trusted-profile consistency plan"],
    process: ["Identify the entities and relationships that matter commercially.", "Align visible facts before adding structured data.", "Validate markup and reconcile trusted external profiles."],
    measurement: ["Entity consistency", "Structured-data validity", "Named-author coverage", "Accurate brand representation"],
    fit: "Businesses whose services, people, products, or locations are described inconsistently across the web.",
    limitation: "Structured data clarifies visible truth. It should never be used to claim credentials, reviews, or relationships that users cannot verify.",
    relatedTopic: "entity-authority",
  },
  {
    number: "05",
    slug: "answer-ready-content",
    title: "Answer-ready content systems",
    shortTitle: "Answer-ready content",
    copy: "Create direct, evidence-led pages that answer real questions and connect each reader to proof, related learning, and a useful next step.",
    tags: ["Answer-first pages", "Topic clusters", "Editorial controls"],
    problem: "Generic volume publishing creates overlapping pages without a clear answer, accountable expert, evidence trail, or relationship to the rest of the site.",
    deliverables: ["Topic-hub architecture", "Priority page briefs and rewrites", "Author, editor, and evidence templates", "Contextual internal-link system"],
    process: ["Choose questions with real customer and commercial value.", "Write the direct answer before supporting explanation.", "Add sources, limitations, ownership, and related paths."],
    measurement: ["Answer coverage", "Internal-link health", "Engaged reading", "Article-to-service journeys"],
    fit: "Expert-led organisations that need a smaller, stronger publication rather than an AI-generated content factory.",
    limitation: "No content format guarantees citation. Original usefulness and independent corroboration still matter.",
    relatedTopic: "citation-ready-content",
  },
  {
    number: "06",
    slug: "citation-authority",
    title: "Digital PR and citation authority",
    shortTitle: "Citation authority",
    copy: "Strengthen the independent evidence around your brand through relevant expert participation, useful assets, and earned coverage.",
    tags: ["Digital PR", "Source seeding", "Expert distribution"],
    problem: "Owned content alone cannot establish every credibility signal. Buyers and retrieval systems also encounter publishers, communities, reviews, interviews, and other independent sources.",
    deliverables: ["Citation-source opportunity map", "Original asset and expert-commentary plan", "Relevant outreach and participation programme", "Earned-mention evidence log"],
    process: ["Study which sources already shape the category answer set.", "Create genuinely useful evidence or expertise worth referencing.", "Earn and monitor accurate mentions without manufacturing them."],
    measurement: ["Relevant earned mentions", "Citation-source diversity", "Referral quality", "Branded search and assisted demand"],
    fit: "Organisations with real expertise that is not yet corroborated across the sources their market trusts.",
    limitation: "Coverage and citations are earned editorial outcomes. Payment, outreach, or participation cannot guarantee inclusion.",
    relatedTopic: "entity-authority",
  },
  {
    number: "07",
    slug: "ai-visibility-monitoring",
    title: "AI visibility monitoring",
    shortTitle: "Visibility monitoring",
    copy: "Re-run a stable market-question set and connect changes in answers, sources, crawlers, referrals, and conversions to the next action.",
    tags: ["Prompt tracking", "Change detection", "Action queue"],
    problem: "One-off screenshots become stale quickly, while enormous prompt lists create noise. Teams need a focused, repeatable observation and decision rhythm.",
    deliverables: ["Stable prompt and engine tracking set", "Citation and competitor change log", "Crawler and referral review", "Prioritised monthly action queue"],
    process: ["Preserve comparable observation conditions.", "Investigate meaningful changes rather than reacting to every fluctuation.", "Connect the finding to an owned page, source, entity, or conversion path."],
    measurement: ["Citation and mention trends", "Representation accuracy", "Source movement", "AI-assisted conversion quality"],
    fit: "Teams already publishing and improving their presence that need an accountable learning loop.",
    limitation: "Monitoring identifies patterns and opportunities; it cannot make probabilistic answers behave like fixed keyword rankings.",
    relatedTopic: "measurement-experiments",
  },
  {
    number: "08",
    slug: "seo-geo-conversion",
    title: "SEO, GEO and conversion strategy",
    shortTitle: "Search-to-revenue",
    copy: "Connect traditional search, AI discovery, helpful landing experiences, and measurement so visibility supports a real business decision.",
    tags: ["Integrated search", "Conversion paths", "Attribution"],
    problem: "Visibility has limited value when high-intent visitors reach a vague page, encounter the wrong next step, or disappear inside incomplete attribution.",
    deliverables: ["Search and AI demand journey", "Landing-page and CTA strategy", "Conversion event plan", "Quarterly growth experiment roadmap"],
    process: ["Map discovery questions to the correct landing experience.", "Match CTAs to reader intent and evidence needs.", "Measure useful actions without pretending attribution is perfect."],
    measurement: ["Qualified organic and AI referrals", "Assessment and booking conversions", "Assisted pipeline", "Landing-page engagement"],
    fit: "Teams that want AI-search work connected to the broader organic and commercial system.",
    limitation: "Attribution across zero-click and multi-touch journeys is incomplete. Reporting must state what is directly measured and what is inferred.",
    relatedTopic: "measurement-experiments",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug) ?? null;
}

export const engagements = [
  { title: "AI Visibility Diagnostic", detail: "A focused baseline of market questions, citations, entities, technical access, and the highest-leverage next actions." },
  { title: "GEO Foundation Sprint", detail: "A defined implementation window for technical retrieval, entity clarity, priority pages, and measurement setup." },
  { title: "Content & Authority Programme", detail: "An editorial and distribution system built around useful answers, inspectable evidence, expert ownership, and earned corroboration." },
  { title: "Ongoing Visibility Growth", detail: "A monthly learning loop connecting answer observations, source changes, publishing, conversion quality, and the next action queue." },
] as const;

export const resourceLibrary = [
  { index: "01", format: "Interactive system", title: "The GAiO Authority Engine", description: "A practical 90-day and long-term plan for topic hubs, evidence, internal links, newsletters, CTAs, and distribution.", href: "/authority-engine", action: "Open the engine", tone: "signal" },
  { index: "02", format: "Interactive workspace", title: "AI Visibility Field Lab", description: "Explore how customer questions, answer engines, sources, entities, content gaps, and actions fit together.", href: "/visibility-lab", action: "Explore the lab", tone: "paper" },
  { index: "03", format: "Evidence library", title: "Observed AI Search Proof", description: "Inspect real GAiO Engine citation captures with their query context and an honest statement of limitations.", href: "/proof", action: "Inspect the evidence", tone: "cyan" },
  { index: "04", format: "Implementation guide", title: "GEO Methodology", description: "Understand the five-stage route from discovery and architecture to authority, validation, and monitoring.", href: "/methodology", action: "Read the method", tone: "ink" },
] as const;

export const outcomePrinciples = [
  { metric: "01", title: "A fixed question baseline", copy: "Agree the questions, engines, market, and observation conditions before comparing change." },
  { metric: "02", title: "A visible evidence trail", copy: "Connect every important claim to a source, method, accountable owner, date, and limitation." },
  { metric: "03", title: "An owned action queue", copy: "Translate each meaningful gap into a page, technical fix, entity correction, or authority action." },
] as const;

export const methodSteps = [
  { index: "01", title: "Discovery", detail: "Find the questions, entities, and competitor narratives shaping your category." },
  { index: "02", title: "Architecture", detail: "Make core pages easier to interpret, connect, and corroborate." },
  { index: "03", title: "Authority", detail: "Build supporting evidence around the expertise you want surfaced." },
  { index: "04", title: "Validation", detail: "Test priority answers and inspect the source patterns behind them." },
  { index: "05", title: "Monitoring", detail: "Keep a focused view of change, opportunity, and next actions." },
];

export type TeamMember = {
  initials: string;
  name: string;
  role: string;
  specialty: string;
  about: string;
  avatarTone: "ink" | "graphite" | "rule";
  email: string;
  imageSrc?: string;
  /** CSS object-position so each photo frames the face correctly */
  imagePosition?: string;
};

export const team: TeamMember[] = [
  {
    initials: "AK",
    name: "Afnan K.",
    role: "Certified AI Specialist",
    specialty: "AI systems & generative optimization",
    about: "Certified AI Specialist focused on practical generative search and answer-engine strategy.",
    avatarTone: "ink",
    email: "inbox.afnankhan@gmail.com",
    imageSrc: "/team/afnan-k.png",
    imagePosition: "center 22%",
  },
  {
    initials: "WK",
    name: "Waqas K.",
    role: "Certified Senior Developer",
    specialty: "Engineering & technical delivery",
    about: "Certified Senior Developer building reliable technical foundations for discoverability and product delivery.",
    avatarTone: "graphite",
    email: "waqasgfx123@gmail.com",
    imageSrc: "/team/waqas-k.png",
    imagePosition: "center 42%",
  },
];

export const faqs = [
  ["Is GEO the same as SEO?", "No. GEO builds on search fundamentals but focuses on whether systems can interpret, verify, and include your expertise in generated answers."],
  ["Can you guarantee an AI result?", "No responsible agency can guarantee a third-party system's output. We build and measure the conditions that improve discoverability and citation readiness."],
  ["Do we need to understand AI search before starting?", "No. The assessment and methodology are designed for teams beginning from zero, with clear priorities and plain-language reporting."],
  ["What does reporting look like?", "We align reporting to agreed topics, prompts, source coverage, and implementation progress—not vanity metrics or unverified claims."],
];

export const articles: Article[] = [
  {
    slug: "from-keywords-to-knowledge",
    title: "Keywords are not enough: build a knowledge system AI can understand",
    excerpt: "A clear way to move from isolated keyword targeting to evidence-rich, answer-ready content systems.",
    category: "Strategy",
    topic: "geo-fundamentals",
    readTime: "6 min read",
    date: "2026-08-17",
    author: "Waqas K.",
    editor: "GAiO Editorial Desk",
    keyTakeaways: [
      "Start with the customer decision, not a longer keyword list.",
      "Connect each claim to a clear entity, source, and accountable owner.",
      "Measure whether priority answers become clearer and better supported over time.",
    ],
    body: [
      "Generative search asks a different question of your content: can a system understand the claim, see the supporting evidence, and connect it to a real-world entity?",
      "The answer is not to publish more generic AI content. It is to identify the topics where your expertise is uniquely useful, then make the logic, sources, and ownership around that expertise easier to inspect.",
      "A useful GEO program creates a narrower, more accountable content system: priority questions, specific sources, clear entities, and a review rhythm that can adapt as the engines change.",
    ],
  },
  {
    slug: "citation-ready-content",
    title: "Is your page citation-ready? Start with these evidence checks",
    excerpt: "The structural and editorial choices that help a useful page hold up when a system needs to synthesize an answer.",
    category: "Editorial systems",
    topic: "citation-ready-content",
    readTime: "5 min read",
    date: "2026-08-17",
    author: "Afnan K.",
    editor: "GAiO Editorial Desk",
    keyTakeaways: [
      "Give the direct answer before the supporting explanation.",
      "Separate measured facts, expert recommendations, and situation-dependent judgment.",
      "Show who wrote the page, who reviewed it, and which sources support the non-obvious claims.",
    ],
    body: [
      "Citation-ready content is not a formatting trick. It combines a direct answer, transparent reasoning, genuinely useful source material, and context about who is making the claim.",
      "The best pages make it easy to separate what is known, what is recommended, and what depends on the reader's situation. That clarity helps people and systems alike.",
      "The goal is not to manufacture certainty. It is to make responsible expertise legible.",
    ],
  },
  {
    slug: "measuring-ai-presence",
    title: "How to measure AI visibility without chasing vanity metrics",
    excerpt: "How to define a focused visibility review around real questions, evidence patterns, and implementation progress.",
    category: "Measurement",
    topic: "measurement-experiments",
    readTime: "4 min read",
    date: "2026-08-17",
    author: "Waqas K.",
    editor: "GAiO Editorial Desk",
    keyTakeaways: [
      "Use a small query set tied to real customer decisions.",
      "Record citations, representation accuracy, source patterns, and assisted conversions together.",
      "Treat every result as a dated observation, not a permanent rank.",
    ],
    body: [
      "The most useful GEO measurement starts with the decisions your audience needs to make—not a broad list of prompts that look impressive in a report.",
      "Choose a small, meaningful query set. Record the answer patterns, relevant sources, and the ways your own evidence appears or fails to appear.",
      "This creates a feedback loop for better content and stronger proof rather than a promise of permanent rank positions.",
    ],
  },
];

/** Real Google AI Overview citations — approved evidence, not illustrative samples. */
export type AiOverviewProofItem = {
  id: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  /** CSS object-position so cover framing keeps the citation in view. */
  imageObjectPosition?: string;
  /** Blog post slug when the cited article exists; omit to link to the blog listing. */
  querySlug?: string;
  queryLabel: string;
  sourceName: string;
  engine: string;
  observedAt: string;
  region: string;
  /** Short alt fragment describing what the screenshot shows. */
  imageAltTopic: string;
  featuredTitle: string;
  evidenceTitle: string;
  lede: string;
};

export const aiOverviewProofs: readonly AiOverviewProofItem[] = [
  {
    id: "ai-search-traffic-citations",
    imageSrc: "/gallery/google-ai-overview-gaio-citation.png",
    imageWidth: 924,
    imageHeight: 734,
    imageObjectPosition: "top center",
    querySlug: "the-2026-state-of-ai-search-traffic-citations-and-discovery",
    queryLabel: "2026 state of AI search traffic, citations & discovery",
    sourceName: "GaioEngine",
    engine: "Google AI Overview",
    observedAt: "14 August 2026",
    region: "Not recorded",
    imageAltTopic: "AI search traffic, citations, and discovery",
    featuredTitle: "GaioEngine cited as a source in Google AI Overview.",
    evidenceTitle: "Observed citation in Google AI Overview.",
    lede:
      "For a query on AI search traffic and citations, Google's AI Overview referenced GaioEngine as a source. One observed instance—not a promise of permanent visibility.",
  },
  {
    id: "seo-geo-questions-2026",
    imageSrc: "/gallery/google-ai-overview-gaio-citation-seo-geo-questions.png",
    imageWidth: 1024,
    imageHeight: 469,
    /* Keep AI Overview body + gaioengine.com citation in the shared 924/734 cover frame. */
    imageObjectPosition: "48% center",
    querySlug: "seo-vs-geo-ai-search-questions-2026",
    queryLabel: "Can AI find your website? SEO & GEO questions for 2026",
    sourceName: "GaioEngine",
    engine: "Google AI Overview",
    observedAt: "15 August 2026",
    region: "Not recorded",
    imageAltTopic: "SEO and GEO questions for 2026",
    featuredTitle: "GaioEngine cited among AI Overview source cards.",
    evidenceTitle: "Observed citation in Google AI Overview.",
    lede:
      "For a query on SEO and GEO questions for 2026, Google's AI Overview listed GaioEngine among its source cards. One observed instance—not a promise of permanent visibility.",
  },
  {
    id: "stale-content-ai-search-refresh",
    imageSrc: "/gallery/google-ai-overview-gaio-citation-stale-content.png",
    imageWidth: 961,
    imageHeight: 845,
    /* Keep AI Overview body + gaioengine.com citation card in the shared 924/734 cover frame. */
    imageObjectPosition: "top center",
    querySlug: "stale-content-ai-search-refresh-rules",
    queryLabel: "Is Your Content Stale? 6 AI Search Refresh Rules",
    sourceName: "GaioEngine",
    engine: "Google AI Overview",
    observedAt: "16 August 2026",
    region: "Not recorded",
    imageAltTopic: "stale content and AI search refresh rules",
    featuredTitle: "GaioEngine cited for stale-content refresh guidance.",
    evidenceTitle: "Observed citation in Google AI Overview.",
    lede:
      "For a query on AI search refresh rules for stale content, Google's AI Overview referenced GaioEngine as a source. One observed instance—not a promise of permanent visibility.",
  },
] as const;

/** First proof — kept for any single-item consumers. */
export const aiOverviewProof = aiOverviewProofs[0];
