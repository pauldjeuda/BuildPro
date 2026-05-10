'use client';

import React from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

interface ERPLayoutProps {
  children: React.ReactNode;
}

export function ERPLayout({ children }: ERPLayoutProps) {
  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Topbar */}
        <Topbar />

        {/* Content Area */}
        <main className="h-[calc(100vh-64px)] overflow-y-auto pt-16 md:pt-0">
          <div className="p-6 space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
