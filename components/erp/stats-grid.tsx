import React from 'react';

interface Stat {
  label: string;
  value: string | number;
  unit?: string;
  change?: {
    value: number;
    type: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
}

interface StatsGridProps {
  stats: Stat[];
  columns?: number;
}

export function StatsGrid({ stats, columns = 4 }: StatsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-4`}>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-border bg-card p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            {stat.icon && (
              <div className="p-2 rounded-lg bg-muted">{stat.icon}</div>
            )}
            {stat.change && (
              <span
                className={`text-xs font-semibold ${
                  stat.change.type === 'up'
                    ? 'text-green-600'
                    : stat.change.type === 'down'
                      ? 'text-red-600'
                      : 'text-gray-600'
                }`}
              >
                {stat.change.type === 'up' ? '↑' : '↓'} {stat.change.value}%
              </span>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-foreground">
              {stat.value}
              {stat.unit && <span className="text-sm ml-1">{stat.unit}</span>}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
