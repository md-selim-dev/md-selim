import { InsightArticle, InsightTopic } from '../content/insightsContent';

export interface ParsedMarkdownSection {
  heading: string;
  paragraphs: string[];
  bullets: string[];
}

/**
 * Parses a raw Markdown (.md) string with YAML frontmatter into a structured InsightArticle.
 */
export function parseMarkdownArticle(rawContent: string, fallbackId: string): InsightArticle {
  const normalized = rawContent.replace(/\r\n/g, '\n').trim();
  const frontmatterMatch = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  const meta: Record<string, string> = {};
  let bodyContent = normalized;

  if (frontmatterMatch) {
    const frontmatterLines = frontmatterMatch[1].split('\n');
    for (const line of frontmatterLines) {
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        const value = line.slice(colonIdx + 1).trim();
        meta[key] = value;
      }
    }
    bodyContent = frontmatterMatch[2].trim();
  }

  // Parse H2 sections (`## Heading`) from Markdown body
  const rawSections = bodyContent.split(/\n(?=##\s+)/);
  const sections: ParsedMarkdownSection[] = [];

  for (const chunk of rawSections) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;

    const lines = trimmed.split('\n');
    let heading = 'Overview';
    let contentLines = lines;

    if (lines[0].startsWith('## ')) {
      heading = lines[0].replace(/^##\s+/, '').trim();
      contentLines = lines.slice(1);
    }

    const paragraphs: string[] = [];
    const bullets: string[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        paragraphs.push(currentParagraph.join(' ').trim());
        currentParagraph = [];
      }
    };

    for (const line of contentLines) {
      const cleanLine = line.trim();
      if (!cleanLine) {
        flushParagraph();
      } else if (cleanLine.startsWith('- ')) {
        flushParagraph();
        bullets.push(cleanLine.replace(/^-\s+/, '').trim());
      } else {
        currentParagraph.push(cleanLine);
      }
    }
    flushParagraph();

    sections.push({
      heading,
      paragraphs,
      bullets,
    });
  }

  const keyTakeaways = meta.keyTakeaways
    ? meta.keyTakeaways
        .split('|')
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return {
    id: meta.id || fallbackId,
    slug: meta.slug || fallbackId,
    title: meta.title || 'Untitled Insight',
    topic: (meta.topic as Exclude<InsightTopic, 'All Topics'>) || 'Website Clarity',
    publishedDate: meta.publishedDate || '2026',
    readTime: meta.readTime || '4 min read',
    excerpt: meta.excerpt || '',
    keyTakeaways,
    rawMarkdown: bodyContent,
    sections,
  };
}
