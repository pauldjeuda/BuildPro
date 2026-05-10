'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge, KPICard } from '@/components/erp';
import { Clock, Users, MapPin, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const pointages = [
  {
    id: 'P001',
    date: '2024-05-10',
    chantier: 'Rénovation Paris 5',
    employe: 'Jean Dupont',
    role: 'Maçon',
    heureArrivee: '08:00',
    heureDépart: '17:00',
    heuresTravail: 8,
    statut: 'valide' as const,
  },
  {
    id: 'P002',
    date: '2024-05-10',
    chantier: 'Extension Lyon',
    employe: 'Marie Martin',
    role: 'Chef de chantier',
    heureArrivee: '07:30',
    heureDépart: '18:00',
    heuresTravail: 9.5,
    statut: 'valide' as const,
  },
  {
    id: 'P003',
    date: '2024-05-10',
    chantier: 'Rénovation Paris 5',
    employe: 'Pierre Durand',
    role: 'Carreleur',
    heureArrivee: '08:30',
    heureDépart: null,
    heuresTravail: 0,
    statut: 'en_cours' as const,
  },
];

export default function PointagePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pointage des Équipes</h1>
          <p className="text-muted-foreground mt-1">
            Suivi des présences et heures de travail
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau pointage
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="Équipes Actives"
          value="24"
          trend="up"
          color="success"
        />
        <KPICard
          title="Heures Totales"
          value="456 h"
          trend="up"
          color="default"
        />
        <KPICard
          title="Pointages Validés"
          value="128"
          trend="up"
          color="success"
        />
        <KPICard
          title="Taux Absentéisme"
          value="2.3 %"
          trend="down"
          color="success"
        />
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader className="pb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Chantier</label>
              <Input placeholder="Tous les chantiers" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input type="date" defaultValue="2024-05-10" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Statut</label>
              <Input placeholder="Tous" className="mt-1" />
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Filtrer
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Pointages en cours */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Pointages en cours
            </CardTitle>
            <Badge variant="outline">3 équipes actives</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pointages
              .filter((p) => p.statut === 'en_cours')
              .map((pointage) => (
                <div
                  key={pointage.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div>
                    <p className="font-medium">{pointage.employe}</p>
                    <p className="text-sm text-muted-foreground">
                      {pointage.role} • {pointage.chantier}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Depuis {pointage.heureArrivee}</p>
                    <p className="text-xs text-muted-foreground">En cours...</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Tableau complet */}
      <Card>
        <CardHeader>
          <CardTitle>Pointages du jour</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employé</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Chantier</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead>Départ</TableHead>
                <TableHead>Heures</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pointages.map((pointage) => (
                <TableRow key={pointage.id}>
                  <TableCell className="font-medium">{pointage.employe}</TableCell>
                  <TableCell>{pointage.role}</TableCell>
                  <TableCell>{pointage.chantier}</TableCell>
                  <TableCell>{pointage.heureArrivee}</TableCell>
                  <TableCell>
                    {pointage.heureDépart || (
                      <span className="text-muted-foreground">En cours...</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {pointage.heuresTravail > 0 ? `${pointage.heuresTravail}h` : '-'}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={pointage.statut} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
