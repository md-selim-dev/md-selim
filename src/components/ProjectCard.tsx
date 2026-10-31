import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProjectItem } from '../data/workData';
import { themeTokens } from '../styles/themeTokens';
import { Button } from './Button';
import { VisualWireframeCanvas } from './VisualWireframeCanvas';

export interface ProjectCardProps {
  project: ProjectItem;
  onSelectProject: (project: ProjectItem) => void;
  compact?: boolean;
}

/**
 * Reusable Project Card Component.
 * Clearly distinguishes Demo / Concept Builds from Live Client Architecture.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  compact = false,
}) => {
  return (
    <article className="ds-card p-6 sm:p-8 lg:p-10 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          {/* Clean Unboxed Metadata with Explicit Project Classification */}
          <p className={themeTokens.typography.metadata}>
            <span className="font-semibold text-[var(--accent-primary)]">
              {project.index}
            </span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="font-semibold text-[var(--text-primary)]">
              {project.projectType}
            </span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{project.industry}</span>
          </p>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {project.summary}
          </p>

          <p className="font-mono text-xs text-[var(--text-secondary)] pt-1">
            Focus: {project.serviceFocus.join(' · ')}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onSelectProject(project)}
            >
              View Project Breakdown
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
            <Button to="/contact/" variant="quiet" size="sm">
              Inquire About a Similar Build
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <VisualWireframeCanvas variant={project.wireframeVariant} />
        </div>
      </div>

      {/* Technical Specification Summary Strip */}
      {!compact && (
        <div className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.technicalSpecs.map((spec) => (
            <div key={spec.label} className="space-y-1">
              <p className="font-mono text-[11px] text-[var(--text-secondary)]">
                {spec.label}
              </p>
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};
