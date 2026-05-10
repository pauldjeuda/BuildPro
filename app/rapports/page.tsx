import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';

const mockRapports = [
  {
    id: 1,
    chantier: 'CH-2024-001 - Rénovation Bâtiment A',
    date: '2024-05-10',
    status: 'valide',
    meteo: 'Ensoleillé',
    effectifs: 12,
    incidents: 0,
  },
  {
    id: 2,
    chantier: 'CH-2024-002 - Extension Parking',
    date: '2024-05-10',
    status: 'soumis',
    meteo: 'Nuageux',
    effectifs: 8,
    incidents: 1,
  },
  {
    id: 3,
    chantier: 'CH-2024-001 - Rénovation Bâtiment A',
    date: '2024-05-09',
    status: 'valide',
    meteo: 'Pluie légère',
    effectifs: 10,
    incidents: 0,
  },
];

function statusBadge(status: string) {
  const variants: Record<string, any> = {
    valide: 'success',
    soumis: 'default',
    brouillon: 'secondary',
    rejete: 'destructive',
  };
  return variants[status] || 'outline';
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    valide: 'Validé',
    soumis: 'Soumis',
    brouillon: 'Brouillon',
    rejete: 'Rejeté',
  };
  return labels[status] || status;
}

export default function RapportsPage() {
  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rapports Journaliers</h1>
            <p className="text-muted-foreground mt-2">
              Gestion des rapports d&apos;activité terrain
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Rapport
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Badge variant="outline">Tous</Badge>
          <Badge variant="default">Validés (8)</Badge>
          <Badge variant="outline">Soumis (3)</Badge>
          <Badge variant="outline">Brouillons (2)</Badge>
        </div>

        {/* Rapports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Rapports Récents</CardTitle>
            <CardDescription>
              Les 50 derniers rapports soumis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Chantier</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Météo</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Effectifs</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Incidents</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRapports.map((rapport) => (
                    <tr key={rapport.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-foreground">{rapport.chantier}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(rapport.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{rapport.meteo}</td>
                      <td className="py-3 px-4 text-foreground font-medium">
                        {rapport.effectifs}
                      </td>
                      <td className="py-3 px-4">
                        {rapport.incidents > 0 ? (
                          <Badge variant="warning">{rapport.incidents}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={statusBadge(rapport.status)}>
                          {statusLabel(rapport.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Download className="h-4 w-4" />
                          PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
