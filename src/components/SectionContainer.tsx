import React from 'react';
import { themeTokens } from '../styles/themeTokens';

export interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  surface?: 'canvas' | 'elevated' | 'interactive';
  spacing?: 'default' | 'compact' | 'none';
  borderTop?: boolean;
  borderBottom?: boolean;
  className?: string;
  containerClassName?: string;
  as?: 'section' | 'div' | 'article';
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  surface = 'canvas',
  spacing = 'default',
  borderTop = false,
  borderBottom = false,
  className = '',
  containerClassName = '',
  as: Tag = 'section',
}) => {
  const surfaceMap = {
    canvas: 'bg-transparent text-[var(--text-primary)]',
    elevated: 'bg-[var(--bg-elevated-translucent)] text-[var(--text-primary)]',
    interactive: 'bg-[var(--bg-interactive)] text-[var(--text-primary)]',
  };

  const spacingMap = {
    default: themeTokens.layout.sectionSpacing,
    compact: themeTokens.layout.sectionSpacingCompact,
    none: '',
  };

  const borderClasses = [
    borderTop ? 'border-t border-[var(--border-subtle)]' : '',
    borderBottom ? 'border-b border-[var(--border-subtle)]' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      id={id}
      data-reveal="section"
      className={`relative ${surfaceMap[surface]} ${spacingMap[spacing]} ${borderClasses} ${className}`.trim()}
    >
      <div className={`${themeTokens.layout.container} ${containerClassName}`.trim()}>
        {children}
      </div>
    </Tag>
  );
};
