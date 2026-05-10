import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle } from 'lucide-react';

const mockStock = [
  {
    id: 1,
    reference: 'CIM-001',
    nom: 'Ciment Portland 32.5',
    quantite: 450,
    quantiteMin: 200,
    unite: 'sacs',
    prix: 8.50,
    status: 'disponible',
  },
  {
    id: 2,
    reference: 'ACE-045',
    nom: 'Acier Fer à béton ø12',
    quantite: 85,
    quantiteMin: 100,
    unite: 't',
    prix: 450.00,
    status: 'en_penurie',
  },
  {
    id: 3,
    reference: 'SAB-120',
    nom: 'Sable de rivière 0/4',
    quantite: 0,
    quantiteMin: 50,
    unite: 'm³',
    prix: 35.00,
    status: 'epuise',
  },
  {
    id: 4,
    reference: 'GRV-220',
    nom: 'Gravier 4/20',
    quantite: 320,
    quantiteMin: 150,
    unite: 'm³',
    prix: 28.00,
    status: 'disponible',
  },
];

function statusBadge(status: string) {
  const variants: Record<string, any> = {
    disponible: 'success',
    en_penurie: 'warning',
    epuise: 'destructive',
  };
  return variants[status] || 'outline';
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    disponible: 'Disponible',
    en_penurie: 'En pénurie',
    epuise: 'Épuisé',
  };
  return labels[status] || status;
}

export default function StockPage() {
  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion du Stock</h1>
            <p className="text-muted-foreground mt-2">
              Matériaux disponibles et mouvements de stock
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Mouvement
          </Button>
        </div>

        {/* Alerts */}
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                2 articles en pénurie - Action recommandée
              </p>
              <p className="text-xs text-muted-foreground">
                Acier ø12 et Sable de rivière nécessitent une commande urgente
              </p>
            </div>
            <Button size="sm" variant="outline">
              Commander
            </Button>
          </CardContent>
        </Card>

        {/* Stock Items */}
        <Card>
          <CardHeader>
            <CardTitle>Inventaire Principal</CardTitle>
            <CardDescription>
              État du stock de matériaux
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Référence</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Matériau</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Quantité</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Min</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Prix Unit.</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStock.map((item) => (
                    <tr key={item.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-mono text-foreground text-xs">
                        {item.reference}
                      </td>
                      <td className="py-3 px-4 text-foreground">{item.nom}</td>
                      <td className="py-3 px-4 text-foreground font-medium">
                        {item.quantite} {item.unite}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.quantiteMin} {item.unite}
                      </td>
                      <td className="py-3 px-4 text-foreground">
                        {item.prix.toFixed(2)}€
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={statusBadge(item.status)}>
                          {statusLabel(item.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          Détails
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
