import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { themeTokens } from '../styles/themeTokens';

export interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
  metaLine?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  title,
  description,
  metaLine,
  actions,
}) => {
  return (
    <SectionContainer surface="canvas" spacing="compact" borderBottom>
      <div className="max-w-3xl space-y-5">
        <p className={themeTokens.typography.kicker}>{kicker}</p>
        <h1 className={themeTokens.typography.pageHeadline}>{title}</h1>
        <p className={themeTokens.typography.bodyLead}>{description}</p>
        {metaLine && (
          <p className="text-xs text-stone-500 pt-1">{metaLine}</p>
        )}
        {actions && <div className="pt-2 flex flex-wrap items-center gap-4">{actions}</div>}
      </div>
    </SectionContainer>
  );
};
