'use client';

import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/erp/page-header';
import { StatsGrid } from '@/components/erp/stats-grid';
import {
  Building2,
  Users,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      label: 'Chantiers Actifs',
      value: 12,
      icon: <Building2 className="h-5 w-5" />,
      change: { value: 8.5, type: 'up' as const },
    },
    {
      label: 'Équipes sur Terrain',
      value: 34,
      icon: <Users className="h-5 w-5" />,
      change: { value: 2.1, type: 'up' as const },
    },
    {
      label: 'Incidents HSE',
      value: 3,
      icon: <AlertCircle className="h-5 w-5" />,
      change: { value: 5, type: 'down' as const },
    },
    {
      label: 'Budget Utilisé',
      value: '68%',
      unit: '/ 3,600k€',
      icon: <DollarSign className="h-5 w-5" />,
      change: { value: 12, type: 'up' as const },
    },
  ];

  const recentActivities = [
    {
      type: 'chantier',
      title: 'Rénovation Immeuble Résidentiel',
      location: 'Paris 5ème',
      date: 'Il y a 2 heures',
      status: 'En cours',
    },
    {
      type: 'rapport',
      title: 'Rapport Journalier - 10/05/2026',
      location: 'Chantier Défense',
      date: 'Il y a 4 heures',
      status: 'Validé',
    },
    {
      type: 'budget',
      title: 'Dépassement Budget Matériaux',
      location: 'Chantier Montparnasse',
      date: 'Il y a 1 jour',
      status: 'Alerte',
    },
    {
      type: 'pointage',
      title: 'Pointage Équipe A',
      location: 'Chantier Seine',
      date: 'Hier',
      status: 'Complété',
    },
  ];

  return (
    <ERPLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <PageHeader
          title="Tableau de Bord"
          description="Vue d'ensemble en temps réel de vos opérations"
          breadcrumbs={[{ label: 'Accueil' }]}
        />

        {/* Main Stats */}
        <StatsGrid stats={stats} columns={4} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    Activité Récente
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    Voir tout
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="divide-y divide-border mt-4">
                  {recentActivities.map((activity, idx) => (
                    <div key={idx} className="py-4 flex gap-4 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center text-primary">
                          {activity.type === 'chantier' && (
                            <Building2 className="h-5 w-5" />
                          )}
                          {activity.type === 'rapport' && (
                            <Calendar className="h-5 w-5" />
                          )}
                          {activity.type === 'budget' && (
                            <DollarSign className="h-5 w-5" />
                          )}
                          {activity.type === 'pointage' && (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            activity.status === 'En cours'
                              ? 'bg-info-light text-info'
                              : activity.status === 'Validé'
                                ? 'bg-success-light text-success'
                                : activity.status === 'Alerte'
                                  ? 'bg-warning-light text-warning'
                                  : 'bg-secondary-light text-secondary'
                          }`}
                        >
                          {activity.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {activity.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Accès Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Building2 className="h-4 w-4 mr-2" />
                  Nouveau Chantier
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Nouveau Rapport
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Pointage
                </Button>
              </CardContent>
            </Card>

            {/* Alert Card */}
            <Card className="border-warning-light bg-warning-light/20">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  Alertes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground font-medium">
                    2 rapports en attente
                  </p>
                  <p className="text-muted-foreground">
                    Approuvez avant le 11/05/2026
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* KPI Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Chantiers par Statut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'En cours', value: 8, color: 'bg-primary' },
                  { label: 'À commencer', value: 3, color: 'bg-info' },
                  { label: 'Terminés', value: 15, color: 'bg-success' },
                  { label: 'En retard', value: 1, color: 'bg-warning' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.label}</p>
                    </div>
                    <span className="text-sm font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Budget par Mois</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { month: 'Janvier', used: 45, total: 100 },
                  { month: 'Février', used: 62, total: 100 },
                  { month: 'Mars', used: 58, total: 100 },
                  { month: 'Avril', used: 68, total: 100 },
                ].map((item) => (
                  <div key={item.month}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{item.month}</span>
                      <span className="text-muted-foreground">
                        {item.used}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${item.used}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ERPLayout>
  );
}
