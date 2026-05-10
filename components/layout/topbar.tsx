'use client';

import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Topbar() {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-background border-b border-border flex items-center justify-between px-6 z-30">
      <div className="flex-1">
        {/* Title dynamique selon la page */}
        <h1 className="text-xl font-semibold text-foreground">Tableau de Bord</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-medium text-foreground">Paul Djeuda</p>
            <p className="text-xs text-muted-foreground">Administrateur</p>
          </div>
          <button className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold hover:opacity-90">
            PD
          </button>
        </div>

        {/* Logout Button */}
        <Button variant="ghost" size="icon" title="Déconnexion">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
