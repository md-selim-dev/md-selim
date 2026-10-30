import React from 'react';
import { RoutePath } from '../config/siteConfig';
import { navigateTo } from '../scripts/router';

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
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800',
    secondary:
      'bg-white text-slate-900 border border-stone-300 hover:border-slate-900 hover:bg-stone-50',
    quiet: 'text-slate-700 hover:text-blue-700 underline-offset-4 hover:underline px-0 py-1',
  };

  const sizeStyles = {
    sm: variant === 'quiet' ? 'text-xs' : 'px-4 py-2 text-xs min-h-[38px]',
    md: variant === 'quiet' ? 'text-sm' : 'px-5 py-2.5 text-sm min-h-[42px]',
    lg: variant === 'quiet' ? 'text-base' : 'px-6 py-3 text-sm sm:text-base min-h-[46px]',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  if (to) {
    return (
      <a
        href={to}
        aria-label={ariaLabel}
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
