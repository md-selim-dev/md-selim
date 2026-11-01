import React, { startTransition, useEffect, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { SectionContainer } from '../components/SectionContainer';
import { siteConfig } from '../config/siteConfig';
import {
  ProjectClassification,
  ProjectItem,
  workData,
} from '../data/workData';
import { PageHeader } from '../layouts/PageHeader';
import { ProjectDetailLayout } from '../layouts/ProjectDetailLayout';
import { scrollToTop } from '../scripts/router';
import { applyPageSeo } from '../scripts/seoSchema';

const CLASSIFICATIONS: ProjectClassification[] = [
  'All',
  'Demo / Concept Build',
  'Client Architecture',
];

function getInitialProjectFromUrl(): ProjectItem | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('project');
  if (!slug) return null;
  return workData.find((p) => p.slug === slug || p.id === slug) ?? null;
}

export const WorkPage: React.FC = () => {
  const [selectedClassification, setSelectedClassification] =
    useState<ProjectClassification>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(() =>
    getInitialProjectFromUrl()
  );

  // Keep activeProject synchronized when browser Back/Forward or route navigation changes ?project=
  useEffect(() => {
    const syncFromLocation = () => {
      setActiveProject(getInitialProjectFromUrl());
    };
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('mdselim:routechange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('mdselim:routechange', syncFromLocation);
    };
  }, []);

  // Sync URL query parameter and dynamic SEO metadata + Schema.org JSON-LD when inspecting a project
  useEffect(() => {
    if (activeProject) {
      const canonicalUrl = `${siteConfig.brand.siteUrl}/work/?project=${activeProject.slug}`;
      if (window.location.search !== `?project=${activeProject.slug}`) {
        window.history.pushState(
          { path: '/work/', project: activeProject.slug },
          '',
          `/work/?project=${activeProject.slug}`
        );
      }
      applyPageSeo('/work/', {
        title: `${activeProject.title} | MD SELIM`,
        description: activeProject.summary,
        canonicalUrl,
        project: activeProject,
        breadcrumbs: [
          { name: 'Home', url: `${siteConfig.brand.siteUrl}/` },
          { name: 'Work', url: `${siteConfig.brand.siteUrl}/work/` },
          { name: activeProject.title, url: canonicalUrl },
        ],
      });
    } else {
      if (window.location.search.includes('project=')) {
        window.history.pushState({ path: '/work/' }, '', '/work/');
      }
      applyPageSeo('/work/');
    }
  }, [activeProject]);

  const filteredProjects =
    selectedClassification === 'All'
      ? workData
      : workData.filter((item) => item.projectType === selectedClassification);

  if (activeProject) {
    return (
      <ProjectDetailLayout
        project={activeProject}
        onBack={() => {
          setActiveProject(null);
          scrollToTop();
        }}
      />
    );
  }

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Work' },
        ]}
        kicker="Work & Architecture Showcases"
        title="Website structures built for clarity, usability, and search readiness."
        description="Explore reference website builds, landing page systems, and production architectures. To maintain complete transparency, every project clearly states whether it is a Demo / Concept Build or Live Client Architecture."
        metaLine="Select any project card to open its full architectural breakdown, UX decisions, and technical SEO specification."
      />

      <SectionContainer surface="canvas" spacing="default">
        {/* Classification Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div
            role="tablist"
            aria-label="Filter projects by classification"
            className="w-full sm:w-auto inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg self-start"
          >
            {CLASSIFICATIONS.map((classification) => {
              const active = selectedClassification === classification;
              return (
                <button
                  key={classification}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="work-projects-panel"
                  onClick={() =>
                    startTransition(() => {
                      setSelectedClassification(classification);
                    })
                  }
                  className={`min-h-[40px] px-3.5 py-2 text-xs font-mono font-medium rounded-md transition-colors sm:whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[var(--bg-interactive)] text-[var(--accent-primary)] border border-[var(--border-interactive)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {classification}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-mono tabular-nums">
            Showing {filteredProjects.length} of {workData.length} projects
          </p>
        </div>

        {/* Reusable Project Cards List */}
        <div id="work-projects-panel" role="tabpanel" className="space-y-10">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={(proj) => {
                setActiveProject(proj);
                scrollToTop();
              }}
            />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

