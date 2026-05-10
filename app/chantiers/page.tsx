'use client';

import { useRouter } from 'next/navigation';
import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/erp/page-header';
import { FilterBar } from '@/components/erp/filter-bar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Building2, Plus, MapPin, Users, Calendar } from 'lucide-react';

export default function ChantierPage() {
  const router = useRouter();

  const chantiers = [
    {
      id: '1',
      name: 'Rénovation Immeuble Résidentiel',
      location: 'Paris 5ème',
      status: 'En cours',
      progress: 65,
      startDate: '15/01/2026',
      endDate: '30/09/2026',
      team: 12,
      budget: { used: 450000, total: 600000 },
    },
    {
      id: '2',
      name: 'Construction Bureau Défense',
      location: 'La Défense',
      status: 'Lancé',
      progress: 35,
      startDate: '01/03/2026',
      endDate: '31/12/2026',
      team: 18,
      budget: { used: 850000, total: 1200000 },
    },
    {
      id: '3',
      name: 'Réparation Route Nationale',
      location: 'Île-de-France',
      status: 'En cours',
      progress: 78,
      startDate: '10/02/2026',
      endDate: '15/07/2026',
      team: 8,
      budget: { used: 320000, total: 400000 },
    },
    {
      id: '4',
      name: 'Aménagement Parking Souterrain',
      location: 'Montparnasse',
      status: 'Lancé',
      progress: 15,
      startDate: '01/04/2026',
      endDate: '30/11/2026',
      team: 10,
      budget: { used: 180000, total: 500000 },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return 'bg-info-light text-info';
      case 'Lancé':
        return 'bg-success-light text-success';
      case 'Terminé':
        return 'bg-secondary-light text-secondary';
      case 'Suspendu':
        return 'bg-warning-light text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader
          title="Chantiers"
          description="Gestion complète de vos chantiers et projets"
          icon={<Building2 className="h-6 w-6" />}
          actions={
            <Button
              onClick={() => router.push('/chantiers/nouveau')}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Nouveau Chantier
            </Button>
          }
          breadcrumbs={[{ label: 'Accueil' }, { label: 'Chantiers' }]}
        />

        {/* Filter Bar */}
        <FilterBar
          searchPlaceholder="Rechercher un chantier..."
          actions={
            <Button variant="outline" size="sm">
              Afficher 12
            </Button>
          }
        />

        {/* Chantiers Grid - Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          {chantiers.map((chantier) => (
            <Card
              key={chantier.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/chantiers/${chantier.id}`)}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {chantier.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {chantier.location}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(chantier.status)}`}
                    >
                      {chantier.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progression</span>
                      <span className="font-semibold">{chantier.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${chantier.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                    <div className="text-sm">
                      <p className="text-muted-foreground text-xs">Équipe</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {chantier.team}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground text-xs">Budget</p>
                      <p className="font-semibold text-right">
                        {Math.round(
                          (chantier.budget.used / chantier.budget.total) * 100
                        )}
                        %
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chantiers Table - Desktop View */}
        <div className="hidden lg:block border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="font-semibold">Chantier</TableHead>
                <TableHead className="font-semibold">Localisation</TableHead>
                <TableHead className="font-semibold">Statut</TableHead>
                <TableHead className="font-semibold text-center">
                  Progression
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Équipe
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Budget
                </TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {chantiers.map((chantier) => (
                <TableRow
                  key={chantier.id}
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/chantiers/${chantier.id}`)}
                >
                  <TableCell>
                    <div className="font-semibold text-foreground">
                      {chantier.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {chantier.location}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(chantier.status)}`}
                    >
                      {chantier.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${chantier.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-muted-foreground w-8 text-right">
                        {chantier.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-sm font-semibold flex items-center justify-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {chantier.team}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-sm">
                      <span className="font-semibold">
                        {Math.round(
                          (chantier.budget.used / chantier.budget.total) * 100
                        )}
                        %
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {(chantier.budget.used / 1000).toFixed(0)}k€ /{' '}
                        {(chantier.budget.total / 1000).toFixed(0)}k€
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      →
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ERPLayout>
  );
}
