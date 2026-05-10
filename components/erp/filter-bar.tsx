import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

interface FilterBarProps {
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  filters?: React.ReactNode;
  onFilterClear?: () => void;
  actions?: React.ReactNode;
}

export function FilterBar({
  searchPlaceholder = 'Rechercher...',
  onSearch,
  filters,
  onFilterClear,
  actions,
}: FilterBarProps) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {filters && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtres
              </Button>
            </div>
          )}

          {searchValue && onFilterClear && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSearch('')}
              className="gap-1"
            >
              <X className="h-4 w-4" />
              Réinitialiser
            </Button>
          )}
        </div>

        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>

      {filters && <div className="flex flex-wrap gap-2">{filters}</div>}
    </div>
  );
}
