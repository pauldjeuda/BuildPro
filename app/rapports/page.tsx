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
import { FileText, Plus, User, Cloud, AlertTriangle } from 'lucide-react';

export default function RapportsPage() {
  const router = useRouter();

  const rapports = [
    {
      id: '1',
      date: '10/05/2026',
      chantier: 'Rénovation Immeuble Paris 5ème',
      effectifs: 12,
      meteo: 'Ensoleillé',
      incidents: 0,
      status: 'Validé',
      auteur: 'Jean Dupont',
    },
    {
      id: '2',
      date: '09/05/2026',
      chantier: 'Construction Bureau Défense',
      effectifs: 18,
      meteo: 'Nuageux',
      incidents: 1,
      status: 'Soumis',
      auteur: 'Marie Martin',
    },
    {
      id: '3',
      date: '08/05/2026',
      chantier: 'Réparation Route Nationale',
      effectifs: 8,
      meteo: 'Pluie légère',
      incidents: 0,
      status: 'Validé',
      auteur: 'Pierre Bernard',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Validé':
        return 'bg-success-light text-success';
      case 'Soumis':
        return 'bg-info-light text-info';
      case 'Brouillon':
        return 'bg-muted text-muted-foreground';
      case 'Rejeté':
        return 'bg-destructive-light text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader
          title="Rapports Journaliers"
          description="Suivi des rapports terrain et validations"
          icon={<FileText className="h-6 w-6" />}
          actions={
            <Button
              onClick={() => router.push('/rapports/nouveau')}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Nouveau Rapport
            </Button>
          }
          breadcrumbs={[{ label: 'Accueil' }, { label: 'Rapports' }]}
        />

        {/* Filter Bar */}
        <FilterBar
          searchPlaceholder="Rechercher un rapport..."
          actions={
            <Button variant="outline" size="sm">
              Afficher 12
            </Button>
          }
        />

        {/* Rapports Grid - Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          {rapports.map((rapport) => (
            <Card
              key={rapport.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => router.push(`/rapports/${rapport.id}`)}
            >
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground font-medium mb-1">
                        {rapport.date}
                      </p>
                      <h3 className="font-semibold text-foreground">
                        {rapport.chantier}
                      </h3>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(rapport.status)}`}
                    >
                      {rapport.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Cloud className="h-4 w-4" />
                      <span>{rapport.meteo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{rapport.auteur}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border flex justify-between text-sm">
                    <span className="font-semibold">{rapport.effectifs} effectifs</span>
                    {rapport.incidents > 0 && (
                      <span className="text-warning flex items-center gap-1 font-semibold">
                        <AlertTriangle className="h-4 w-4" />
                        {rapport.incidents}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rapports Table - Desktop View */}
        <div className="hidden lg:block border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Chantier</TableHead>
                <TableHead className="font-semibold">Effectifs</TableHead>
                <TableHead className="font-semibold">Météo</TableHead>
                <TableHead className="font-semibold text-center">Incidents</TableHead>
                <TableHead className="font-semibold">Auteur</TableHead>
                <TableHead className="font-semibold">Statut</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rapports.map((rapport) => (
                <TableRow
                  key={rapport.id}
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/rapports/${rapport.id}`)}
                >
                  <TableCell className="font-semibold text-foreground">
                    {rapport.date}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {rapport.chantier}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {rapport.effectifs}
                  </TableCell>
                  <TableCell className="flex items-center gap-2 text-muted-foreground">
                    <Cloud className="h-4 w-4" />
                    {rapport.meteo}
                  </TableCell>
                  <TableCell className="text-center">
                    {rapport.incidents > 0 ? (
                      <span className="text-warning font-semibold flex items-center justify-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        {rapport.incidents}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {rapport.auteur}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(rapport.status)}`}
                    >
                      {rapport.status}
                    </span>
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
