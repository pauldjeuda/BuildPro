import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

export default function FinancePage() {
  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Finance</h1>
            <p className="text-muted-foreground mt-2">
              Budgets, dépenses et analyse financière
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle Dépense
          </Button>
        </div>

        {/* Financial KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,650k€</div>
              <p className="text-xs text-success mt-1">+12% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,180k€</div>
              <p className="text-xs text-warning mt-1">+5% vs mois dernier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Marge Nette</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,470k€</div>
              <p className="text-xs text-muted-foreground mt-1">40.3% des revenus</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Année</CardTitle>
              <Badge variant="outline">68%</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,850k€</div>
              <p className="text-xs text-muted-foreground mt-1">Dépensés</p>
            </CardContent>
          </Card>
        </div>

        {/* Sections */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Budgets */}
          <Card>
            <CardHeader>
              <CardTitle>Budgets par Chantier</CardTitle>
              <CardDescription>
                Allocation et consommation des budgets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Rénovation Bâtiment A', budget: 250000, spent: 162500 },
                  { name: 'Extension Parking', budget: 450000, spent: 135000 },
                  { name: 'Aménagement Bureau', budget: 180000, spent: 180000 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {((item.spent / item.budget) * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(item.spent / item.budget) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions Récentes</CardTitle>
              <CardDescription>
                Les 5 derniers mouvements financiers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: 'Facture', amount: 15400, status: 'paid' },
                  { type: 'Devis accepté', amount: 8750, status: 'accepted' },
                  { type: 'Bon de commande', amount: -12300, status: 'ordered' },
                  { type: 'Remboursement', amount: 2100, status: 'processed' },
                  { type: 'Acompte', amount: -5000, status: 'paid' },
                ].map((tx, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{tx.type}</p>
                    </div>
                    <p className={`text-sm font-semibold ${tx.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                      {tx.amount > 0 ? '+' : ''}{(tx.amount / 1000).toFixed(1)}k€
                    </p>
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
