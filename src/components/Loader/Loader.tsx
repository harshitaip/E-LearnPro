import React from 'react';
import { cn } from '../../utils/helpers';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'primary',
  className,
  fullScreen = false,
}) => {
  const sizeStyles = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const variantStyles = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    white: 'text-white',
  };

  const spinner = (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-t-2 border-transparent',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      style={{
        borderTopColor: 'currentColor',
        borderRightColor: 'currentColor',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
      }}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          {spinner}
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return spinner;
};

// Skeleton loader component
interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  circle = false,
  lines = 1,
}) => {
  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'animate-pulse bg-secondary-200 dark:bg-secondary-700',
              circle ? 'rounded-full' : 'rounded',
              className
            )}
            style={{
              width: index === lines - 1 ? '60%' : width || '100%',
              height: height || '1rem',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-secondary-200 dark:bg-secondary-700',
        circle ? 'rounded-full' : 'rounded',
        className
      )}
      style={{ width, height }}
    />
  );
};

// Page loader component
export const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <Loader size="lg" />
      <p className="mt-4 text-secondary-600 dark:text-secondary-400">
        Loading page...
      </p>
    </div>
  </div>
);

// Content loader with skeleton
export const ContentLoader: React.FC<{
  title?: boolean;
  lines?: number;
  avatar?: boolean;
}> = ({ title = false, lines = 3, avatar = false }) => (
  <div className="p-6 space-y-4">
    <div className="flex items-center space-x-3">
      {avatar && <Skeleton circle width={40} height={40} />}
      <div className="flex-1 space-y-2">
        {title && <Skeleton height="1.25rem" width="60%" />}
        <Skeleton height="0.875rem" width="40%" />
      </div>
    </div>
    <Skeleton lines={lines} />
  </div>
);

export default Loader;
