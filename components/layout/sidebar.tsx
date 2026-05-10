'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PRIMARY_MODULES, SECONDARY_MODULES } from '@/lib/constants/modules';
import {
  LayoutDashboard,
  Building2,
  FileText,
  DollarSign,
  Package,
  ShoppingCart,
  AlertCircle,
  Truck,
  Clock,
  Menu,
  X,
} from 'lucide-react';

  const iconMap: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard className="h-5 w-5" />,
    Building2: <Building2 className="h-5 w-5" />,
    FileText: <FileText className="h-5 w-5" />,
    DollarSign: <DollarSign className="h-5 w-5" />,
    Package: <Package className="h-5 w-5" />,
    ShoppingCart: <ShoppingCart className="h-5 w-5" />,
    AlertCircle: <AlertCircle className="h-5 w-5" />,
    Truck: <Truck className="h-5 w-5" />,
    Clock: <Clock className="h-5 w-5" />,
  };

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-primary text-primary-foreground p-2 rounded-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-background border-r border-border transition-all duration-300 z-40',
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-primary">BUILDPRO</h1>
          <p className="text-xs text-muted-foreground mt-1">Gestion ERP BTP</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {/* Primary Modules */}
          <div className="space-y-2 mb-6">
            <p className="text-xs font-semibold text-muted-foreground px-4 uppercase tracking-wider">
              Principal
            </p>
            {PRIMARY_MODULES.map((module) => {
              const isModuleActive = isActive(module.path);
              return (
                <Link
                  key={module.id}
                  href={module.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                    isModuleActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  {iconMap[module.icon]}
                  <span>{module.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Secondary Modules */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground px-4 uppercase tracking-wider">
              Logistique & Autres
            </p>
            {SECONDARY_MODULES.map((module) => {
              const isModuleActive = isActive(module.path);
              return (
                <Link
                  key={module.id}
                  href={module.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                    isModuleActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  {iconMap[module.icon]}
                  <span>{module.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground">BUILDPRO v0.1.0</p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
