import { ERPLayout } from '@/components/layout/erp-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function AchatsPage() {
  return (
    <ERPLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Achats</h1>
            <p className="text-muted-foreground mt-2">
              Commandes, réceptions et gestion des fournisseurs
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle Demande
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Module en construction</CardTitle>
            <CardDescription>
              Les fonctionnalités d&apos;achat seront bientôt disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ce module permettra de gérer les demandes d&apos;achat, validations, commandes et réceptions.
            </p>
          </CardContent>
        </Card>
      </div>
    </ERPLayout>
  );
}
