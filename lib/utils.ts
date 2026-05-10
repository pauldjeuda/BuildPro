import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function formatNumber(num: number, decimals = 2): string {
  return num.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function classifyStatus(status: string): string {
  const statusMap: Record<string, string> = {
    actif: 'bg-success/10 text-success',
    inactif: 'bg-muted/10 text-muted-foreground',
    en_cours: 'bg-accent/10 text-accent',
    termine: 'bg-success/10 text-success',
    lance: 'bg-primary/10 text-primary',
    suspendu: 'bg-warning/10 text-warning',
    cloture: 'bg-muted/10 text-muted-foreground',
    brouillon: 'bg-secondary/10 text-secondary-foreground',
    soumis: 'bg-accent/10 text-accent',
    valide: 'bg-success/10 text-success',
    rejete: 'bg-destructive/10 text-destructive',
    declare: 'bg-destructive/10 text-destructive',
    enquete: 'bg-warning/10 text-warning',
    actions: 'bg-accent/10 text-accent',
    clos: 'bg-success/10 text-success',
  };
  return statusMap[status.toLowerCase()] || 'bg-muted/10 text-muted-foreground';
}
