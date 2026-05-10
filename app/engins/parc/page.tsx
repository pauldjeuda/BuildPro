'use client';

import React from 'react';
import { Truck, Plus, Search, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '@/components/erp';

export default function ParcPage() {
  const equipments = [
    {
      id: 'EN001',
      name: 'Pelle CAT 320',
      type: 'Excavateur',
      status: 'operational',
      location: 'Paris 5ème',
      hoursUsed: 2450,
      lastMaintenance: '2024-04-15',
    },
    {
      id: 'EN002',
      name: 'Bulldozer Komatsu D65',
      type: 'Bulldozer',
      status: 'operational',
      location: 'Marseille',
      hoursUsed: 3200,
      lastMaintenance: '2024-05-01',
    },
    {
      id: 'EN003',
      name: 'Grue Liebherr 300T',
      type: 'Grue',
      status: 'maintenance',
      location: 'Atelier',
      hoursUsed: 1850,
      lastMaintenance: '2024-05-08',
    },
    {
      id: 'EN004',
      name: 'Camion Benne Volvo',
      type: 'Camion',
      status: 'operational',
      location: 'Bordeaux',
      hoursUsed: 4100,
      lastMaintenance: '2024-03-20',
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Truck className="h-8 w-8 text-primary" />
              Parc d&apos;Engins
            </h1>
            <p className="text-muted-foreground">Gestion du matériel roulant et équipements</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter Engin
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">Total Engins</p>
              <p className="text-3xl font-bold text-primary">{equipments.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">Opérationnels</p>
              <p className="text-3xl font-bold text-green-600">
                {equipments.filter((e) => e.status === 'operational').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">En Maintenance</p>
              <p className="text-3xl font-bold text-yellow-600">
                {equipments.filter((e) => e.status === 'maintenance').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground">Heures Totales</p>
              <p className="text-3xl font-bold">{equipments.reduce((sum, e) => sum + e.hoursUsed, 0).toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher un engin..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Equipments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Équipements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Heures Utilisées</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Maintenance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipments.map((eq) => (
                    <TableRow key={eq.id}>
                      <TableCell className="font-medium">{eq.id}</TableCell>
                      <TableCell>{eq.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{eq.type}</TableCell>
                      <TableCell>{eq.location}</TableCell>
                      <TableCell className="text-sm">{eq.hoursUsed} h</TableCell>
                      <TableCell>
                        <StatusBadge status={eq.status} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Wrench className="h-3 w-3" />
                          {eq.lastMaintenance}
                        </Button>
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
