'use client';

import React from 'react';
import { AlertCircle, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function IncidentsPage() {
  const incidents = [
    {
      id: 'INC001',
      title: 'Chute d\'équipement',
      severity: 'critical',
      date: '2024-05-08',
      location: 'Rénovation Paris 5ème',
      status: 'open',
    },
    {
      id: 'INC002',
      title: 'Exposition chimique',
      severity: 'high',
      date: '2024-05-07',
      location: 'Construction Marseille',
      status: 'open',
    },
    {
      id: 'INC003',
      title: 'Abrasion cutanée mineure',
      severity: 'low',
      date: '2024-05-05',
      location: 'Maintenance Lyon',
      status: 'resolved',
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critique</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-50">Élevée</Badge>;
      case 'low':
        return <Badge variant="outline">Faible</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <AlertCircle className="h-8 w-8 text-destructive" />
              Incidents HSE
            </h1>
            <p className="text-muted-foreground">Gestion des incidents et accidents</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Signaler Incident
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">Incidents Ouverts</p>
              <p className="text-3xl font-bold text-destructive">2</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">Résolus ce Mois</p>
              <p className="text-3xl font-bold text-primary">1</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-3xl font-bold">{incidents.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un incident..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Incidents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Sévérité</TableHead>
                    <TableHead>Chantier</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.id}</TableCell>
                      <TableCell>{incident.title}</TableCell>
                      <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{incident.location}</TableCell>
                      <TableCell>{incident.date}</TableCell>
                      <TableCell>
                        <Badge variant={incident.status === 'open' ? 'default' : 'outline'}>
                          {incident.status === 'open' ? 'Ouvert' : 'Résolu'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
