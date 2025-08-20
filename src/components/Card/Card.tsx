import React, { type ReactNode } from 'react';
import { cn } from '../../utils/helpers';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = 'sm',
  rounded = 'lg',
  border = true,
  hoverable = false,
  clickable = false,
  onClick,
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const roundedStyles = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const Component = clickable || onClick ? 'button' : 'div';

  return (
    <Component
      className={cn(
        'bg-white dark:bg-secondary-800',
        paddingStyles[padding],
        shadowStyles[shadow],
        roundedStyles[rounded],
        border && 'border border-secondary-200 dark:border-secondary-700',
        hoverable && 'transition-shadow duration-200 hover:shadow-md',
        (clickable || onClick) && 'cursor-pointer transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

// Card header component
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  divider?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  divider = false,
}) => (
  <div
    className={cn(
      'mb-4',
      divider && 'pb-4 border-b border-secondary-200 dark:border-secondary-700',
      className
    )}
  >
    {children}
  </div>
);

// Card title component
interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  as: Component = 'h3',
}) => (
  <Component
    className={cn(
      'text-lg font-semibold text-secondary-900 dark:text-secondary-100',
      className
    )}
  >
    {children}
  </Component>
);

// Card description component
interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
}) => (
  <p
    className={cn(
      'text-sm text-secondary-600 dark:text-secondary-400',
      className
    )}
  >
    {children}
  </p>
);

// Card content component
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => (
  <div className={cn('', className)}>
    {children}
  </div>
);

// Card footer component
interface CardFooterProps {
  children: ReactNode;
  className?: string;
  divider?: boolean;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  divider = false,
}) => (
  <div
    className={cn(
      'mt-4',
      divider && 'pt-4 border-t border-secondary-200 dark:border-secondary-700',
      className
    )}
  >
    {children}
  </div>
);

export default Card;
