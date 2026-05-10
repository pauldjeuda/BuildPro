'use client';

import React, { useState } from 'react';
import { Package, Plus, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTable, StatusBadge } from '@/components/erp';

export default function InventairePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const items = [
    {
      id: 'M001',
      name: 'Ciment Portland 32.5',
      quantity: 250,
      unit: 'sacs',
      minStock: 100,
      location: 'Stockage A-1',
      status: 'ok',
      lastUpdate: '2024-05-08',
    },
    {
      id: 'M002',
      name: 'Tuyaux PVC 110mm',
      quantity: 45,
      unit: 'mètres',
      minStock: 50,
      location: 'Stockage B-2',
      status: 'alert',
      lastUpdate: '2024-05-07',
    },
    {
      id: 'M003',
      name: 'Acier Renforcé 12mm',
      quantity: 80,
      unit: 'barre',
      minStock: 60,
      location: 'Stockage A-3',
      status: 'ok',
      lastUpdate: '2024-05-08',
    },
    {
      id: 'M004',
      name: 'Plâtre Gypse',
      quantity: 12,
      unit: 'tonnes',
      minStock: 20,
      location: 'Stockage C-1',
      status: 'critical',
      lastUpdate: '2024-05-05',
    },
    {
      id: 'M005',
      name: 'Gravier 20/40',
      quantity: 180,
      unit: 'm³',
      minStock: 100,
      location: 'Stockage Externe',
      status: 'ok',
      lastUpdate: '2024-05-08',
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-6 md:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Inventaire Stock</h1>
            <p className="text-muted-foreground">Gestion des matériaux en stock</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter Article
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Articles Totaux</p>
                <p className="text-3xl font-bold text-primary">{items.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Alertes Seuil</p>
                <p className="text-3xl font-bold text-yellow-500">
                  {items.filter((i) => i.status === 'alert').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Critique</p>
                <p className="text-3xl font-bold text-destructive">
                  {items.filter((i) => i.status === 'critical').length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Valeur Estimée</p>
                <p className="text-3xl font-bold">245K €</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Articles en Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Minimum</TableHead>
                    <TableHead>Localisation</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Mis à jour</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          {item.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell>{item.minStock}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.location}</TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.lastUpdate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Modifier
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
