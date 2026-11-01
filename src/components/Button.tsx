import React from 'react';
import { RoutePath } from '../config/siteConfig';
import { navigateTo, preloadRoute } from '../scripts/router';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'quiet';
  size?: 'sm' | 'md' | 'lg';
  to?: RoutePath;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  ariaLabel,
}) => {
  const variantStyles = {
    primary: 'ds-btn ds-btn-primary',
    secondary: 'ds-btn ds-btn-secondary',
    quiet: 'ds-btn ds-btn-quiet underline-offset-4 hover:underline',
  };

  // Ensure >=44px touch targets on mobile while keeping compact proportions on desktop
  const sizeStyles = {
    sm:
      variant === 'quiet'
        ? 'text-xs min-h-[40px]'
        : 'px-4 py-2 text-xs min-h-[44px] sm:min-h-[38px] whitespace-normal sm:whitespace-nowrap',
    md:
      variant === 'quiet'
        ? 'text-sm min-h-[42px]'
        : 'px-5 py-2.5 text-sm min-h-[44px] whitespace-normal sm:whitespace-nowrap',
    lg:
      variant === 'quiet'
        ? 'text-base min-h-[44px]'
        : 'px-6 py-3 text-sm sm:text-base min-h-[48px] whitespace-normal sm:whitespace-nowrap',
  };

  const combinedClassName = `${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  if (to) {
    return (
      <a
        href={to}
        aria-label={ariaLabel}
        onMouseEnter={() => preloadRoute(to)}
        onFocus={() => preloadRoute(to)}
        onClick={(e) => {
          e.preventDefault();
          if (onClick) onClick();
          navigateTo(to);
        }}
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
};
