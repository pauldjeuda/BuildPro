import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function HSEPage() {
  return (
    <ERPLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">HSE</h1>
            <p className="text-muted-foreground mt-2">
              Hygiène, Sécurité, Environnement et incidents
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Déclarer Incident
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Module en construction</CardTitle>
            <CardDescription>
              Les fonctionnalités HSE seront bientôt disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ce module permettra de déclarer des incidents, gérer les inspections et les actions correctives.
            </p>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
