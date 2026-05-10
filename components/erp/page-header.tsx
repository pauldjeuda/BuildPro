import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export function PageHeader({
  title,
  description,
  icon,
  actions,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="space-y-6 mb-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-border">/</span>}
              <a
                href={crumb.href || '#'}
                className="hover:text-foreground transition-colors"
              >
                {crumb.label}
              </a>
            </React.Fragment>
          ))}
        </nav>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="mt-1 p-3 rounded-lg bg-primary-light text-primary">
              {icon}
            </div>
          )}
          <div>
            <h1 className="h2 text-2xl md:text-3xl font-bold text-foreground">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>

        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}
