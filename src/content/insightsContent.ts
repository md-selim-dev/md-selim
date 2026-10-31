import { parseMarkdownArticle, ParsedMarkdownSection } from '../scripts/markdownLoader';

export type InsightTopic =
  | 'All Topics'
  | 'Website Clarity'
  | 'Webflow Architecture'
  | 'On-Page & Technical SEO'
  | 'Website Maintenance';

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  topic: Exclude<InsightTopic, 'All Topics'>;
  publishedDate: string;
  readTime: string;
  excerpt: string;
  keyTakeaways: string[];
  rawMarkdown: string;
  sections: ParsedMarkdownSection[];
}

// Eagerly load all Markdown (.md) articles in src/content/insights/
const markdownFiles = import.meta.glob('./insights/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const insightsContent: InsightArticle[] = Object.entries(markdownFiles)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([filePath, rawContent]) => {
    const fileName = filePath.split('/').pop()?.replace(/\.md$/, '') || 'article';
    return parseMarkdownArticle(rawContent, fileName);
  });
