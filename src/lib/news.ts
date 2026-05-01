import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

import { routing } from '@/i18n/routing';

export type NewsLocale = (typeof routing.locales)[number];

export type NewsFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  author?: string;
  tags?: string[];
  metaDescription?: string;
};

export type NewsPostMeta = NewsFrontmatter & {
  slug: string;
};

export type NewsPost = NewsPostMeta & {
  html: string;
};

const NEWS_DIR = path.join(process.cwd(), 'content', 'news');

function readDir(): string[] {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs.readdirSync(NEWS_DIR).filter((f) => f.endsWith('.md'));
}

/**
 * Returns slugs that have a markdown file for every locale.
 * Throws if a slug is present in one locale but missing in another --
 * we want build failures, not silent half-translated posts.
 */
export function getAllSlugs(): string[] {
  const files = readDir();
  const bySlug = new Map<string, Set<NewsLocale>>();

  for (const file of files) {
    const m = file.match(/^(.+)\.([a-z]{2})\.md$/);
    if (!m) continue;
    const [, slug, locale] = m;
    if (!routing.locales.includes(locale as NewsLocale)) continue;
    if (!bySlug.has(slug)) bySlug.set(slug, new Set());
    bySlug.get(slug)!.add(locale as NewsLocale);
  }

  const complete: string[] = [];
  for (const [slug, locales] of bySlug) {
    const missing = routing.locales.filter((l) => !locales.has(l));
    if (missing.length > 0) {
      throw new Error(
        `News post "${slug}" is missing translations for: ${missing.join(', ')}. ` +
          `Add content/news/${slug}.${missing[0]}.md`
      );
    }
    complete.push(slug);
  }
  return complete;
}

const mdProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize, defaultSchema)
  .use(rehypeStringify);

function parseFile(filePath: string, slug: string): NewsPost {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Partial<NewsFrontmatter>;

  if (!fm.title || !fm.excerpt || !fm.date) {
    throw new Error(`News post ${filePath} is missing required frontmatter (title, excerpt, date).`);
  }

  const html = mdProcessor.processSync(content).toString();

  return {
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    date: typeof fm.date === 'string' ? fm.date : new Date(fm.date as unknown as string).toISOString().slice(0, 10),
    author: fm.author,
    tags: fm.tags,
    metaDescription: fm.metaDescription,
    html,
  };
}

export function getPost(slug: string, locale: NewsLocale): NewsPost {
  const filePath = path.join(NEWS_DIR, `${slug}.${locale}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`News post not found: ${filePath}`);
  }
  return parseFile(filePath, slug);
}

/** Sorted by date descending (newest first). */
export function getAllPosts(locale: NewsLocale): NewsPost[] {
  return getAllSlugs()
    .map((slug) => getPost(slug, locale))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
