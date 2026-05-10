import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit2 } from 'lucide-react';

const mockChantiers = [
  {
    id: 1,
    numero: 'CH-2024-001',
    nom: 'Rénovation Bâtiment A',
    adresse: 'Paris, 75001',
    client: 'Groupe Immobilier XYZ',
    status: 'en_cours',
    budget: 250000,
    dept: 162500,
    progress: 65,
    chefEquipe: 'Jean Dupont',
  },
  {
    id: 2,
    numero: 'CH-2024-002',
    nom: 'Extension Parking Souterrain',
    adresse: 'Lyon, 69000',
    client: 'Ville de Lyon',
    status: 'lance',
    budget: 450000,
    dept: 135000,
    progress: 30,
    chefEquipe: 'Marie Martin',
  },
  {
    id: 3,
    numero: 'CH-2024-003',
    nom: 'Aménagement Bureau Neuf',
    adresse: 'Marseille, 13000',
    client: 'TechCorp France',
    status: 'termine',
    budget: 180000,
    dept: 180000,
    progress: 100,
    chefEquipe: 'Pierre Bernard',
  },
];

function statusBadge(status: string) {
  const variants: Record<string, any> = {
    en_cours: 'default',
    lance: 'secondary',
    termine: 'success',
  };
  return variants[status] || 'outline';
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    en_cours: 'En cours',
    lance: 'Lancé',
    termine: 'Terminé',
  };
  return labels[status] || status;
}

export default function ChantierPage() {
  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Chantiers</h1>
            <p className="text-muted-foreground mt-2">
              Gestion complète de tous vos chantiers en cours
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Chantier
          </Button>
        </div>

        {/* Chantiers List */}
        <div className="space-y-4">
          {mockChantiers.map((chantier) => (
            <Card key={chantier.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {/* Info */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Numéro
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      {chantier.numero}
                    </p>
                    <p className="text-sm text-foreground font-medium mt-2">
                      {chantier.nom}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {chantier.adresse}
                    </p>
                  </div>

                  {/* Client & Chef */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Client
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      {chantier.client}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3">
                      Chef d&apos;équipe
                    </p>
                    <p className="text-sm text-foreground">
                      {chantier.chefEquipe}
                    </p>
                  </div>

                  {/* Budget */}
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Budget
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-1">
                      {(chantier.dept / 1000).toFixed(0)}k€ / {(chantier.budget / 1000).toFixed(0)}k€
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {((chantier.dept / chantier.budget) * 100).toFixed(0)}% utilisé
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${chantier.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col items-start justify-between md:items-end">
                    <Badge variant={statusBadge(chantier.status)}>
                      {statusLabel(chantier.status)}
                    </Badge>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit2 className="h-4 w-4" />
                        Éditer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ERPLayout>
  );
}
