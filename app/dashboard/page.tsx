import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, AlertCircle, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  return (
    <ERPLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de Bord</h1>
          <p className="text-muted-foreground mt-2">
            Vue d&apos;ensemble de votre entreprise et KPIs en temps réel
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chantiers Actifs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                +2 cette semaine
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Équipes Actives</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground mt-1">
                Personnel sur le terrain
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incidents HSE</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                Ce mois-ci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget Utilisé</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground mt-1">
                2,450k€ sur 3,600k€
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Section */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Recent Chantiers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chantiers Récents</CardTitle>
              <CardDescription>Derniers chantiers créés ou modifiés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Rénovation Bâtiment A', status: 'en_cours', progress: 65 },
                  { name: 'Extension Parking', status: 'lance', progress: 30 },
                  { name: 'Aménagement Bureau', status: 'termine', progress: 100 },
                ].map((chantier, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{chantier.name}</p>
                      <div className="w-full bg-muted rounded-full h-2 mt-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${chantier.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      {chantier.progress}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques Rapides</CardTitle>
              <CardDescription>Vue globale de vos opérations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rapports du jour</span>
                  <Badge variant="default">18</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">En attente de validation</span>
                  <Badge variant="outline">5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Articles en pénurie</span>
                  <Badge variant="warning">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Incidents ouverts</span>
                  <Badge variant="destructive">2</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ERPLayout>
  );
}
