import React from 'react';

export interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  className?: string;
}

/**
 * Phase 10: Core Web Vitals Responsive Image Component
 * - Reserves intrinsic aspect ratio via explicit width/height + aspectRatio style (zero CLS)
 * - Uses priority={true} (loading="eager", fetchPriority="high") for LCP/above-the-fold assets
 * - Uses loading="lazy" and decoding="async" for offscreen images
 * - Supports responsive srcSet and sizes attributes
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px',
  srcSet,
  className = '',
}) => {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      referrerPolicy="no-referrer"
      style={{ aspectRatio: `${width} / ${height}` }}
      className={className}
    />
  );
};
