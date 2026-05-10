import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function EnginsPage() {
  return (
    <ERPLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Engins & Parc</h1>
            <p className="text-muted-foreground mt-2">
              Gestion du parc d&apos;équipements et maintenance
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter Engin
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Module en construction</CardTitle>
            <CardDescription>
              Les fonctionnalités de gestion d&apos;engins seront bientôt disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ce module permettra de gérer le parc d&apos;engins, les maintenances, carburant et pannes.
            </p>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
