'use client';

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KPICard, ProgressBar } from '@/components/erp';

export default function FinanceDashboardPage() {
  const financialData = {
    revenue: 2850000,
    expenses: 1950000,
    profit: 900000,
    marginPercent: 31.6,
    budgetUtilization: 65,
    cashPosition: 1200000,
    outstanding: 450000,
  };

  const projects = [
    { name: 'Rénovation Paris 5ème', allocated: 850000, spent: 382500, percent: 45 },
    { name: 'Construction Marseille', allocated: 1200000, spent: 900000, percent: 75 },
    { name: 'Maintenance Lyon', allocated: 300000, spent: 157500, percent: 52.5 },
    { name: 'Démolition Bordeaux', allocated: 500000, spent: 510000, percent: 102 },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de Bord Financier</h1>
          <p className="text-muted-foreground">Vue d&apos;ensemble de la situation financière</p>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPICard
            title="Chiffre d'Affaires"
            value={`${(financialData.revenue / 1000000).toFixed(2)}M €`}
            trend="up"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            title="Dépenses"
            value={`${(financialData.expenses / 1000000).toFixed(2)}M €`}
            trend="up"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <KPICard
            title="Bénéfice"
            value={`${(financialData.profit / 1000000).toFixed(2)}M €`}
            trend="up"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            title="Marge Nette"
            value={`${financialData.marginPercent}%`}
            trend="down"
            icon={<TrendingDown className="h-5 w-5" />}
          />
        </div>

        {/* Cash & Outstanding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Trésorerie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Disponibilités</span>
                  <span className="font-semibold">{(financialData.cashPosition / 1000000).toFixed(2)}M €</span>
                </div>
                <ProgressBar value={85} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">À Recevoir</span>
                  <span className="font-semibold text-yellow-600">{(financialData.outstanding / 1000000).toFixed(2)}M €</span>
                </div>
                <ProgressBar value={37} />
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  ⚠️ {financialData.outstanding / 1000}K € en attente de paiement
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Utilisation du Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Budget Global</span>
                  <span className="text-sm font-semibold">{financialData.budgetUtilization}% utilisé</span>
                </div>
                <ProgressBar value={financialData.budgetUtilization} />
              </div>
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget Total</span>
                  <span>3.85M €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Utilisé</span>
                  <span className="font-semibold">2.5M €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Restant</span>
                  <span>1.35M €</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Budget */}
        <Card>
          <CardHeader>
            <CardTitle>Budget par Projet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-sm">{project.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {project.spent.toLocaleString('fr-FR')} / {project.allocated.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <ProgressBar value={project.percent} />
                <div className="text-xs text-muted-foreground text-right">{project.percent}% utilisé</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Warnings */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Alertes Financières
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Projet &apos;Démolition Bordeaux&apos; dépasse le budget de 10K €</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>450K € en factures impayées depuis plus de 30 jours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">•</span>
                <span>Prévisions de cashflow tendues pour juin 2024</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
