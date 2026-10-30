import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import {
  InsightArticle,
  insightsContent,
  InsightTopic,
} from '../content/insightsContent';
import { PageHeader } from '../layouts/PageHeader';

const TOPICS: InsightTopic[] = [
  'All Topics',
  'Website Clarity',
  'Webflow Architecture',
  'On-Page & Technical SEO',
  'Website Maintenance',
];

export const InsightsPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<InsightTopic>('All Topics');
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);

  const filteredArticles =
    selectedTopic === 'All Topics'
      ? insightsContent
      : insightsContent.filter((article) => article.topic === selectedTopic);

  if (activeArticle) {
    return (
      <div>
        <SectionContainer surface="canvas" spacing="compact" borderBottom>
          <div className="max-w-3xl space-y-5">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="inline-flex items-center gap-2 text-xs font-medium text-blue-700 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to all Insights
            </button>

            <p className="text-xs text-stone-500">
              <span>{activeArticle.topic}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>Published {activeArticle.publishedDate}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>{activeArticle.readTime}</span>
            </p>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              {activeArticle.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {activeArticle.excerpt}
            </p>
          </div>
        </SectionContainer>

        <SectionContainer surface="white" spacing="default">
          <div className="max-w-3xl space-y-10">
            {/* Key Takeaways Box */}
            <div className="rounded-xl bg-[#FAF9F6] border border-stone-200/90 p-6 space-y-3">
              <h2 className="text-xs font-semibold tracking-wide text-slate-900">
                Executive Summary & Key Takeaways
              </h2>
              <ul className="space-y-2">
                {activeArticle.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections */}
            <div className="space-y-8">
              {activeArticle.sections.map((sec) => (
                <section key={sec.heading} className="space-y-3">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    {sec.heading}
                  </h2>
                  {sec.body.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-slate-600 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {/* Footer Action */}
            <div className="pt-8 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <Button variant="secondary" size="sm" onClick={() => setActiveArticle(null)}>
                <ArrowLeft className="w-3.5 h-3.5" />
                Return to Insights Index
              </Button>
              <Button to="/contact/" variant="primary" size="sm">
                Discuss Your Website Architecture
              </Button>
            </div>
          </div>
        </SectionContainer>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        kicker="Insights & Field Notes"
        title="Practical guides on website clarity, Webflow architecture, and technical SEO."
        description="Written for small service business owners and founders who want their website to build credibility, rank cleanly in search, and generate qualified client inquiries."
      />

      <SectionContainer surface="canvas" spacing="default">
        {/* Topic Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div
            role="tablist"
            aria-label="Filter articles by topic"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-stone-200/90 rounded-lg self-start"
          >
            {TOPICS.map((topic) => {
              const active = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-stone-500 font-mono tabular-nums">
            {filteredArticles.length} published {filteredArticles.length === 1 ? 'guide' : 'guides'}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group rounded-xl bg-white border border-stone-200/90 p-6 sm:p-8 flex flex-col justify-between space-y-6 cursor-pointer hover:border-slate-400 transition-colors"
            >
              <div className="space-y-3">
                <p className="text-xs text-stone-500">
                  <span>{article.topic}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>{article.publishedDate}</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </p>

                <h2 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-blue-700">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};
