import React from 'react';
import { themeTokens } from '../styles/themeTokens';

export interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  surface?: 'canvas' | 'white' | 'muted' | 'dark';
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
    canvas: 'bg-[#FAF9F6] text-slate-900',
    white: 'bg-white text-slate-900',
    muted: 'bg-[#F3F2EE] text-slate-900',
    dark: 'bg-slate-900 text-stone-100',
  };

  const spacingMap = {
    default: themeTokens.layout.sectionSpacing,
    compact: themeTokens.layout.sectionSpacingCompact,
    none: '',
  };

  const borderClasses = [
    borderTop ? 'border-t border-stone-200/90' : '',
    borderBottom ? 'border-b border-stone-200/90' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      id={id}
      className={`${surfaceMap[surface]} ${spacingMap[spacing]} ${borderClasses} ${className}`.trim()}
    >
      <div className={`${themeTokens.layout.container} ${containerClassName}`.trim()}>
        {children}
      </div>
    </Tag>
  );
};
