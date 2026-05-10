'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  StatusBadge,
  DataTable,
  KPICard,
} from '@/components/erp';
import { Plus, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const demandes = [
  {
    id: 'DA001',
    date: '2024-05-08',
    demandeur: 'Jean Dupont',
    chantier: 'Rénovation Paris 5',
    description: 'Ciment 350kg',
    quantite: 50,
    unite: 'sacs',
    montant: 2500,
    statut: 'demande' as const,
    priorite: 'haute',
  },
  {
    id: 'DA002',
    date: '2024-05-07',
    demandeur: 'Marie Martin',
    chantier: 'Extension Lyon',
    description: 'Tuyauterie PVC',
    quantite: 100,
    unite: 'm',
    montant: 3200,
    statut: 'validee' as const,
    priorite: 'normale',
  },
  {
    id: 'DA003',
    date: '2024-05-06',
    demandeur: 'Pierre Durand',
    chantier: 'Réhab Marseille',
    description: 'Briques de construction',
    quantite: 5000,
    unite: 'unités',
    montant: 4500,
    statut: 'commandee' as const,
    priorite: 'normale',
  },
];

export default function DemandicesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Demandes d'Achat</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les demandes d'achat et validations
          </p>
        </div>
        <Link href="/achats/demandes/nouveau">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle demande
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          title="En attente"
          value="12"
          trend="up"
          color="warning"
        />
        <KPICard
          title="Validées"
          value="28"
          trend="up"
          color="success"
        />
        <KPICard
          title="Commandées"
          value="35"
          trend="neutral"
          color="default"
        />
        <KPICard
          title="Montant Total"
          value="45 800 €"
          trend="up"
          color="success"
        />
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par demande, chantier..."
                className="bg-muted"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtres
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Demandes récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Demande</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Demandeur</TableHead>
                <TableHead>Chantier</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demandes.map((demande) => (
                <TableRow key={demande.id}>
                  <TableCell className="font-medium">{demande.id}</TableCell>
                  <TableCell>{new Date(demande.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{demande.demandeur}</TableCell>
                  <TableCell>{demande.chantier}</TableCell>
                  <TableCell>{demande.description}</TableCell>
                  <TableCell>
                    {demande.quantite} {demande.unite}
                  </TableCell>
                  <TableCell className="font-medium">
                    {demande.montant.toLocaleString('fr-FR')} €
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={demande.statut} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Voir
                    </Button>
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
