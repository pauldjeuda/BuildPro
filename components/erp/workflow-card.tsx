import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface WorkflowStep {
  status: 'completed' | 'current' | 'pending';
  label: string;
}

interface WorkflowCardProps {
  title: string;
  description?: string;
  steps: WorkflowStep[];
  progress?: number;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}

export function WorkflowCard({
  title,
  description,
  steps,
  progress,
  actions,
  icon,
}: WorkflowCardProps) {
  const completedSteps = steps.filter((s) => s.status === 'completed').length;
  const progressPercent = progress || (completedSteps / steps.length) * 100;

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {icon && <div className="text-primary">{icon}</div>}
            <h3 className="h4 text-lg font-semibold">{title}</h3>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground">
            Progression
          </span>
          <span className="text-sm font-semibold text-primary">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3 py-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step.status === 'completed'
                  ? 'bg-green-600 text-white'
                  : step.status === 'current'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.status === 'completed' ? '✓' : idx + 1}
            </div>
            <span
              className={`text-sm font-medium ${
                step.status === 'completed'
                  ? 'text-muted-foreground line-through'
                  : step.status === 'current'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {actions && <div className="flex gap-2 pt-4 border-t border-border">{actions}</div>}
    </div>
  );
}
