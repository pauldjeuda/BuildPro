import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'destructive' | 'success' | 'warning';
    onClose?: () => void;
  }
>(({ className, variant = 'default', onClose, children, ...props }, ref) => {
  const variantClasses = {
    default: 'bg-background border-border',
    destructive: 'bg-destructive/10 border-destructive/30',
    success: 'bg-success/10 border-success/30',
    warning: 'bg-warning/10 border-warning/30',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 rounded-lg border p-4 shadow-lg',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-md hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
});
Toast.displayName = 'Toast';

export { Toast };
