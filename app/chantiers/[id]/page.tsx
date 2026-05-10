'use client';

import { useParams } from 'next/navigation';
import { Building2, MapPin, Users, DollarSign, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KPICard, StatusBadge, ProgressBar } from '@/components/erp';

export default function ChantierPage() {
  const params = useParams();
  const id = params.id;

  // Mock data
  const chantier = {
    id,
    name: 'Rénovation Immeuble Résidentiel - Paris 5ème',
    status: 'lance' as const,
    address: '25 Rue de l\'Estrapade, 75005 Paris',
    client: 'Société Civile Immobilière Paris Plus',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    progress: 45,
    budget: 850000,
    spent: 382500,
    teams: 8,
    equipments: 12,
  };

  const tabs = [
    { value: 'overview', label: 'Vue d\'ensemble' },
    { value: 'tasks', label: 'Tâches' },
    { value: 'documents', label: 'Documents' },
    { value: 'photos', label: 'Photos' },
    { value: 'incidents', label: 'Incidents' },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-foreground">{chantier.name}</h1>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <p>{chantier.address}</p>
              </div>
            </div>
            <StatusBadge status={chantier.status} />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button>Éditer</Button>
            <Button variant="outline">Télécharger Rapport</Button>
            <Button variant="outline">
              <AlertCircle className="h-4 w-4 mr-2" />
              Signaler Incident
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPICard
            title="Progression"
            value={`${chantier.progress}%`}
            trend="up"
            icon={<AlertCircle className="h-5 w-5" />}
          />
          <KPICard
            title="Budget Utilisé"
            value={`${((chantier.spent / chantier.budget) * 100).toFixed(1)}%`}
            trend="down"
            icon={<DollarSign className="h-5 w-5" />}
          />
          <KPICard
            title="Équipes Actives"
            value={chantier.teams.toString()}
            trend="up"
            icon={<Users className="h-5 w-5" />}
          />
          <KPICard
            title="Équipements"
            value={chantier.equipments.toString()}
            trend="up"
            icon={<AlertCircle className="h-5 w-5" />}
          />
        </div>

        {/* Progress and Budget Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progression du Chantier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressBar value={chantier.progress} />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Début</span>
                  <span className="font-medium">{chantier.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fin Prévue</span>
                  <span className="font-medium">{chantier.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget Alloué</span>
                  <span className="font-semibold">{chantier.budget.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dépensé</span>
                  <span className="font-semibold">{chantier.spent.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
              <ProgressBar value={(chantier.spent / chantier.budget) * 100} />
              <div className="text-sm text-muted-foreground">
                Restant: {(chantier.budget - chantier.spent).toLocaleString('fr-FR')} €
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Informations Générales</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Client</span>
                        <p className="font-medium">{chantier.client}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type</span>
                        <p className="font-medium">Rénovation Résidentielle</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Responsable</span>
                        <p className="font-medium">Jean Martin</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Contacts</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Maître d&apos;Œuvre</span>
                        <p className="font-medium">Architecte Design +33 1 23 45 67 89</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Inspecteur</span>
                        <p className="font-medium">Contrôle Qualité +33 1 98 76 54 32</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="p-6">
                <p className="text-muted-foreground">Les tâches du chantier s&apos;afficheront ici</p>
              </TabsContent>

              <TabsContent value="documents" className="p-6">
                <p className="text-muted-foreground">Les documents du chantier s&apos;afficheront ici</p>
              </TabsContent>

              <TabsContent value="photos" className="p-6">
                <p className="text-muted-foreground">Les photos du chantier s&apos;afficheront ici</p>
              </TabsContent>

              <TabsContent value="incidents" className="p-6">
                <p className="text-muted-foreground">Les incidents du chantier s&apos;afficheront ici</p>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
