import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'primary' | 'success' | 'warning' | 'destructive';
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  color = 'primary',
  showPercentage = true,
  size = 'md',
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-muted-foreground">
              {clampedPercentage}%
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-300', colorClasses[color])}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
}
