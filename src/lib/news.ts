import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import type { Root, Element, RootContent } from 'hast';
import type { VFile } from 'vfile';

import { routing } from '@/i18n/routing';

export type NewsLocale = (typeof routing.locales)[number];

export type NewsFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  updatedDate?: string;
  author?: string;
  tags?: string[];
  metaDescription?: string;
  image?: { src: string; alt: string; credit: string; creditUrl: string };
};

export type NewsPostMeta = NewsFrontmatter & {
  slug: string;
};

export type NewsPost = NewsPostMeta & {
  html: string;
  headings: { id: string; title: string }[];
  readingMinutes: number;
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

/** Generate safe, stable section links after sanitizing author content. */
function headingAnchors() {
  return (tree: Root, file: VFile) => {
    const headings: NewsPost['headings'] = [];
    const textContent = (node: RootContent): string => {
      if (node.type === 'text') return node.value;
      return 'children' in node ? node.children.map(textContent).join('') : '';
    };
    const visit = (node: Root | Element) => {
      for (const child of node.children) {
        if (child.type !== 'element') continue;
        if (child.tagName === 'h2') {
          const id = `section-${headings.length + 1}`;
          child.properties.id = id;
          headings.push({ id, title: textContent(child) });
        }
        visit(child);
      }
    };
    visit(tree);
    file.data.headings = headings;
  };
}

const mdProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize, defaultSchema)
  .use(headingAnchors)
  .use(rehypeStringify);

function parseFile(filePath: string, slug: string): NewsPost {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Partial<NewsFrontmatter>;

  if (!fm.title || !fm.excerpt || !fm.date) {
    throw new Error(`News post ${filePath} is missing required frontmatter (title, excerpt, date).`);
  }

  const rendered = mdProcessor.processSync(content);
  const html = rendered.toString();
  const dateString = (value: string) => typeof value === 'string' ? value : new Date(value).toISOString().slice(0, 10);

  return {
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    date: dateString(fm.date),
    updatedDate: fm.updatedDate ? dateString(fm.updatedDate) : undefined,
    author: fm.author,
    tags: fm.tags,
    metaDescription: fm.metaDescription,
    image: fm.image,
    html,
    headings: rendered.data.headings as NewsPost['headings'],
    readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)),
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
